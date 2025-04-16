import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '@app/services';
import { login, logout, setUser, getUser, getDeck, createBaseDeck } from '../actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(() => {
        return this.authService.googleSignin().pipe(
          take(1),
          map((response) => {
            if (response.isNewUser) {
              this.store.dispatch(createBaseDeck({ user: response.user }));
            }
            return response.user;
          })
        );
      }),
      map(() => {
        return getUser();
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
            return setUser({ user: null });
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
        return setUser({ user: user as any });
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
            this.store.dispatch(getDeck());
            this.authService.updateUserData(action.user).subscribe((x) => x);
          }
        })
      ),
    { dispatch: false }
  );
}
