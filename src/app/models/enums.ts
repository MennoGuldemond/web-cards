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

export enum EffectColor {
  positive = 'Positive',
  neutral = 'Neutral',
  negative = 'Negative',
}

export enum Effects {
  initiative = 'Initiative', // The lower the initiative, the earlier you get your turn in battle
  health = 'Health', // Add max health
  stealth = 'Stealth', // Cannot be attacked directly
  dodge = 'Dodge', // Decreases the chance of being hit in percentages
  regeneration = 'Regeneration', // Restores HP after a round
  shield = 'Shield', // Absorbs an amount of damage before health is affected
  retaliate = 'Retaliate', // Deals damage back to the attacker
  logistics = 'Logistics', // Draw extra cards
  gravityWell = 'Gravity well', // Slows initiative of enemy ships
  consume = 'Consume', // Card can be used once per game
  retain = 'Retain', // Card does not get discarded end of turn
  credits = 'Credits', // Add credits
  fuel = 'Fuel', // Add fuel
}

export enum TurnPhase {
  EnemyPlay,
  PlayerPlay,
  BattleResolve,
  DrawPhase,
}
