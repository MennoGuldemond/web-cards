import { User } from '@angular/fire/auth';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] login');
export const logout = createAction('[Auth] logout');
export const getUser = createAction('[Auth] getUser');
export const setUser = createAction('[Auth] setUser', props<{ user: User }>());
