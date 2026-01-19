import { Card } from "./Card";
import { CardSchema } from "../schemas/CardSchema";

/**
 * Base class for all ability cards.
 * Abilities are one-time use cards that provide special effects.
 *
 * See GAME_RULES.md - "Ability Cards" section.
 */
export abstract class AbilityCard extends Card {
  readonly type = "ability" as const;

  toSchema(): CardSchema {
    return new CardSchema(
      this.generateInstanceId(),
      this.name,
      this.type,
      this.description,
      this.isCovert,
      0,
      0
    );
  }
}
