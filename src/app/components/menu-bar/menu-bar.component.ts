import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { GameService } from '@app/services';

@Component({
  selector: 'app-menu-bar',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {
  gameService = inject(GameService);

  gameState$ = this.gameService.gameState$;
}
