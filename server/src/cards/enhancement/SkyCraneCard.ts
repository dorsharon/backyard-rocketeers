import { EnhancementCard } from "../EnhancementCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Sky Crane - 100% safe landing guarantee.
 * Landing enhancement for Level 3.
 *
 * See CARDS_CATALOG.md - "Sky Crane"
 */
export class SkyCraneCard extends EnhancementCard {
  readonly id = "sky_crane";
  readonly name = "Sky Crane";
  readonly description =
    "Gives you 100% chance of landing your spacecraft safely.";
  readonly availableAtLevels = [3];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // Ongoing effect: guarantees safe landing
    // Removes all landing failure risks
    // Negates nose cone failure checks
    // Must be played before landing attempt
    player.hasSkyCrane = true;
  }
}
