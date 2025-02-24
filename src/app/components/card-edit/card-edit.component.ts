import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Card, CardRarity, CardType } from '@app/models';
import { CommonModule, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-card-edit',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatSelectModule, KeyValuePipe],
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.scss',
})
export class CardEditComponent implements OnInit {
  @Input() card: Card;

  form: FormGroup;
  cardTypeEnum = CardType;
  rarityEnum = CardRarity;

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(this.card?.title, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(this.card?.description, [Validators.required, Validators.maxLength(100)]),
      cost: new FormControl(this.card?.cost || 1, [Validators.required, Validators.min(0), Validators.max(10)]),
      type: new FormControl(this.card?.type || CardType.ship, [Validators.required]),
      rarity: new FormControl(this.card?.rarity || CardRarity.common, [Validators.required]),
    });
  }

  save() {
    console.log(this.form.value);
  }
}
