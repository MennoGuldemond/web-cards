import { createAction, props } from '@ngrx/store';
import { Settings } from '@app/models';

export const getSettings = createAction('[Setting] getSettings');
export const updateVersion = createAction('[Setting] updateVersion');
export const setSettings = createAction('[Setting] setSettings', props<{ settings: Settings }>());
export const setCardsOutdated = createAction('[Setting] setCardsOutdated', props<{ outdated: boolean }>());
