export enum CardType {
  ship = 'Ship',
  support = 'Support',
  economic = 'Economic',
  stationUpgrade = 'Station Upgrade',
}

export enum CardRarity {
  common = 'Common',
  uncommon = 'Uncommon',
  rare = 'Rare',
}

export enum Effects {
  initiative = 'Initiative', // The higher the initiative, the earlier you get your turn in battle.
  health = 'Health', // Add max health
  stealth = 'Stealth', // Allows atticking without retaliation
  dodge = 'Dodge', // Decreases the chance of being hit in percentages
  regeneration = 'Regeneration', // Restores HP after a round
}

export enum TurnPhase {
  EnemyPlay,
  PlayerPlay,
  BattleResolve,
  DrawPhase,
}
