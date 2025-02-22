import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, Firestore } from '@angular/fire/firestore';
import { Card } from '@app/models';
import { map, mergeAll, Observable, of } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  firestore: Firestore = inject(Firestore);
  cardsCollection: CollectionReference;
  settingsService: SettingsService = inject(SettingsService);

  constructor() {
    this.cardsCollection = collection(this.firestore, 'cards');
  }

  getAll(): Observable<Card[]> {
    return this.settingsService.get().pipe(
      map((settings) => {
        const storedCards = JSON.parse(localStorage.getItem('cards'));

        if (!settings.cardsOutdated && storedCards?.length) {
          return of(storedCards);
        } else {
          return collectionData(this.cardsCollection);
        }
      }),
      mergeAll()
    ) as Observable<Card[]>;
  }

  save(card: Card): Observable<any> {
    return of(addDoc(this.cardsCollection, card));
  }
}
