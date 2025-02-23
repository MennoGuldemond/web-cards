import { inject, Injectable } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { GoogleUser } from '@app/models';
import firebase from 'firebase/compat/app';
import { from, Observable, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firestore: Firestore = inject(Firestore);
  private compatAuth = inject(AngularFireAuth);
  private auth = inject(Auth);

  getUser(): Observable<User> {
    return user(this.auth);
  }

  googleSignin(): Observable<firebase.auth.UserCredential> {
    return from(this.compatAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  updateUserData(user: GoogleUser) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    // const userRef: AngularFirestoreDocument<GoogleUser> = this.firestore.doc(`users/${user.uid}`);

    // return userRef.pipe(
    //   take(1),
    //   switchMap((savedUser: User) => {
    //     const data: any = {
    //       uid: user.uid,
    //       email: user.email,
    //       displayName: user.displayName,
    //       photoURL: user.photoURL,
    //     };

    //     if (savedUser == null) {
    //       // New user, initialize some values.
    //       data.recipeIds = [];
    //       data.createdOn = new Date();
    //       return setDoc(userRef, data);
    //     }

    //     return setDoc(userRef, data, { merge: true });
    //   })
    // );
  }
}
