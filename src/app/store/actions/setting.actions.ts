import { createAction, props } from '@ngrx/store';
import { Settings } from '@app/models';

export const SETTING_GET_SETTINGS = '[Setting] getSettings';
export const SETTING_UPDATE_VERSION = '[Setting] updateVersion';
export const SETTING_SET_SETTINGS = '[Setting] setSettings';

export const getSettings = createAction(SETTING_GET_SETTINGS);
export const updateVersion = createAction(SETTING_UPDATE_VERSION);
export const setSettings = createAction(SETTING_SET_SETTINGS, props<{ settings: Settings }>());
