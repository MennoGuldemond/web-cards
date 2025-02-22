import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '@app/models';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card: Card;
}
