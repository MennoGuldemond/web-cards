import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { Store } from '@ngrx/store';
import { selectGameState } from '@app/store/selectors';

@Component({
  selector: 'app-menu-bar',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, UserMenuComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {
  private store = inject(Store);
  private router = inject(Router);

  gameState$ = this.store.select(selectGameState);

  navigateToGame() {
    this.router.navigate(['game']);
  }
}
