import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';
import { login, logout } from '@app/store/actions';
import { selectUser } from '@app/store/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  store = inject(Store);
  authService = inject(AuthService);
  router = inject(Router);

  user$: Observable<User>;

  currentTheme$: Observable<string>;

  ngOnInit() {
    this.user$ = this.store.select(selectUser);
    // this.currentTheme$ = this.store.select(selectTheme);
  }

  login() {
    this.store.dispatch(login());
  }

  logout() {
    this.store.dispatch(logout());
  }

  navigateToGame() {
    this.router.navigate(['game']);
  }

  navigateToAccount() {
    // this.router.navigate(['profiel']);
  }

  navigateToCardsOverview() {
    this.router.navigate(['cards-overview']);
  }

  setTheme(theme: string) {
    // this.store.dispatch(setTheme({ theme: theme }));
  }
}
