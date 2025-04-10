import { Scenario } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const SCENARIO_GET_SCENARIO = '[Scenario] getScenario';
export const SCENARIO_GET_SCENARIOS = '[Scenario] getScenarios';
export const SCENARIO_SET_SCENARIO = '[Scenario] setScenario';
export const SCENARIO_SET_SCENARIOS = '[Scenario] setScenarios';
export const SCENARIO_SAVE_SCENARIO = '[Scenario] saveScenario';

export const getScenario = createAction(SCENARIO_GET_SCENARIO, props<{ id: string }>());
export const getScenarios = createAction(SCENARIO_GET_SCENARIOS);

export const setScenario = createAction(SCENARIO_SET_SCENARIO, props<{ scenario: Scenario }>());
export const setScenarios = createAction(SCENARIO_SET_SCENARIOS, props<{ scenarios: Scenario[] }>());

export const saveScenario = createAction(SCENARIO_SAVE_SCENARIO, props<{ scenario: Scenario }>());
