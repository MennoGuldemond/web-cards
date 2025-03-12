import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card, ShipCard } from '@app/models';
import { asShip, isShip } from '@app/utils';
import { CardTooltipComponent } from '../card-tooltip/card-tooltip.component';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardModule, CardTooltipComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  showTooltip = false;

  ngOnInit(): void {
    if (this.isShip()) {
      this.card = asShip(this.card);
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
}
