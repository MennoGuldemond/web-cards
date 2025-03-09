import { Injectable } from '@angular/core';
import { ShipCard } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  resolveBattle() {
    // TODO: move to state?
    const state = {} as any;
    // Sort ships by initiative
    state.playerShips.sort((a, b) => b.ship.initiative - a.ship.initiative);
    state.enemyShips.sort((a, b) => b.ship.initiative - a.ship.initiative);

    // Resolve attacks
    this.handleAttacks(state.playerShips, state.enemyShips);
    this.handleAttacks(state.enemyShips, state.playerShips, true);
  }

  private handleAttacks(attackingShips: ShipCard[], defendingShips: ShipCard[], targetArk = false) {
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
          // this.takeDamage(attacker.ship.attack);
        }
      }
    }
  }
}
