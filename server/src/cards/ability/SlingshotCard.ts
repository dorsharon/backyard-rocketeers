import { AbilityCard } from "../AbilityCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Slingshot - Gain +10km this turn and next turn when you launch.
 * Provides early momentum boost in Level 2 space travel.
 *
 * See CARDS_CATALOG.md - "Slingshot"
 */
export class SlingshotCard extends AbilityCard {
  readonly id = "slingshot";
  readonly name = "Slingshot";
  readonly description = "Gain +10km this turn and next turn when you launch";
  readonly availableAtLevels = [1];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // This card applies +10km on launch turn and the following turn
    // Provides +20km total over 2 turns starting when launched from Earth

    // Implementation would:
    // 1. Mark player as having Slingshot active
    // 2. Apply +10km on launch turn (Level 1 -> Level 2)
    // 3. Apply +10km on first turn of Level 2
    // 4. Then disable the effect

    if (player.level === 1) {
      // Mark as having slingshot benefit for launch
      player.distanceFromMars += 10;
    } else if (player.level === 2) {
      // Apply ongoing +10km bonus if already launched
      player.distanceFromMars += 10;
    }

    // Remove this card from player's hand after use
    const cardIndex = player.hand.findIndex((c) => c.id === this.id);
    if (cardIndex > -1) {
      player.hand.splice(cardIndex, 1);
    }
  }
}
