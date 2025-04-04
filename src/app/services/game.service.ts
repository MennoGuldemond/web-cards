import { Injectable } from '@angular/core';
import { ShipCard } from '@app/models';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  generateEnemyWave(availableEnemyShips: ShipCard[], stage: number): ShipCard[] {
    // Define difficulty scaling based on stage
    const minLevel = Math.max(1, stage - 2); // Ensure minimum level is at least 1
    const maxLevel = stage + 1;
    const maxTotalLevel = stage * 3; // Limit total difficulty per wave

    // Filter available ships based on level range
    let potentialShips = availableEnemyShips.filter(
      (enemy) => enemy.ship.isEnemy && enemy.ship.level >= minLevel && enemy.ship.level <= maxLevel
    );

    let selectedShips: ShipCard[] = [];
    let totalLevel = 0;

    while (totalLevel < maxTotalLevel && potentialShips.length) {
      // Randomly select a ship from the available ones
      const selected = potentialShips[Math.floor(Math.random() * potentialShips.length)];

      // Ensure we don't exceed the maxTotalLevel constraint
      if (totalLevel + selected.ship.level <= maxTotalLevel) {
        selectedShips.push({ ...selected });
        totalLevel += selected.ship.level;
      }

      // Reduce the chance of selecting the same ship again
      potentialShips = potentialShips.filter((s) => s !== selected);
    }

    return selectedShips;
  }
}
