import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SettingsService } from '@app/services';
import { getSettings, setCardsOutdated, setSettings, updateVersion } from '../actions';
import { getFromLocalStorage, saveToLocalStorage } from '@app/utils/storage-utils';
import { SettingState } from '../selectors';
import { initialSettingState } from '../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class SettingEffects {
  private store = inject(Store);
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
          return setSettings({ settings: settings });
        })
      )
    )
  );

  setSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setSettings),
        tap((action) => {
          let settings = getFromLocalStorage<SettingState>('settings');
          if (!settings) {
            settings = { ...initialSettingState };
          }
          if (settings.settings?.version === action.settings.version) {
            settings.cardsOutdated = false;
            this.store.dispatch(setCardsOutdated({ outdated: false }));
          } else {
            this.store.dispatch(setCardsOutdated({ outdated: true }));
          }
          settings.settings = action.settings;
          saveToLocalStorage('settings', settings);
        })
      ),
    { dispatch: false }
  );

  updateVersion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateVersion),
      switchMap((action) => {
        return this.settingService.updateVersion().pipe(
          map(() => {
            return setCardsOutdated({ outdated: true });
          })
        );
      })
    )
  );
}
