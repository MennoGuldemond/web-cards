import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Settings } from '@app/models';
import { map, mergeAll, Observable, take } from 'rxjs';

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
        const storedSettings = this.getFromLocalStorage();
        settings.cardsOutdated = storedSettings.version !== settings.version;
        this.saveToLocalStorage(settings);
        return settings;
      })
    ) as Observable<Settings>;
  }

  updateVersion(): Observable<void> {
    return collectionData(this.settingsCollection).pipe(
      take(1),
      map((x) => {
        const settings = x[0] as Settings;
        settings.version = +settings.version + 1;
        const ref = doc(this.firestore, 'settings/1');
        return setDoc(ref, settings);
      }),
      mergeAll(),
      map((saved) => {
        return;
      })
    );
  }

  private saveToLocalStorage(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  private getFromLocalStorage(): Settings {
    return JSON.parse(localStorage.getItem('settings'));
  }
}
