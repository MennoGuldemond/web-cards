import { User } from '@angular/fire/auth';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  user: User;
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectIsLoggedIn = createSelector(selectAuthState, (state) => state.user != null);
