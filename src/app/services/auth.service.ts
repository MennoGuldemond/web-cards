import { inject, Injectable } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private compatAuth = inject(AngularFireAuth);
  private auth = inject(Auth);

  getUser(): Observable<User> {
    return user(this.auth);
  }

  googleSignin(): Observable<firebase.auth.UserCredential> {
    return from(this.compatAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }
}
