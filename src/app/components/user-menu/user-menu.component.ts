import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppUser } from '@app/models';
import { AuthService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  authService: AuthService = inject(AuthService);

  user$: Observable<AppUser>;

  currentTheme$: Observable<string>;

  // constructor(private router: Router) {}

  ngOnInit() {
    this.user$ = this.authService.appUser$;
    // this.currentTheme$ = this.store.select(selectTheme);
  }

  login() {
    this.authService.googleSignin().subscribe();
  }

  logout() {
    this.authService.signOut().subscribe();
  }

  navigateToAccount() {
    // this.router.navigate(['profiel']);
  }

  setTheme(theme: string) {
    // this.store.dispatch(setTheme({ theme: theme }));
  }
}
