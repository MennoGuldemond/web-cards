import { createReducer, on } from '@ngrx/store';
import { setSettings } from '../actions';
import { SettingState } from '../selectors';

export const initialSettingState: SettingState = {
  settings: null,
  cardsOutdated: false,
};

const _settingReducer = createReducer(
  initialSettingState,
  on(setSettings, (state, action) => {
    return { ...state, settings: action.settings };
  })
);

export function settingReducer(state: any, action: any): SettingState {
  return _settingReducer(state, action);
}
