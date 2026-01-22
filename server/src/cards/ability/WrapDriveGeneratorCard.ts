import { AbilityCard } from "../AbilityCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Wrap-Drive Generator - Advance 50km instantly.
 * Massive movement boost in Level 2 space travel. Only 2 copies.
 *
 * See CARDS_CATALOG.md - "Wrap-Drive Generator"
 */
export class WrapDriveGeneratorCard extends AbilityCard {
  readonly id = "wrap_drive_generator";
  readonly name = "Wrap-Drive Generator";
  readonly description = "Advance 50km";
  readonly availableAtLevels = [2];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // Only applies in Level 2 (space travel)
    if (player.level === 2) {
      // +50km is massive distance boost
      player.distanceFromMars += 50;
    }

    // Remove this card from player's hand after use
    const cardIndex = player.hand.findIndex((c) => c.id === this.id);
    if (cardIndex > -1) {
      player.hand.splice(cardIndex, 1);
    }
  }
}
