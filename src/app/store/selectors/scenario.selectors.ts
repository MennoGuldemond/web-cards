import { Scenario } from '@app/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ScenarioState {
  scenarios: Scenario[];
}

export const selectScenarioState = createFeatureSelector<ScenarioState>('scenario');
export const selectScenarios = createSelector(selectScenarioState, (state) => [...state.scenarios]);
export const selectScenarioById = (id: string) =>
  createSelector(selectScenarioState, (state) => state.scenarios.find((r) => r.id === id));
