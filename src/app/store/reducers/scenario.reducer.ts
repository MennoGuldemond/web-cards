import { createReducer, on } from '@ngrx/store';
import { setScenario, setScenarios } from '../actions';
import { ScenarioState } from '../selectors';

export const initialScenarioState: ScenarioState = {
  scenarios: [],
};

const _scenarioReducer = createReducer(
  initialScenarioState,
  on(setScenario, (state, { scenario }) => {
    let scenarios = state.scenarios.filter((r) => r.id !== scenario.id);
    return { ...state, scenarios: [...scenarios, scenario] };
  }),
  on(setScenarios, (state, action) => {
    // Remove outdated scenarios in state
    let scenarios = state.scenarios.filter((r) => {
      return action.scenarios.find((r2) => r2.id === r.id) ? null : r;
    });
    return { ...state, scenarios: [...scenarios, ...action.scenarios] };
  })
);

export function scenarioReducer(state: any, action: any): ScenarioState {
  return _scenarioReducer(state, action);
}
