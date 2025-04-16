import { Card, CardEffect, Effects, ShipCard } from '@app/models';

export function generateEnemyWave(availableEnemyShips: ShipCard[], stage: number): ShipCard[] {
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

export function calculateHit(attacker: ShipCard, defender: ShipCard): boolean {
  let baseHitChance = 90;

  const dodgeEffect = defender.effects.find((e) => e.name === Effects.dodge);
  if (dodgeEffect) {
    baseHitChance -= dodgeEffect.value;
  }

  // Clamp hit chance to minimum of 0 and maximum of 100
  baseHitChance = Math.max(0, Math.min(100, baseHitChance));

  // Roll to see if the attack hits
  const roll = Math.random() * 100;
  return roll < baseHitChance;
}

export function hasEffect(card: Card, effectName: string): boolean {
  return card.effects.some((e) => e.name === effectName);
}

export function getEffect(card: Card, effectName: string): CardEffect {
  return card.effects.find((e) => e.name === effectName);
}
