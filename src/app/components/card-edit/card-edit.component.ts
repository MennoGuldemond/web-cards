import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Card, CardRarity, CardType } from '@app/models';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { CardsService } from '@app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-card-edit',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatSelectModule, KeyValuePipe],
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

  private createForm(card: Card) {
    this.form = new FormGroup({
      title: new FormControl(card?.title, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(card?.description, [Validators.required, Validators.maxLength(100)]),
      imageUrl: new FormControl(card?.imageUrl, [Validators.required]),
      cost: new FormControl(card?.cost || 1, [Validators.required, Validators.min(0), Validators.max(10)]),
      type: new FormControl(card?.type || CardType.ship, [Validators.required]),
      rarity: new FormControl(card?.rarity || CardRarity.common, [Validators.required]),
    });
  }
}
