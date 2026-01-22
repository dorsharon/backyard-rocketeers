import { EnhancementCard } from "../EnhancementCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Long Range Radar - Detects and avoids Asteroid Storms.
 * Defensive enhancement for Level 2.
 *
 * See CARDS_CATALOG.md - "Long Range Radar"
 */
export class LongRangeRadarCard extends EnhancementCard {
  readonly id = "long_range_radar";
  readonly name = "Long Range Radar";
  readonly description = "Detect and avoid asteroid storms.";
  readonly availableAtLevels = [2];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // Ongoing protection: completely negates Asteroid Storm sabotage
    // Asteroid Storms played against this player have no effect
    // Defensive enhancement paired with other hazard protections
    player.hasLongRangeRadar = true;
  }
}
