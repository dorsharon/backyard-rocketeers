import { SabotageCard } from "../SabotageCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Alien Interference - Target player's rover moves in wrong direction: lose 10km toward Alien Base.
 * Only affects players who have deployed a rover.
 *
 * See CARDS_CATALOG.md - "Alien Interference"
 */
export class AlienInterferenceCard extends SabotageCard {
  readonly id = "alien_interference";
  readonly name = "Alien Interference";
  readonly description = "They're not as friendly as we thought! Maybe we should've called first.";
  readonly availableAtLevels = [3];
  readonly isCovert = false;

  canPlay(gameState: GameState, player: Player, targetPlayerId?: string): boolean {
    if (!super.canPlay(gameState, player, targetPlayerId)) return false;

    const target = gameState.players.get(targetPlayerId!);
    if (!target) return false;

    // Target must have deployed a rover
    return target.rocketComponents.some(c => c.name.includes("Rover"));
  }

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    if (!targetPlayerId) return;

    const target = gameState.players.get(targetPlayerId);
    if (!target) return;

    // Target loses 10km toward alien base
    // TODO: Implement distance tracking for Level 3
    // target.marsDistance = Math.max(0, target.marsDistance - 10);
  }
}
