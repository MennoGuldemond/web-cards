import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Card } from '@app/models';
import { CardsService } from '@app/services';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cards-overview',
  imports: [MatTableModule, CommonModule, AsyncPipe, RouterModule, MatButtonModule],
  templateUrl: './cards-overview.component.html',
  styleUrl: './cards-overview.component.scss',
})
export class CardsOverviewComponent implements OnInit {
  cardService: CardsService = inject(CardsService);
  router: Router = inject(Router);
  cards$: Observable<Card[]>;
  displayedColumns: string[] = ['title', 'cost', 'type', 'rarity'];
  dataSource: MatTableDataSource<Card>;

  ngOnInit() {
    this.cards$ = this.cardService.getAll().pipe(
      map((cards) => {
        this.dataSource = new MatTableDataSource(cards);
        return cards;
      })
    );
  }

  newCard() {
    this.router.navigate(['card-edit']);
  }

  openCard(card: Card) {
    this.router.navigate([`card-edit/${card.id}`]);
  }
}
