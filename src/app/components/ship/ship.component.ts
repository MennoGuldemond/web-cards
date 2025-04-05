import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShipCard } from '@app/models';

@Component({
  selector: 'app-ship',
  imports: [CommonModule],
  templateUrl: './ship.component.html',
  styleUrl: './ship.component.scss',
})
export class ShipComponent {
  @Input() shipCard: ShipCard;
  @Input() isTargetable: boolean;
}
