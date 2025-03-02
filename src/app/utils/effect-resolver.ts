import { Card, CardEffect, Effects, ShipCard } from '@app/models';

export class EffectResolver {
  applyToShip(effect: CardEffect, target: ShipCard) {
    switch (effect.name) {
      case Effects.health:
        const updatedHealth = target.health + effect.value;
        target.health = updatedHealth > target.maxHealth ? target.maxHealth : updatedHealth;
        break;
      case Effects.initiative:
        target.initiative += effect.value;
        break;
      default:
        target.effects.push(effect);
        break;
    }
  }

  getDescription(effect: CardEffect): string {
    switch (effect.name) {
      case Effects.health:
        return `Increases max health by ${effect.value}.`;
      case Effects.initiative:
        return `Change initiative by ${effect.value}.`;
      case Effects.dodge:
        return ``;
      case Effects.stealth:
        return ``;
      case Effects.regeneration:
        return `Restore ${effect.value} HP after each round.`;
      default:
        return '';
    }
  }
}
