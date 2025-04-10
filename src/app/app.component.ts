import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './components';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCards, getSettings, getUser } from './store/actions';

@Component({
  selector: 'app-root',
  imports: [MenuBarComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(getUser());
    this.store.dispatch(getSettings());
    this.store.dispatch(getCards());
  }
}
