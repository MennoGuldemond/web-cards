import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ScenarioService } from '@app/services';
import { getScenario, getScenarios, saveScenario, setScenario, setScenarios, updateVersion } from '../actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class ScenarioEffects {
  private actions$ = inject(Actions);
  private scenarioService = inject(ScenarioService);
  private store = inject(Store);
  private router = inject(Router);

  getScenario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getScenario),
      switchMap((action) => {
        return this.scenarioService.get(action.id);
      }),
      pipe(
        map((scenario) => {
          return setScenario({ scenario: scenario });
        })
      )
    )
  );

  getScenarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getScenarios),
      switchMap(() => this.scenarioService.getAll().pipe(map((scenarios) => setScenarios({ scenarios }))))
    )
  );

  saveScenario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveScenario),
      switchMap((action) => {
        this.store.dispatch(updateVersion());
        return this.scenarioService.save(action.scenario).pipe(
          map(() => {
            return setScenario({ scenario: action.scenario });
          })
        );
      })
    )
  );

  setScenario$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setScenario),
        tap((action) => {
          this.router.navigate(['scenario-overview']);
        })
      ),
    { dispatch: false }
  );
}
