import { createReducer, on } from '@ngrx/store';
import { setUser } from '../actions';
import { AuthState } from '../selectors';

export const initialAuthState: AuthState = {
  user: null,
};

const _authReducer = createReducer(
  initialAuthState,
  on(setUser, (state, action) => {
    return { ...state, user: action.user };
  })
);

export function authReducer(state: any, action: any): AuthState {
  return _authReducer(state, action);
}
