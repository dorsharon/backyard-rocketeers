import { EnhancementCard } from "../EnhancementCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Enigma Machine - All your components become covert until Level 2.
 * Covert defensive enhancement for Level 1.
 *
 * See CARDS_CATALOG.md - "Enigma Machine"
 */
export class EnigmaMachineCard extends EnhancementCard {
  readonly id = "enigma_machine";
  readonly name = "Enigma Machine";
  readonly description =
    "All your components become covert until Level 2 is reached.";
  readonly availableAtLevels = [1];
  readonly isCovert = true;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // Ongoing effect: makes all rocket components appear covert
    // This prevents opponents from seeing what components the player has
    // Automatically discarded when entering Level 2
    player.hasEnigmaMachine = true;

    // Make all current components covert
    player.rocketComponents.forEach((component) => {
      component.isCovert = true;
    });
  }
}
