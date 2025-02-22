import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { CardComponent } from './components';
import { Card, CardType, CardRarity } from './models';
import { CardsService, SettingsService } from './services';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

@Component({
  selector: 'app-root',
  imports: [MenuBarComponent, CardComponent, CdkDrag, CommonModule, MenuBarComponent],
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

  ngOnInit(): void {
    this.cards$ = this.cardService.getAll().pipe(
      map((cards) => {
        localStorage.setItem('cards', JSON.stringify(cards));
        return cards;
      })
    );
  }

  save() {
    this.cardService.save(this.testCard);
  }
}
