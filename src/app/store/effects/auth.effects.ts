import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '@app/services';
import { login, logout, AUTH_SET_USER, setUser, AUTH_GET_USER, getUser } from '../actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(() => {
        return this.authService.googleSignin();
      }),
      map(() => {
        return { type: AUTH_GET_USER };
      }),
      catchError((err) => {
        console.error(err);
        return EMPTY;
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        this.authService.signOut().pipe(
          map(() => {
            this.router.navigate(['/']);
            return { type: AUTH_SET_USER, user: null };
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap(() => {
        return this.authService.appUser$;
      }),
      map((user) => {
        return { type: AUTH_SET_USER, user: user };
      })
    )
  );

  setUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setUser),
        map((action) => {
          const urlBeforeLogin = localStorage.getItem('urlBeforeLogin');
          if (urlBeforeLogin) {
            this.router.navigate([urlBeforeLogin]);
            localStorage.removeItem('urlBeforeLogin');
          }
          if (action.user) {
            this.authService.updateUserData(action.user).subscribe((x) => x);
          }
        })
      ),
    { dispatch: false }
  );
}
