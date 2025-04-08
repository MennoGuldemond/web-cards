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
    case Effects.logistics:
      return `Draw ${effect.value} cards.`;
    case Effects.retaliate:
      return `Deal ${effect.value} damage back to the attacker.`;
    case Effects.gravityWell:
      return `Slow initiative of enemy ships by ${effect.value}.`;
    case Effects.shield:
      return `Absorbs ${effect.value} damage before health is affected.`;
    case Effects.consume:
      return `Get's consumed on use.`;
    default:
      return '';
  }
}

export function getShortDescription(effect: CardEffect): string {
  switch (effect.name) {
    case Effects.health:
      return `Health ${effect.value > 0 ? '+ ' + effect.value : '- ' + effect.value}`;
    case Effects.initiative:
      return `Initiative ${effect.value > 0 ? '+ ' + effect.value : '- ' + effect.value}`;
    case Effects.dodge:
      return `Dodge ${effect.value > 0 ? '+ ' + effect.value : '- ' + effect.value}%`;
    case Effects.regeneration:
      return `Regeneration ${effect.value > 0 ? '+ ' + effect.value : '- ' + effect.value}`;
    case Effects.logistics:
      return `Logistics ${effect.value}`;
    case Effects.retaliate:
      return `Retaliate ${effect.value > 0 ? '+ ' + effect.value : '- ' + effect.value}`;
    case Effects.gravityWell:
      return `Gravity Well ${effect.value > 0 ? '+ ' + effect.value : '- ' + effect.value}`;
    case Effects.shield:
      return `Shield ${effect.value > 0 ? '+ ' + effect.value : '- ' + effect.value}`;
    case Effects.consume:
      return `Consume`;
    default:
      return '';
  }
}
