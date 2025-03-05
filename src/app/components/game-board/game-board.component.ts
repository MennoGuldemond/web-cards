import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardsService, GameService } from '@app/services';
import { Card, CardType, GameState } from '@app/models';
import { CardComponent } from '../card/card.component';
import { map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, CardComponent, CdkDrag, CdkDropList],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  cardService: CardsService = inject(CardsService);
  gameService: GameService = inject(GameService);

  gameState$: Observable<GameState>;
  hand: Card[] = [];
  cardsInPlay: Card[] = [];

  ngOnInit() {
    this.cardService.getAll().subscribe((cards) => (this.hand = cards));
    this.gameState$ = this.gameService.gameState$;
  }

  dropInField(event: any) {
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    if (event.item.data) {
      this.gameService.playCard(event.item.data);
    }
  }

  canAfford(card: Card): Observable<boolean> {
    return this.gameState$.pipe(
      take(1),
      map((state) => {
        if (card.type === CardType.ship) {
          return card.cost <= state.fuel;
        } else {
          return card.cost <= state.credits;
        }
      })
    );
  }
}
