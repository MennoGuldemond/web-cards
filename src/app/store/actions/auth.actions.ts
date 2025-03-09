import { User } from '@angular/fire/auth';
import { createAction, props } from '@ngrx/store';

export const AUTH_LOGIN = '[Auth] login';
export const AUTH_LOGOUT = '[Auth] logout';
export const AUTH_GET_USER = '[Auth] getUser';
export const AUTH_SET_USER = '[Auth] setUser';

export const login = createAction(AUTH_LOGIN);
export const logout = createAction(AUTH_LOGOUT);
export const getUser = createAction(AUTH_GET_USER);
export const setUser = createAction(AUTH_SET_USER, props<{ user: User }>());
