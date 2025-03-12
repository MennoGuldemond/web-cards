import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Card, CardEffect, CardRarity, CardType, Effects, ShipCard } from '@app/models';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedUtils } from '@app/utils';
import { Store } from '@ngrx/store';
import { saveCard } from '@app/store/actions';
import { selectCardById } from '@app/store/selectors';

@Component({
  selector: 'app-card-edit',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    KeyValuePipe,
    MatIconModule,
  ],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.scss',
})
export class CardEditComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  initialCard: Card;

  cardId: string;
  form: FormGroup;
  cardTypeEnum = CardType;
  rarityEnum = CardRarity;
  effectEum = Effects;

  get effects(): FormArray {
    return this.form.get('effects') as FormArray;
  }

  ngOnInit() {
    this.cardId = this.route.snapshot.paramMap.get('id');
    if (this.cardId) {
      this.store.select(selectCardById(this.cardId)).subscribe((card) => {
        this.initialCard = { ...card };
        delete this.initialCard.id;
        this.createForm(card);
      });
    } else {
      this.initialCard = {} as Card;
      this.createForm({} as Card);
    }
  }

  save() {
    if (this.form.get('cardType').value !== CardType.ship) {
      // Don't save ship data when it's not a ship
      delete this.form.value.ship;
    }
    const toSave = this.cardId ? { ...this.form.value, id: this.cardId } : { ...this.form.value };
    this.store.dispatch(saveCard({ card: toSave }));
  }

  addEffect(): void {
    this.effects.push(this.createEffectGroup());
  }

  removeEffect(index: number): void {
    this.effects.removeAt(index);
  }

  createEffectGroup(effect?: CardEffect): FormGroup {
    return new FormGroup({
      name: new FormControl(effect?.name || '', [Validators.required, Validators.minLength(3)]),
      value: new FormControl(effect?.value || 0, [Validators.required]),
    });
  }

  private createForm(card: Card) {
    this.form = new FormGroup({
      title: new FormControl(card?.title, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(card?.description, [Validators.required, Validators.maxLength(100)]),
      imageUrl: new FormControl(card?.imageUrl, [Validators.required]),
      cost: new FormControl(card?.cost || 1, [Validators.required, Validators.min(0), Validators.max(10)]),
      cardType: new FormControl(card?.cardType || CardType.ship, [Validators.required]),
      rarity: new FormControl(card?.rarity || CardRarity.common, [Validators.required]),
      effects: new FormArray(card?.effects ? card.effects.map((effect) => this.createEffectGroup(effect)) : []),
      ship: new FormGroup({
        transparentImageUrl: new FormControl(card['ship']?.transparentImageUrl),
        maxHealth: new FormControl(card['ship']?.maxHealth || 1, [Validators.min(1)]),
        baseAttack: new FormControl(card['ship']?.baseAttack || 1, [Validators.min(0)]),
        initiative: new FormControl(card['ship']?.initiative || 50, [Validators.min(0)]),
      }),
    });

    this.form.get('cardType').valueChanges.subscribe((selectedType) => {
      this.updateShipStats(selectedType, card);
    });
  }

  private updateShipStats(type: string, card: Card) {
    const shipStats = this.form.get('ship') as FormGroup;
    if (type === CardType.ship) {
      const shipData = (card as ShipCard).ship;
      shipStats.addControl(
        'transparentImageUrl',
        new FormControl(card['ship']?.transparentImageUrl, [Validators.required])
      );
      shipStats.addControl(
        'maxHealth',
        new FormControl(shipData?.maxHealth || 1, [Validators.required, Validators.min(1)])
      );
      shipStats.addControl(
        'baseAttack',
        new FormControl(shipData?.baseAttack || 1, [Validators.required, Validators.min(0)])
      );
      shipStats.addControl(
        'initiative',
        new FormControl(shipData?.initiative || 50, [Validators.required, Validators.min(0)])
      );
    } else {
      shipStats.removeControl('transparentImageUrl');
      shipStats.removeControl('maxHealth');
      shipStats.removeControl('baseAttack');
      shipStats.removeControl('initiative');
    }
  }

  isFormChanged(): boolean {
    const formValue = { ...this.form.value };
    if (formValue.cardType !== CardType.ship) {
      delete formValue.ship;
    }
    return !SharedUtils.deepEqual(this.initialCard, formValue);
  }
}
