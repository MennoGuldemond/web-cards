import { Component, inject, OnInit } from '@angular/core';
import { Card, CardType, CardRarity } from './models';
import { CardsService, SettingsService } from './services';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './components';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MenuBarComponent, CommonModule, MenuBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  cardService: CardsService = inject(CardsService);
  settingsService: SettingsService = inject(SettingsService);

  cards$: Observable<Card[]>;

  testCard: Card = {
    title: 'Test Card',
    description: 'This is a description of the card.',
    cost: 1,
    type: CardType.ship,
    rarity: CardRarity.common,
  } as Card;

  ngOnInit() {
    this.cards$ = this.cardService.getAll();
  }

  save() {
    this.cardService.save(this.testCard).subscribe((savedCard) => {
      console.log(savedCard);
    });
  }
}
