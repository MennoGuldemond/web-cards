import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { Settings } from '@app/models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  firestore: Firestore = inject(Firestore);
  settingsCollection: CollectionReference;

  constructor() {
    this.settingsCollection = collection(this.firestore, 'settings');
  }

  get(): Observable<Settings> {
    return collectionData(this.settingsCollection).pipe(
      map((x) => {
        const settings = x[0] as Settings;
        const storedSettings = JSON.parse(localStorage.getItem('settings')) as Settings;
        settings.cardsOutdated = storedSettings.version !== settings.version;
        localStorage.setItem('settings', JSON.stringify(settings));
        return settings;
      })
    ) as Observable<Settings>;
  }
}
