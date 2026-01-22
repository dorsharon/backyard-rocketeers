import { EnhancementCard } from "../EnhancementCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Ion Thrusters - +3km every turn, even without fuel.
 * Passive movement enhancement for Level 2.
 *
 * See CARDS_CATALOG.md - "Ion Thrusters"
 */
export class IonThrustersCard extends EnhancementCard {
  readonly id = "ion_thrusters";
  readonly name = "Ion Thrusters";
  readonly description = "Gain 3km every turn, even without fuel.";
  readonly availableAtLevels = [2];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // Ongoing passive effect: +3km per turn
    // Works even with 0% fuel, providing guaranteed movement
    // Cannot be stopped by fuel sabotage
    player.hasIonThrusters = true;
  }
}
