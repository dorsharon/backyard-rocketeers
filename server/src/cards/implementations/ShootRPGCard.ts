import { SabotageCard } from "../SabotageCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";
import { roll1d6 } from "../../utils/dice";

/**
 * Shoot An RPG - Destroy 1 component (2 on roll 5-6).
 * Direct targeted destruction sabotage.
 *
 * See CARDS_CATALOG.md - "Shoot An RPG"
 */
export class ShootRPGCard extends SabotageCard {
  readonly id = "shoot_rpg";
  readonly name = "Shoot An RPG";
  readonly description = "Destroy 1 component. Roll 5-6: destroy 2 components.";
  readonly levels = [1];
  readonly isCovert = false;

  apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
    if (!targetPlayerId) return;

    const target = gameState.players.get(targetPlayerId);
    if (!target || target.rocketComponents.length === 0) return;

    // Roll for bonus destruction
    const roll = roll1d6();
    const destroyCount = roll >= 5 ? 2 : 1;

    // Destroy components (from the end, arbitrary choice)
    for (let i = 0; i < destroyCount && target.rocketComponents.length > 0; i++) {
      const destroyed = target.rocketComponents.pop();
      if (destroyed && destroyed.isCovert && !destroyed.isRevealed) {
        target.covertCardsCount--;
      }
    }

    // Check if rocket is destroyed (no components left)
    if (target.rocketComponents.length === 0) {
      target.hasLaunchPad = false;
    }
  }
}
