import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card, CardEffect, ShipCard } from '@app/models';
import { asShipCard, EffectResolver, isShip } from '@app/utils';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  showTooltip = false;

  ngOnInit(): void {
    if (this.isShip()) {
      this.card = asShipCard(this.card);
    }
  }

  isShip(): boolean {
    return isShip(this.card);
  }

  getShipData() {
    return (this.card as ShipCard).ship;
  }

  getCardStyle(): string {
    return `${this.card.cardType.toLowerCase()} ${this.card.rarity.toLowerCase()}`;
  }

  getEffectDescription(effect: CardEffect): string {
    return EffectResolver.getDescription(effect);
  }
}
