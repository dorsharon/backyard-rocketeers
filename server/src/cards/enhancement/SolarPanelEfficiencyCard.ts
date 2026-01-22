import { EnhancementCard } from "../EnhancementCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Solar Panel Efficiency - All solar panels +5% power (RARE - 1 copy).
 * Power enhancement multiplier for Level 3.
 *
 * See CARDS_CATALOG.md - "Solar Panel Efficiency"
 */
export class SolarPanelEfficiencyCard extends EnhancementCard {
  readonly id = "solar_panel_efficiency";
  readonly name = "Solar Panel Efficiency";
  readonly description =
    "All your solar panel components produce +5% additional power per turn.";
  readonly availableAtLevels = [3];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // Ongoing passive effect: +5% power for all solar panels
    // Only affects solar panels (Improvised, Second-Hand, Cutting Edge)
    // Does NOT affect Windmill Generator or Geothermal Power Plant
    // Examples with this enhancement:
    // - Improvised Solar (10%) → 15% per turn
    // - Second-Hand Solar (20%) → 25% per turn
    // - Cutting Edge Solar (30%) → 35% per turn
    // Significant power boost for solar-heavy builds
    // RARE: Only 1 copy in entire Level 3 deck
    player.hasSolarPanelEfficiency = true;
  }
}
