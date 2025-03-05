import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDropList, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardsService, GameService } from '@app/services';
import { Card, GameState } from '@app/models';
import { CardResolver, EffectResolver } from '@app/utils';
import { CardComponent } from '../card/card.component';
import { map, Observable } from 'rxjs';

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

  cardResolver: CardResolver;
  effectsResolver: EffectResolver;

  constructor() {
    this.cardResolver = new CardResolver();
    this.effectsResolver = new EffectResolver();
  }

  ngOnInit() {
    this.cardService.getAll().subscribe((cards) => (this.hand = cards));
    this.gameState$ = this.gameService.gameState$.pipe(map((state) => state));
  }

  dropInField(event: any) {
    transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    if (event.item.data) {
      this.playCard(event.item.data);
    }
  }

  playCard(card: Card) {
    this.cardResolver.play(card);
  }
}
