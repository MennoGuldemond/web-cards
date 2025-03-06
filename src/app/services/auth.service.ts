import { inject, Injectable } from '@angular/core';
import { Auth, authState, User, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AppUser } from '@app/models';
import firebase from 'firebase/compat/app';
import { from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestore: Firestore = inject(Firestore);
  private compatAuth = inject(AngularFireAuth);
  private auth = inject(Auth);

  get appUser$(): Observable<AppUser | null> {
    return authState(this.auth).pipe(
      switchMap((user: User | null) => {
        if (!user) return of(null); // User not logged in
        const userDocRef = doc(this.firestore, 'users', user.uid);
        return docData(userDocRef) as Observable<AppUser>; // Firestore user data
      })
    );
  }

  googleSignin(): Observable<AppUser> {
    return from(this.compatAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
      switchMap(() => this.getAuthUser()), // Get the authenticated user
      switchMap((user) => this.updateUserData(user)) // Update Firestore with user data
    );
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  private getAuthUser(): Observable<User> {
    return user(this.auth);
  }

  private updateUserData(user: User): Observable<AppUser> {
    const docRef = doc(this.firestore, 'users', user.uid);

    return from(getDoc(docRef)).pipe(
      switchMap((docSnapshot) => {
        if (docSnapshot.exists()) {
          return of(docSnapshot.data() as AppUser);
        }

        const userData: AppUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdOn: new Date(),
        };

        return from(setDoc(docRef, userData)).pipe(map(() => userData));
      })
    );
  }
}
