import { AbilityCard } from "../AbilityCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Repair Kit - Fix a broken rover (yours or another player's).
 * Restores rover functionality in Level 3. Can be used on any rover.
 *
 * See CARDS_CATALOG.md - "Repair Kit"
 */
export class RepairKitCard extends AbilityCard {
  readonly id = "repair_kit";
  readonly name = "Repair Kit";
  readonly description =
    "Fix a broken rover (yours or another player's), returning it to working condition";
  readonly availableAtLevels = [3];
  readonly isCovert = false;

  apply(
    gameState: GameState,
    player: Player,
    targetPlayerId?: string,
    additionalData?: any
  ): void {
    // Can repair any broken rover (even opponent's!)
    let targetPlayer = player;

    if (targetPlayerId) {
      const otherPlayer = gameState.players.get(targetPlayerId);
      if (otherPlayer) {
        targetPlayer = otherPlayer;
      }
    }

    // Implementation would mark the rover as repaired
    // The rover resumes providing distance per turn
    // In practice, this would clear any "broken" status flag

    // For now, this resets a broken rover to functioning state
    // This would be tracked by a separate "roverBroken" flag in real implementation
    targetPlayer.roverDistance = Math.max(1, targetPlayer.roverDistance);

    // Remove this card from player's hand after use
    const cardIndex = player.hand.findIndex((c) => c.id === this.id);
    if (cardIndex > -1) {
      player.hand.splice(cardIndex, 1);
    }
  }
}
