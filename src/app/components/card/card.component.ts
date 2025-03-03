import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card, CardEffect, CardType, ShipCard } from '@app/models';
import { EffectResolver } from '@app/utils';

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
      let shipCard = this.card as ShipCard;
      shipCard.ship = { ...shipCard.ship, health: shipCard.ship.maxHealth, attack: shipCard.ship.baseAttack };
      this.card = shipCard;
    }
  }

  isShip(): boolean {
    return this.card.type === CardType.ship;
  }

  getShipData() {
    return (this.card as ShipCard).ship;
  }

  getCardStyle(): string {
    return `${this.card.type.toLowerCase()} ${this.card.rarity.toLowerCase()}`;
  }

  getEffectDescription(effect: CardEffect): string {
    return EffectResolver.getDescription(effect);
  }
}
