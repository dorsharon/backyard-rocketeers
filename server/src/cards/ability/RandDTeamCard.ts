import { AbilityCard } from "../AbilityCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * R&D Team - Upgrade all your components.
 * Opposite of Reverse Engineering - strengthens your entire rocket.
 *
 * See CARDS_CATALOG.md - "R&D Team"
 */
export class RandDTeamCard extends AbilityCard {
  readonly id = "randd_team";
  readonly name = "R&D Team";
  readonly description = "Upgrade all your components";
  readonly availableAtLevels = [1, 3];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // Upgrade all player's components one tier:
    // Improvised -> Second-hand
    // Second-hand -> Cutting Edge
    // Cutting Edge -> stays Cutting Edge (already max)

    player.rocketComponents.forEach((component) => {
      const componentName = component.name;

      // Check for Improvised
      if (componentName.includes("Improvised")) {
        // Replace with Second-hand version
        const newName = componentName.replace("Improvised", "Second-hand");
        component.name = newName;
        component.strength = Math.min(3, component.strength + 1);
      }
      // Check for Second-hand
      else if (
        componentName.includes("Second-hand") ||
        componentName.includes("Second-Hand")
      ) {
        // Replace with Cutting Edge version
        const newName = componentName
          .replace("Second-hand", "Cutting Edge")
          .replace("Second-Hand", "Cutting Edge");
        component.name = newName;
        component.strength = Math.min(3, component.strength + 1);
      }
      // Cutting Edge components stay the same (already max tier)
    });

    // Remove this card from player's hand after use
    const cardIndex = player.hand.findIndex((c) => c.id === this.id);
    if (cardIndex > -1) {
      player.hand.splice(cardIndex, 1);
    }
  }
}
