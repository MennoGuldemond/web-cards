import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardEffect, ShipCard } from '@app/models';
import { getShortDescription } from '@app/utils';

@Component({
  selector: 'app-ship',
  imports: [CommonModule],
  templateUrl: './ship.component.html',
  styleUrl: './ship.component.scss',
})
export class ShipComponent {
  @Input() shipCard: ShipCard;
  @Input() isTargetable: boolean;
  showTooltip = false;

  getEffectDescription(effect: CardEffect): string {
    return getShortDescription(effect);
  }
}
