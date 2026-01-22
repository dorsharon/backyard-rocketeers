import { GameState } from "../schemas/GameState";
import { Player } from "../schemas/Player";
import { CardSchema } from "../schemas/CardSchema";

/**
 * Base abstract class for all cards in the game.
 * Every card is implemented as a TypeScript class with embedded logic.
 *
 * See GAME_RULES.md and CARDS_CATALOG.md for complete card specifications.
 * See CLAUDE.md - "Class-Based Card System" for architecture principles.
 */
export abstract class Card {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly type: "component" | "sabotage" | "ability" | "enhancement";
  abstract readonly description: string;
  abstract readonly availableAtLevels: number[];
  abstract readonly isCovert: boolean;

  /**
   * Check if this card can be played by the given player.
   * Override in subclasses for specific validation logic.
   */
  canPlay(gameState: GameState, player: Player, targetPlayerId?: string): boolean {
    // Default: can play if in player's hand
    return player.hand.some((c) => c.id === this.id);
  }

  /**
   * Execute the card's effect.
   * Must be implemented by all card subclasses.
   */
  abstract apply(
    gameState: GameState,
    player: Player,
    targetPlayerId?: string,
    additionalData?: any
  ): void;

  /**
   * Create a CardSchema representation for state synchronization.
   */
  abstract toSchema(): CardSchema;

  /**
   * Get a unique card instance ID (for multiple copies in deck).
   */
  protected generateInstanceId(): string {
    return `${this.id}-${Math.random().toString(36).substring(2, 11)}`;
  }
}
