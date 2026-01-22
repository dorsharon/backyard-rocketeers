import { SabotageCard } from "../SabotageCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Resource Raid - Steal 1 fuel tank card from target player's hand.
 * Target chooses which fuel tank to give if they have multiple.
 *
 * See CARDS_CATALOG.md - "Resource Raid"
 */
export class ResourceRaidCard extends SabotageCard {
  readonly id = "resource_raid";
  readonly name = "Resource Raid";
  readonly description = "Finders keepers, losers weepers!";
  readonly availableAtLevels = [1];
  readonly isCovert = false;

  canPlay(gameState: GameState, player: Player, targetPlayerId?: string): boolean {
    if (!super.canPlay(gameState, player, targetPlayerId)) return false;

    const target = gameState.players.get(targetPlayerId!);
    if (!target) return false;

    // Target must have at least one fuel tank in hand
    return target.hand.some(card => card.name.includes("Fuel Tank"));
  }

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    if (!targetPlayerId) return;

    const target = gameState.players.get(targetPlayerId);
    if (!target) return;

    // Find fuel tank cards in target's hand
    const fuelTankIndex = target.hand.findIndex(card => card.name.includes("Fuel Tank"));
    if (fuelTankIndex === -1) return;

    // Remove from target's hand and add to player's hand
    const stolenCard = target.hand.splice(fuelTankIndex, 1)[0];
    player.hand.push(stolenCard);
  }
}
