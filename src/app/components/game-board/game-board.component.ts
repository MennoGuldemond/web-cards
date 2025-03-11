import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { Card, ShipCard } from '@app/models';
import {
  GameState,
  selectCards,
  selectEnemyShips,
  selectGameState,
  selectHand,
  selectPlayerShips,
} from '@app/store/selectors';
import { drawCards, playCard } from '@app/store/actions';
import { CardComponent } from '../card/card.component';
import { ShipComponent } from '../ship/ship.component';
import { asShip, isShip } from '@app/utils';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, CardComponent, ShipComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  store = inject(Store);

  gameState$: Observable<GameState>;
  hand$: Observable<Card[]>;
  playerShips$: Observable<Card[]>;
  enemyShips$: Observable<Card[]>;

  selectedCard: Card;
  isOverBattlefield = false;

  // TODO: improve arrow and move to seperate component
  arrow = { x1: 0, y1: 0, x2: 0, y2: 0 };
  arrowVisible = false;

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(drawCards({ amount: 5 }));
    }, 1000);

    this.hand$ = this.store.select(selectHand);
    this.playerShips$ = this.store.select(selectPlayerShips);
    this.enemyShips$ = this.store.select(selectEnemyShips);
    this.gameState$ = this.store.select(selectGameState);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.selectedCard) {
      this.updateArrowPosition(event.clientX, event.clientY);
      // Get the real element under the cursor, ignoring the arrow SVG
      const hoveredElement = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
      if (hoveredElement) {
        this.isOverBattlefield = hoveredElement.id === 'battlefield';
      }
    }
  }

  @HostListener('window:mousedown', ['$event'])
  handleMouseClick(event: MouseEvent) {
    if (event.button === 2) {
      this.selectedCard = null;
      this.arrowVisible = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  selectCard(event: any, card: Card) {
    this.canAfford(card).subscribe((canAfford) => {
      if (canAfford) {
        this.createArrow(event.x, event.y);
        this.selectedCard = card;
      }
    });
  }

  battlefieldClicked() {
    if (this.isOverBattlefield && this.selectedCard) {
      this.playInBattlefield(this.selectedCard);
      this.selectedCard = null;
      this.arrowVisible = false;
    }
  }

  createArrow(x: number, y: number) {
    this.arrow.x1 = x;
    this.arrow.y1 = y;
    this.arrow.x2 = this.arrow.x1;
    this.arrow.y2 = this.arrow.y1;
    this.arrowVisible = true;
  }

  updateArrowPosition(x: number, y: number) {
    this.arrow.x2 = x;
    this.arrow.y2 = y;
  }

  playInBattlefield(card: Card) {
    if (this.isShip(card)) {
      this.store.dispatch(playCard({ card }));
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
