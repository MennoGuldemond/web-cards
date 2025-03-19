import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CardsService } from '@app/services';
import {
  CARD_SET_CARD,
  CARD_SET_CARDS,
  getCard,
  getCards,
  saveCard,
  setCard,
  setCards,
  updateVersion,
} from '../actions';
import { asShip, isShip } from '@app/utils';
import { getFromLocalStorage, saveToLocalStorage } from '@app/utils/storage-utils';
import { Card } from '@app/models';
import { Store } from '@ngrx/store';
import { selectCardsOutdated } from '../selectors';
import { Router } from '@angular/router';

@Injectable()
export class CardEffects {
  private actions$ = inject(Actions);
  private cardService = inject(CardsService);
  private store = inject(Store);
  private router = inject(Router);

  getCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCard),
      switchMap((action) => {
        return this.cardService.get(action.id);
      }),
      pipe(
        map((card) => {
          return { type: CARD_SET_CARD, card: card };
        })
      )
    )
  );

  getCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCards),
      switchMap(() => {
        return this.store.select(selectCardsOutdated).pipe(
          switchMap((cardsOutdated) => {
            const cards = getFromLocalStorage<Card[]>('cards');
            if (!cardsOutdated && cards?.length) {
              return of(cards);
            }
            return this.cardService.getAll();
          })
        );
      }),
      pipe(
        map((cards) => {
          cards.forEach((card) => {
            if (isShip(card)) {
              card = asShip(card);
            }
          });
          return { type: CARD_SET_CARDS, cards: cards };
        })
      )
    )
  );

  saveCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveCard),
      switchMap((action) => {
        this.store.dispatch(updateVersion());
        return this.cardService.save(action.card).pipe(
          map(() => {
            return { type: CARD_SET_CARD, card: action.card };
          })
        );
      })
    )
  );

  setCards$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setCards),
        tap((action) => {
          saveToLocalStorage('cards', action.cards);
        })
      ),
    { dispatch: false }
  );

  setCard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setCard),
        tap((action) => {
          this.router.navigate(['cards-overview']);
        })
      ),
    { dispatch: false }
  );
}
