import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Scenario } from '@app/models';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectScenarios } from '@app/store/selectors';
import { getScenarios } from '@app/store/actions';

@Component({
  selector: 'app-scenario-overview',
  imports: [MatTableModule, CommonModule, AsyncPipe, RouterModule, MatButtonModule],
  templateUrl: './scenario-overview.component.html',
  styleUrl: './scenario-overview.component.scss',
})
export class ScenarioOverviewComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  scenarios$: Observable<Scenario[]>;
  displayedColumns: string[] = ['name', 'description'];
  dataSource: MatTableDataSource<Scenario>;

  ngOnInit() {
    this.store.dispatch(getScenarios());
    this.scenarios$ = this.store.select(selectScenarios).pipe(
      map((scenarios) => {
        this.dataSource = new MatTableDataSource(scenarios);
        return scenarios;
      })
    );
  }

  newScenario() {
    this.router.navigate(['scenario-builder']);
  }

  openScenario(scenario: Scenario) {
    this.router.navigate([`scenario-builder/${scenario.id}`]);
  }
}
