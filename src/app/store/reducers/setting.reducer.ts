import { createReducer, on } from '@ngrx/store';
import { setSettings, setCardsOutdated, updateVersion } from '../actions';
import { SettingState } from '../selectors';
import { getFromLocalStorage } from '@app/utils/storage-utils';

export const initialSettingState: SettingState = getFromLocalStorage<SettingState>('settings') || {
  cardsOutdated: true,
  settings: null,
};

const _settingReducer = createReducer(
  initialSettingState,
  on(setSettings, (state, action) => {
    return { ...state, settings: action.settings };
  }),
  on(setCardsOutdated, (state, action) => {
    return { ...state, cardsOutdated: action.outdated };
  })
  // on(updateVersion, (state, action) => {
  //   return { ...state, settings: { ...state.settings, version: state.settings.version + 1 } };
  // })
);

export function settingReducer(state: any, action: any): SettingState {
  return _settingReducer(state, action);
}
