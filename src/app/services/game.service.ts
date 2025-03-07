import { Injectable } from '@angular/core';
import { Card, CardType, GameState, ShipCard } from '@app/models';
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
    playerShips: [],
    enemyShips: [],
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

  resolveBattle() {
    const state = this.getState();
    // Sort ships by initiative
    state.playerShips.sort((a, b) => b.ship.initiative - a.ship.initiative);
    state.enemyShips.sort((a, b) => b.ship.initiative - a.ship.initiative);

    // Resolve attacks
    this.handleAttacks(state.playerShips, state.enemyShips);
    this.handleAttacks(state.enemyShips, state.playerShips, true);
  }

  handleAttacks(attackingShips: ShipCard[], defendingShips: ShipCard[], targetArk = false) {
    for (let attacker of attackingShips) {
      if (defendingShips.length > 0) {
        const target = defendingShips[0]; // Target the first available enemy ship
        if (target) {
          target.ship.health -= attacker.ship.attack;
          console.log(`${attacker.title} attacks ${target.title} for ${attacker.ship.attack} damage!`);

          // Remove ship if destroyed
          if (target.ship.health <= 0) {
            console.log(`${target.title} is destroyed!`);
            defendingShips.shift();
          }
        } else if (targetArk) {
          this.takeDamage(attacker.ship.attack);
        }
      }
    }
  }
}
