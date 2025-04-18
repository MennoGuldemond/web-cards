import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '@env/environment';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  authReducer,
  battlefieldReducer,
  cardReducer,
  deckReducer,
  gameReducer,
  scenarioReducer,
  settingReducer,
} from './store/reducers';
import {
  AuthEffects,
  BattlefieldEffects,
  CardEffects,
  DeckEffects,
  GameEffects,
  ScenarioEffects,
  SettingEffects,
} from './store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'card', reducer: cardReducer }),
    provideState({ name: 'game', reducer: gameReducer }),
    provideState({ name: 'settings', reducer: settingReducer }),
    provideState({ name: 'battlefield', reducer: battlefieldReducer }),
    provideState({ name: 'deck', reducer: deckReducer }),
    provideState({ name: 'scenario', reducer: scenarioReducer }),
    provideEffects([
      AuthEffects,
      CardEffects,
      GameEffects,
      SettingEffects,
      BattlefieldEffects,
      DeckEffects,
      ScenarioEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
  ],
};
