import { Card, CardEffect, Effects, ShipCard } from '@app/models';

export function applyToShip(effect: CardEffect, target: ShipCard) {
  switch (effect.name) {
    case Effects.health:
      const updatedHealth = target.ship.health + effect.value;
      target.ship.health = updatedHealth > target.ship.maxHealth ? target.ship.maxHealth : updatedHealth;
      break;
    case Effects.initiative:
      target.ship.initiative += effect.value;
      break;
    default:
      target.effects.push(effect);
      break;
  }
}

export function getDescription(effect: CardEffect): string {
  switch (effect.name) {
    case Effects.health:
      return `Increases max health by ${effect.value}.`;
    case Effects.initiative:
      return `Change initiative by ${effect.value}.`;
    case Effects.dodge:
      return `Decreases the change to be hit by ${effect.value}%`;
    case Effects.stealth:
      return `Cannot be attacked directly`;
    case Effects.regeneration:
      return `Restore ${effect.value} HP after each round.`;
    default:
      return '';
  }
}
