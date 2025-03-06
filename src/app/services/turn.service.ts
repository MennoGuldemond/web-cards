import { Injectable } from '@angular/core';
import { TurnPhase } from '@app/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurnService {
  private turnPhase = new BehaviorSubject<TurnPhase>(TurnPhase.EnemyPlay);
  turnPhase$ = this.turnPhase.asObservable();

  nextPhase() {
    const currentPhase = this.turnPhase.getValue();

    switch (currentPhase) {
      case TurnPhase.EnemyPlay:
        this.handleEnemyTurn();
        this.turnPhase.next(TurnPhase.PlayerPlay);
        break;
      case TurnPhase.PlayerPlay:
        this.handlePlayerTurn();
        this.turnPhase.next(TurnPhase.BattleResolve);
        break;
      case TurnPhase.BattleResolve:
        this.resolveBattle();
        this.turnPhase.next(TurnPhase.DrawPhase);
        break;
      case TurnPhase.DrawPhase:
        this.refillPlayerHand();
        this.turnPhase.next(TurnPhase.EnemyPlay);
        break;
    }
  }

  private handleEnemyTurn() {
    console.log('Enemy is playing cards...');
    // TODO: Implement AI logic for selecting and playing enemy cards
  }

  private handlePlayerTurn() {
    console.log('Player turn: Choose cards to play');
    // TODO: Allow player actions and apply game logic
  }

  private resolveBattle() {
    console.log('Resolving battle...');
    // TODO: Calculate attack effects, apply damage
  }

  private refillPlayerHand() {
    console.log('Refilling player hand...');
    // TODO: Draw new cards from deck
  }
}
