import { Injectable } from '@angular/core';
import { Card, CardType, GameState } from '@app/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private initialState: GameState = {
    arkHealth: 20,
    credits: 2,
    fuel: 5,
    turn: 1,
  };

  private gameStateSubject = new BehaviorSubject<GameState>(this.initialState);
  gameState$ = this.gameStateSubject.asObservable();

  getState(): GameState {
    return this.gameStateSubject.getValue();
  }

  updateState(partialState: Partial<GameState>) {
    const currentState = this.getState();
    this.gameStateSubject.next({ ...currentState, ...partialState });
  }

  playCard(card: Card) {
    if (card.type === CardType.ship) {
      this.useFuel(card.cost);
    } else {
      this.spendCredits(card.cost);
    }
  }

  takeDamage(amount: number) {
    const currentState = this.getState();
    this.updateState({ arkHealth: Math.max(0, currentState.arkHealth - amount) });
  }

  spendCredits(amount: number) {
    const currentState = this.getState();
    if (currentState.credits >= amount) {
      this.updateState({ credits: currentState.credits - amount });
    }
  }

  useFuel(amount: number) {
    const currentState = this.getState();
    if (currentState.fuel >= amount) {
      this.updateState({ fuel: currentState.fuel - amount });
    }
  }

  refuel(amount: number) {
    const currentState = this.getState();
    this.updateState({ fuel: currentState.fuel + amount });
  }
}
