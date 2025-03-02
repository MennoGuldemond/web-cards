import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardsService } from '@app/services';
import { Card } from '@app/models';
import { CardResolver, EffectResolver } from '@app/utils';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, CardComponent, CdkDrag, CdkDropList],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  cardService: CardsService = inject(CardsService);
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
