import { Card, CardEffect, CardType, ShipCard } from '@app/models';
import { v4 as uuidv4 } from 'uuid';

export function isShip(card: Card): boolean {
  return card.cardType === CardType.ship;
}

/** Retruns a ShipCard with the default properties set based on the cards data. */
export function asShipCard(card: Card): ShipCard {
  if (isShip(card)) {
    let shipCard = { ...card } as ShipCard;
    shipCard.ship = { ...shipCard.ship, health: shipCard.ship.maxHealth, attack: shipCard.ship.baseAttack };
    return shipCard;
  }
  return null;
}

/** Retruns a ShipCard with the default properties set and a new id to keep track of it in the battlefield. */
export function asShip(card: Card): ShipCard {
  const shipCard = asShipCard(card);
  if (shipCard) {
    shipCard.id = uuidv4();
    return shipCard;
  }
  return null;
}

/** Retruns the card with a new random id. */
export function withRandomId(card: Card): Card {
  return { ...card, id: uuidv4() };
}

export function mergeEffects(existing: CardEffect[], incoming: CardEffect[]): CardEffect[] {
  const result = [...existing];

  for (const newEffect of incoming) {
    const index = result.findIndex((e) => e.name === newEffect.name);
    if (index > -1) {
      // Merge the value into the existing effect
      result[index] = {
        ...result[index],
        value: result[index].value + newEffect.value,
      };
    } else {
      // Add new effect
      result.push({ ...newEffect });
    }
  }

  return result;
}
