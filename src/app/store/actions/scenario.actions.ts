import { Scenario } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const getScenario = createAction('[Scenario] getScenario', props<{ id: string }>());
export const getScenarios = createAction('[Scenario] getScenarios');

export const setScenario = createAction('[Scenario] setScenario', props<{ scenario: Scenario }>());
export const setScenarios = createAction('[Scenario] setScenarios', props<{ scenarios: Scenario[] }>());

export const saveScenario = createAction('[Scenario] saveScenario', props<{ scenario: Scenario }>());
