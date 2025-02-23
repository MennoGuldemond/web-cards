import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Card } from '@app/models';
import { CardsService } from '@app/services';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-overview',
  imports: [MatTableModule, CommonModule, AsyncPipe],
  templateUrl: './cards-overview.component.html',
  styleUrl: './cards-overview.component.scss',
})
export class CardsOverviewComponent implements OnInit {
  cardService: CardsService = inject(CardsService);
  cards$: Observable<Card[]>;
  displayedColumns: string[] = ['title', 'cost', 'type', 'rarity'];
  dataSource: MatTableDataSource<Card>;

  ngOnInit() {
    this.cards$ = this.cardService.getAll().pipe(
      map((cards) => {
        console.log(cards);
        for (let i = 0; i < cards.length; i++) {
          cards[i].id = i.toString();
        }
        this.dataSource = new MatTableDataSource(cards);
        return cards;
      })
    );
  }
}
