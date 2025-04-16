import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Deck } from '@app/models';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  firestore: Firestore = inject(Firestore);
  cardsCollection: CollectionReference = collection(this.firestore, 'decks');

  get(userId: string): Observable<Deck> {
    const decksRef = collection(this.firestore, 'decks');
    const q = query(decksRef, where('userId', '==', userId));
    const result = getDocs(q);
    return from(result).pipe(
      map((snapshot) => {
        if (!snapshot.empty) {
          // return first deck found (should only be one for now)
          return snapshot.docs[0].data() as Deck;
        }
        return null;
      })
    );
  }

  save(deck: Deck): Observable<Deck> {
    if (deck?.id) {
      // Update existing deck
      return from(setDoc(doc(this.firestore, 'decks', deck.id), deck)).pipe(map(() => deck));
    } else {
      // Create new deck
      return from(addDoc(this.cardsCollection, deck)).pipe(map((docRef) => ({ ...deck, id: docRef.id })));
    }
  }
}
