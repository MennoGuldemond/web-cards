import { CardEffect, Effects } from '@app/models';

export class EffectResolver {
  apply(effect: CardEffect) {
    switch (effect.name) {
      case Effects.health:
        break;
      default:
        break;
    }
  }
}
