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
import { from, map, Observable, tap } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  firestore: Firestore = inject(Firestore);
  cardsCollection: CollectionReference = collection(this.firestore, 'cards');
  settingsService: SettingsService = inject(SettingsService);

  get(id: string): Observable<Card> {
    const docRef = doc(this.firestore, 'cards', id);
    const docSnapshot = getDoc(docRef);
    return from(docSnapshot).pipe(map((doc) => (doc.exists() ? (doc.data() as Card) : null)));
  }

  getAll(): Observable<Card[]> {
    return collectionData(this.cardsCollection, { idField: 'id' }) as Observable<Card[]>;
  }

  save(card: Card): Observable<void> {
    return card?.id
      ? from(setDoc(doc(this.firestore, 'cards', card.id), card)) // Update existing card
      : from(addDoc(this.cardsCollection, card)).pipe(map(() => undefined));
  }
}
