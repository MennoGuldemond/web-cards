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
import { Card } from '@app/models';
import { from, map, mergeAll, Observable, of } from 'rxjs';
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

  get(id: string): Observable<Card> {
    const docRef = doc(this.firestore, 'cards', id);
    const docSnapshot = getDoc(docRef);
    return from(docSnapshot).pipe(map((doc) => (doc.exists() ? (doc.data() as Card) : null)));
  }

  getAll(): Observable<Card[]> {
    return this.settingsService.get().pipe(
      map((settings) => {
        const storedCards = this.getFromLocalStorage();

        if (!settings.cardsOutdated && storedCards?.length) {
          return of(storedCards);
        } else {
          return collectionData(this.cardsCollection, { idField: 'id' });
        }
      }),
      mergeAll(),
      map((cards: Card[]) => {
        this.saveToLocalStorage(cards);
        return cards;
      })
    ) as Observable<Card[]>;
  }

  save(card: Card): Observable<void> {
    if (card?.id) {
      const docRef = doc(this.firestore, 'cards', card.id);
      return from(setDoc(docRef, card)).pipe(
        map(() => {
          return this.settingsService.updateVersion();
        }),
        mergeAll()
      );
    } else {
      return from(addDoc(this.cardsCollection, card)).pipe(
        map(() => {
          return this.settingsService.updateVersion();
        }),
        mergeAll()
      );
    }
  }

  private saveToLocalStorage(cards: Card[]) {
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  private getFromLocalStorage(): Card[] {
    return JSON.parse(localStorage.getItem('cards') || '[]');
  }
}
