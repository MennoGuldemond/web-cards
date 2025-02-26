import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Card, CardEffect, CardRarity, CardType, Effects } from '@app/models';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { CardsService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';

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
  private cardService: CardsService = inject(CardsService);
  private route = inject(ActivatedRoute);
  private router: Router = inject(Router);

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
      this.cardService.get(this.cardId).subscribe((card) => {
        this.createForm(card);
      });
    } else {
      this.createForm({} as Card);
    }
  }

  save() {
    const toSave = this.cardId ? { ...this.form.value, id: this.cardId } : { ...this.form.value };
    this.cardService.save(toSave).subscribe((savedCard) => {
      console.log(savedCard);
      this.router.navigate(['cards-overview']);
    });
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
      type: new FormControl(card?.type || CardType.ship, [Validators.required]),
      rarity: new FormControl(card?.rarity || CardRarity.common, [Validators.required]),
      effects: new FormArray(card?.effects ? card.effects.map((effect) => this.createEffectGroup(effect)) : []),
    });
  }
}
