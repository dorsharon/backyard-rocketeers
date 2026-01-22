import { AbilityCard } from "../AbilityCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Supernova - Destroy all Enhancement cards from one target player.
 * Extremely powerful late-game sabotage. Only 1 copy in Level 1 deck.
 *
 * See CARDS_CATALOG.md - "Supernova"
 */
export class SupernovaCard extends AbilityCard {
  readonly id = "supernova";
  readonly name = "Supernova";
  readonly description = "Destroy all Enhancement cards from one target player";
  readonly availableAtLevels = [1];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    if (!targetPlayerId) return;

    const target = gameState.players.get(targetPlayerId);
    if (!target || target.enhancements.length === 0) return;

    // Destroy all enhancement cards
    target.enhancements.splice(0, target.enhancements.length);

    // Remove this card from player's hand after use
    const cardIndex = player.hand.findIndex((c) => c.id === this.id);
    if (cardIndex > -1) {
      player.hand.splice(cardIndex, 1);
    }
  }
}
