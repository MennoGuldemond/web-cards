import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-effect-float',
  imports: [CommonModule],
  template: `<div class="float" [ngClass]="{ positive: positive, negative: !positive }" [ngStyle]="style">
    {{ text }}
  </div>`,
  styleUrl: './effect-float.component.scss',
})
export class EffectFloatComponent {
  @Input() text = '';
  @Input() positive = false;
  @Input() style: { [key: string]: string } = {};
}
