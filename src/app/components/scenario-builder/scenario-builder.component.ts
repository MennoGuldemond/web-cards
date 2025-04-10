import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Scenario, ShipCard, Wave } from '@app/models';
import { saveScenario } from '@app/store/actions';
import { selectAllEnemyShipCards, selectScenarioById } from '@app/store/selectors';
import { deepEqual } from '@app/utils';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scenario-builder',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './scenario-builder.component.html',
  styleUrl: './scenario-builder.component.scss',
})
export class ScenarioBuilderComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  initialScenario: Scenario;
  scenarioId: string;
  form: FormGroup;

  enemyShips$: Observable<ShipCard[]>;

  get waves(): FormArray {
    return this.form.get('waves') as FormArray;
  }

  ngOnInit() {
    this.scenarioId = this.route.snapshot.paramMap.get('id');
    if (this.scenarioId) {
      this.store.select(selectScenarioById(this.scenarioId)).subscribe((scenario) => {
        this.initialScenario = { ...scenario };
        delete this.initialScenario.id;
        this.createForm(scenario);
      });
    } else {
      this.initialScenario = {} as Scenario;
      this.createForm({} as Scenario);
    }

    this.enemyShips$ = this.store.select(selectAllEnemyShipCards);
  }

  addWave() {
    this.waves.push(this.createWaveGroup());
  }

  removeWave(index: number) {
    this.waves.removeAt(index);
  }

  save() {
    const toSave = this.scenarioId ? { ...this.form.value, id: this.scenarioId } : { ...this.form.value };
    this.store.dispatch(saveScenario({ scenario: toSave }));
  }

  addEnemy(waveIndex: number) {
    const enemiesControl = this.getEnemyControl(waveIndex);
    const current = enemiesControl.value || [];
    enemiesControl.setValue([...current, '']); // '' as placeholder
  }

  removeEnemy(waveIndex: number, enemyIndex: number) {
    const enemiesControl = this.getEnemyControl(waveIndex);
    const current = enemiesControl.value || [];
    current.splice(enemyIndex, 1);
    enemiesControl.setValue([...current]);
  }

  onEnemyChange(waveIndex: number, enemyIndex: number, shipId: string) {
    const enemiesControl = this.getEnemyControl(waveIndex);
    const current = enemiesControl.value || [];
    current[enemyIndex] = shipId;
    enemiesControl.setValue([...current]);
  }

  private createForm(scenario: Scenario) {
    this.form = new FormGroup({
      name: new FormControl(scenario?.name, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(scenario?.description, [Validators.required, Validators.maxLength(200)]),
      waves: new FormArray(scenario?.waves ? scenario.waves.map((effect) => this.createWaveGroup(effect)) : []),
    });
  }

  createWaveGroup(wave?: Wave): FormGroup {
    return new FormGroup({
      turn: new FormControl(wave?.turn || 1, [Validators.required]),
      enemies: new FormControl(wave?.enemies || [], [Validators.required]),
    });
  }

  isFormChanged(): boolean {
    const formValue = { ...this.form.value };
    return !deepEqual(this.initialScenario, formValue);
  }

  getEnemyControl(waveIndex: number): FormControl {
    return this.waves.at(waveIndex).get('enemies') as FormControl;
  }
}
