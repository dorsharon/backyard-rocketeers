import { AbilityCard } from "../AbilityCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Drag Chute - Increase landing chance by 30%.
 * Critical for safe landing on Mars (Level 2->3 transition).
 *
 * See CARDS_CATALOG.md - "Drag Chute"
 */
export class DragChuteCard extends AbilityCard {
  readonly id = "drag_chute";
  readonly name = "Drag Chute";
  readonly description = "Increases the chance of safe landing by 30%";
  readonly availableAtLevels = [3];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // This card provides +30% landing success chance
    // Implementation would use this bonus during landing checks
    // Stacks with Cutting Edge Nose Cone (+20%) for +50% total
    // In practical implementation, this would be stored as an active bonus
    // when landing is attempted

    // For now, this is a passive card that gets used when landing
    // The actual landing mechanics would check for this card in hand
    // and apply the bonus during the landing roll

    // Remove this card from player's hand after use
    const cardIndex = player.hand.findIndex((c) => c.id === this.id);
    if (cardIndex > -1) {
      player.hand.splice(cardIndex, 1);
    }
  }
}
