import { Card, CardType, ShipCard } from '@app/models';

export function isShip(card: Card): boolean {
  return card.cardType === CardType.ship;
}

export function asShip(card: Card): ShipCard {
  if (isShip(card)) {
    let shipCard = { ...card } as ShipCard;
    shipCard.ship = { ...shipCard.ship, health: shipCard.ship.maxHealth, attack: shipCard.ship.baseAttack };
    return shipCard;
  }
  return null;
}
