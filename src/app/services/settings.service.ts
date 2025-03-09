import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Settings } from '@app/models';
import { from, map, Observable, switchMap, take } from 'rxjs';

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
        return x[0] as Settings;
      })
    ) as Observable<Settings>;
  }

  updateVersion(): Observable<void> {
    const settingsRef = doc(this.firestore, 'settings/1');

    return collectionData(this.settingsCollection).pipe(
      take(1),
      map((x) => {
        const settings = x[0] as Settings;
        settings.version = +settings.version + 1;
        return settings;
      }),
      switchMap((updatedSettings) => {
        return from(setDoc(settingsRef, updatedSettings));
      })
    );
  }
}
