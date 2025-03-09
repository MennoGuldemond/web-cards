import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SettingsService } from '@app/services';
import { getSettings, setSettings, SETTING_SET_SETTINGS } from '../actions';
import { saveToLocalStorage } from '@app/utils/storage-utils';

@Injectable()
export class SettingEffects {
  private actions$ = inject(Actions);
  private settingService = inject(SettingsService);

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSettings),
      switchMap(() => {
        return this.settingService.get();
      }),
      pipe(
        map((settings) => {
          return { type: SETTING_SET_SETTINGS, settings: settings };
        })
      )
    )
  );

  setSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setSettings),
        tap((action) => {
          saveToLocalStorage('settings', action.settings);
        })
      ),
    { dispatch: false }
  );
}
