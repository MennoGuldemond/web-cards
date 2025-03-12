import { Component, Input } from '@angular/core';
import { Card, CardEffect } from '@app/models';
import { EffectResolver } from '@app/utils';

@Component({
  selector: 'app-card-tooltip',
  imports: [],
  templateUrl: './card-tooltip.component.html',
  styleUrl: './card-tooltip.component.scss',
})
export class CardTooltipComponent {
  @Input() card: Card;

  getEffectDescription(effect: CardEffect): string {
    return EffectResolver.getDescription(effect);
  }
}
