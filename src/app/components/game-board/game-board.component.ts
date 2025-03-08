import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDragPreview, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardsService, GameService } from '@app/services';
import { Card, CardType, GameState, ShipCard } from '@app/models';
import { map, Observable, take } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { ShipComponent } from '../ship/ship.component';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, CardComponent, ShipComponent, CdkDrag, CdkDropList, CdkDragPreview],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  cardService: CardsService = inject(CardsService);
  gameService: GameService = inject(GameService);

  gameState$: Observable<GameState>;
  hand: Card[] = [];
  playerShips: Card[] = [];
  enemyShips: Card[] = [];

  draggingCard: Card = null;
  isOverBattlefield = false;

  ngOnInit() {
    this.cardService.getAll().subscribe((cards) => (this.hand = cards));
    this.gameState$ = this.gameService.gameState$;
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
    // if (this.isShip(card)) {
    // }
  }

  dropInBattlefield(event: any) {
    const card = event.item.data;
    if (this.isShip(card)) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.gameService.playCard(card);
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
    return card.type === CardType.ship;
  }

  getShipCard(card: Card): ShipCard {
    if (this.isShip(card)) {
      return card as ShipCard;
    }
    return null;
  }
}
