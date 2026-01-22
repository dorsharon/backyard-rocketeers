import { EnhancementCard } from "../EnhancementCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Thermal Radiation Meter - Detects and avoids Cosmic Rays.
 * Defensive enhancement for Level 2.
 *
 * See CARDS_CATALOG.md - "Thermal Radiation Meter"
 */
export class ThermalRadiationMeterCard extends EnhancementCard {
  readonly id = "thermal_radiation_meter";
  readonly name = "Thermal Radiation Meter";
  readonly description = "Detect and avoid cosmic rays.";
  readonly availableAtLevels = [2];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    // Ongoing protection: completely negates Cosmic Rays sabotage
    // Cosmic Rays played against this player have no effect
    // Critical for protecting fuselage from destruction
    player.hasThermalRadiationMeter = true;
  }
}
