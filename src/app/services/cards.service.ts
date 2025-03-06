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
import { from, map, Observable, of, switchMap, tap } from 'rxjs';
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
    return this.settingsService.get().pipe(
      switchMap((settings) => {
        const storedCards = this.getFromLocalStorage();
        if (!settings.cardsOutdated && storedCards?.length) {
          return of(storedCards); // Use cached cards if not outdated
        }
        return collectionData(this.cardsCollection, { idField: 'id' }).pipe(
          tap((cards) => this.saveToLocalStorage(cards as Card[])) // Save fetched cards to local storage
        ) as Observable<Card[]>;
      })
    );
  }

  save(card: Card): Observable<void> {
    const saveOperation = card?.id
      ? from(setDoc(doc(this.firestore, 'cards', card.id), card)) // Update existing card
      : from(addDoc(this.cardsCollection, card)).pipe(map(() => undefined));

    return saveOperation.pipe(
      tap(() => this.settingsService.updateVersion().subscribe()), // Call updateVersion as a side effect
      map(() => undefined)
    );
  }

  private saveToLocalStorage(cards: Card[]): void {
    try {
      localStorage.setItem('cards', JSON.stringify(cards));
    } catch (error) {
      console.error('Error saving cards to localStorage', error);
    }
  }

  private getFromLocalStorage(): Card[] {
    try {
      const data = localStorage.getItem('cards');
      return data ? (JSON.parse(data) as Card[]) : [];
    } catch (error) {
      console.error('Error retrieving cards from localStorage', error);
      return [];
    }
  }
}
