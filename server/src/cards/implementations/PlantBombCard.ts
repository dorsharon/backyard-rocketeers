import { SabotageCard } from "../SabotageCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Plant Bomb - Covert sabotage that destroys a chosen component when revealed.
 * Placed covertly on opponent's rocket, can be detonated later.
 *
 * See CARDS_CATALOG.md - "Plant Bomb"
 */
export class PlantBombCard extends SabotageCard {
  readonly id = "plant_bomb";
  readonly name = "Plant Bomb";
  readonly description = "Covert. Place on opponent rocket. Detonate to destroy chosen component.";
  readonly levels = [1];
  readonly isCovert = true;

  canPlay(gameState: GameState, player: Player, targetPlayerId?: string): boolean {
    if (!targetPlayerId) return false;

    const target = gameState.players.get(targetPlayerId);
    if (!target) return false;

    // Can't plant on self
    if (target.sessionId === player.sessionId) return false;

    // Target must have rocket components
    if (target.rocketComponents.length === 0) return false;

    // Check covert card limit on target
    return target.covertCardsCount < 2;
  }

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    if (!targetPlayerId) return;

    const target = gameState.players.get(targetPlayerId);
    if (!target) return;

    // Add bomb to target's rocket as covert component
    const bombSchema = this.toSchema();
    bombSchema.isRevealed = false; // Keep hidden
    target.rocketComponents.push(bombSchema);
    target.covertCardsCount++;
  }
}
