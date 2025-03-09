import { Settings } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface SettingState {
  settings: Settings;
  cardsOutdated: boolean;
}

export const selectSettingState = createFeatureSelector<SettingState>('settings');
export const selectsettings = createSelector(selectSettingState, (state) => state.settings);
export const selectCardsOutdated = createSelector(selectSettingState, (state) => state.cardsOutdated);
