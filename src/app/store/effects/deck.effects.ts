import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { DeckService } from '@app/services';
import { createBaseDeck, getDeck, getDeckCards, saveDeck, setDeck, setDeckCards } from '../actions';
import { Store } from '@ngrx/store';
import { selectCards, selectDeckData, selectUser } from '../selectors';
import { Deck } from '@app/models';

@Injectable()
export class DeckEffects {
  private actions$ = inject(Actions);
  private deckService = inject(DeckService);
  private store = inject(Store);

  getDeck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDeck),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([action, user]) => {
        return this.deckService.get(user.uid);
      }),
      map((deck) => {
        return setDeck({ deck: deck });
      })
    )
  );

  setDeck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setDeck),
      map((action) => getDeckCards())
    )
  );

  getDeckCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDeckCards),
      withLatestFrom(this.store.select(selectDeckData), this.store.select(selectCards)),
      map(([action, deckData, cards]) => {
        let deckCards = [];
        if (deckData?.cardIds && cards) {
          deckData.cardIds.forEach((id) => deckCards.push(cards.find((c) => c.id === id)));
        }
        return setDeckCards({ cards: deckCards });
      })
    )
  );

  createBaseDeck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBaseDeck),
      withLatestFrom(this.store.select(selectCards)),
      map(([action, cards]) => {
        let cardIds = [];
        cards.forEach((c) => {
          for (let i = 0; i < c.timesInBaseDeck; i++) {
            cardIds.push(c.id);
          }
        });
        let deck: Deck = {
          id: null,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          userId: action.user.uid,
          cardIds: cardIds,
        };
        return saveDeck({ deck: deck });
      })
    )
  );

  saveDeck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveDeck),
      switchMap((action) =>
        from(this.deckService.save(action.deck)).pipe(map((savedDeck) => setDeck({ deck: savedDeck })))
      )
    )
  );
}
