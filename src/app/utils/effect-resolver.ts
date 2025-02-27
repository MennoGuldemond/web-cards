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
      case Effects.dodge:
        target.effects.push(effect);
        break;
      case Effects.stealth:
        target.effects.push(effect);
        break;
      default:
        break;
    }
  }
}
