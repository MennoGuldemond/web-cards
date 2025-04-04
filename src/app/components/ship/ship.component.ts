import { Component, Input, OnInit } from '@angular/core';
import { Card, ShipCard } from '@app/models';
import { asShip } from '@app/utils';

@Component({
  selector: 'app-ship',
  imports: [],
  templateUrl: './ship.component.html',
  styleUrl: './ship.component.scss',
})
export class ShipComponent {
  @Input() shipCard: ShipCard;
}
