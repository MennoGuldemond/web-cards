import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-effect-float',
  imports: [CommonModule],
  template: `<div class="float" [ngStyle]="style">{{ text }}</div>`,
  styleUrl: './effect-float.component.scss',
})
export class EffectFloatComponent {
  @Input() text = '';
  @Input() style: { [key: string]: string } = {};
}
