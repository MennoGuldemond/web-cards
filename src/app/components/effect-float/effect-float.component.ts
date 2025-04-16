import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EffectColor } from '@app/models';

@Component({
  selector: 'app-effect-float',
  imports: [CommonModule],
  template: `<div
    class="float"
    [ngClass]="{ positive: isPositive(), negative: isNegative(), neutral: isNeutral() }"
    [ngStyle]="style"
  >
    {{ text }}
  </div>`,
  styleUrl: './effect-float.component.scss',
})
export class EffectFloatComponent {
  @Input() text = '';
  @Input() color = EffectColor.neutral;
  @Input() style: { [key: string]: string } = {};

  isPositive(): boolean {
    return this.color === EffectColor.positive;
  }

  isNegative(): boolean {
    return this.color === EffectColor.negative;
  }

  isNeutral(): boolean {
    return this.color === EffectColor.neutral;
  }
}
