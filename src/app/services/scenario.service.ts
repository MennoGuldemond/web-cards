import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { Scenario } from '@app/models';
import { from, map, Observable } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  firestore: Firestore = inject(Firestore);
  scenariosCollection: CollectionReference = collection(this.firestore, 'scenarios');
  settingsService: SettingsService = inject(SettingsService);

  get(id: string): Observable<Scenario> {
    const docRef = doc(this.firestore, 'scenarios', id);
    const docSnapshot = getDoc(docRef);
    return from(docSnapshot).pipe(map((doc) => (doc.exists() ? (doc.data() as Scenario) : null)));
  }

  getAll(): Observable<Scenario[]> {
    return collectionData(this.scenariosCollection, { idField: 'id' }) as Observable<Scenario[]>;
  }

  save(scenario: Scenario): Observable<void> {
    return scenario?.id
      ? from(setDoc(doc(this.firestore, 'scenarios', scenario.id), scenario)) // Update existing scenario
      : from(addDoc(this.scenariosCollection, scenario)).pipe(map(() => undefined));
  }
}
