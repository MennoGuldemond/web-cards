import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Card } from '@app/models';
import { CardsService } from '@app/services';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cards-overview',
  imports: [MatTableModule, CommonModule, AsyncPipe, RouterModule],
  templateUrl: './cards-overview.component.html',
  styleUrl: './cards-overview.component.scss',
})
export class CardsOverviewComponent implements OnInit {
  cardService: CardsService = inject(CardsService);
  router: Router = Inject(Router);
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
    console.log(this.router);
    // this.router.navigate(['edit']);
  }
}
