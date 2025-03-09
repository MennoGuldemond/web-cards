import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDragPreview, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { Card, ShipCard } from '@app/models';
import { GameState, selectCards, selectGameState } from '@app/store/selectors';
import { playCard } from '@app/store/actions';
import { CardComponent } from '../card/card.component';
import { ShipComponent } from '../ship/ship.component';
import { asShip, isShip } from '@app/utils';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, CardComponent, ShipComponent, CdkDrag, CdkDropList, CdkDragPreview],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  store = inject(Store);

  gameState$: Observable<GameState>;
  hand: Card[] = [];
  playerShips: Card[] = [];
  enemyShips: Card[] = [];

  draggingCard: Card = null;
  isOverBattlefield = false;

  ngOnInit() {
    this.store.select(selectCards).subscribe((cards) => (this.hand = cards));
    this.gameState$ = this.store.select(selectGameState);
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

  dropInBattlefield(event: any) {
    const card = event.item.data;
    if (this.isShip(card)) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.store.dispatch(playCard(card));
    }
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
    return asShip(card);
  }
}
