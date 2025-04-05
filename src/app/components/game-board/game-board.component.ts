import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { map, Observable, skip, take } from 'rxjs';
import { Card, ShipCard, TurnPhase } from '@app/models';
import {
  GameState,
  selectEnemyShips,
  selectGameState,
  selectHand,
  selectPendingCard,
  selectPlayerShips,
} from '@app/store/selectors';
import { applyCard, discard, drawCards, nextPhase, playCard, setPhase } from '@app/store/actions';
import { CardComponent } from '../card/card.component';
import { ShipComponent } from '../ship/ship.component';
import { asShipCard, isShip } from '@app/utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, CardComponent, MatButtonModule, ShipComponent, CdkDrag, CdkDropList],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  private store = inject(Store);

  gameState$: Observable<GameState>;
  hand$: Observable<Card[]>;
  playerShips$: Observable<ShipCard[]>;
  enemyShips$: Observable<ShipCard[]>;
  pendingCard$: Observable<Card>;

  readonly playerPhase = TurnPhase.PlayerPlay;

  draggingCard: Card = null;
  isOverBattlefield = false;

  guideText = 'Drag a ship card here to deploy it!';
  showGuideText = true;

  constructor() {
    this.gameState$ = this.store.select(selectGameState);
    this.hand$ = this.store.select(selectHand);
    this.playerShips$ = this.store.select(selectPlayerShips);
    this.enemyShips$ = this.store.select(selectEnemyShips);
    this.gameState$ = this.store.select(selectGameState);
    this.pendingCard$ = this.store.select(selectPendingCard);
  }

  ngOnInit() {
    this.store.dispatch(drawCards({ amount: 5 }));
    this.store.dispatch(setPhase({ phase: TurnPhase.EnemyPlay }));

    this.pendingCard$.pipe(skip(1)).subscribe((pendingCard) => {
      if (pendingCard) {
        this.setGuide('Choose a target');
      } else {
        this.clearGuide();
      }
    });
  }

  startDrag(card: Card) {
    this.draggingCard = card;
  }

  stopDrag() {
    this.draggingCard = null;
    this.isOverBattlefield = false;
  }

  dragEnter(event: any) {
    this.isOverBattlefield = event?.container?.id === 'battlefield';
  }

  dropInBattlefield(event: CdkDragDrop<any, any, any>) {
    const card = event.item.data;
    if (this.isShip(card)) {
      this.store.dispatch(playCard({ card: card }));
    }
  }

  dropInUse(event: CdkDragDrop<any, any, any>) {
    const card = event.item.data;
    if (!this.isShip(card)) {
      this.store.dispatch(playCard({ card: card }));
    }
  }

  dropInSalvage(event: CdkDragDrop<any, any, any>) {
    this.store.dispatch(discard({ card: event.item.data }));
  }

  onShipClicked(ship: ShipCard) {
    this.pendingCard$.pipe(take(1)).subscribe((pendingCard) => {
      if (pendingCard) {
        this.store.dispatch(applyCard({ targetShip: ship, effects: pendingCard.effects }));
      }
    });
  }

  endTurn() {
    this.store.dispatch(nextPhase());
  }

  canAfford(card: Card): Observable<boolean> {
    return this.gameState$.pipe(
      take(1),
      map((state) => {
        if (this.isShip(card)) {
          return card.cost <= state.fuel;
        } else {
          return card.cost <= state.credits;
        }
      })
    );
  }

  isShip(card: Card): boolean {
    return isShip(card);
  }

  getShipCard(card: Card): ShipCard {
    return asShipCard(card);
  }

  setGuide(text: string) {
    this.guideText = text;
    this.showGuideText = true;
  }

  clearGuide() {
    this.showGuideText = false;
  }
}
