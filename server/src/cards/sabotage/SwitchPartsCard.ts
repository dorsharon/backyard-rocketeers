import { SabotageCard } from "../SabotageCard";
import { GameState } from "../../schemas/GameState";
import { Player } from "../../schemas/Player";

/**
 * Switch Parts - Swap one of your non-covert components with opponent's non-covert component of same type.
 * Can upgrade your parts or sabotage their quality.
 *
 * See CARDS_CATALOG.md - "Switch Parts"
 */
export class SwitchPartsCard extends SabotageCard {
  readonly id = "wKUOn2OWOI3uscAsGZ6Ls";
  readonly name = "Switch Parts";
  readonly description = "They probably wouldn't even notice.";
  readonly availableAtLevels = [1];
  readonly isCovert = false;

  canPlay(gameState: GameState, player: Player, targetPlayerId?: string): boolean {
    if (!super.canPlay(gameState, player, targetPlayerId)) return false;

    const target = gameState.players.get(targetPlayerId!);
    if (!target) return false;

    // Both players must have non-covert components
    const hasNonCovertComponents = player.rocketComponents.some(c => !c.isCovert);
    const targetHasNonCovertComponents = target.rocketComponents.some(c => !c.isCovert);

    return hasNonCovertComponents && targetHasNonCovertComponents;
  }

  apply(gameState: GameState, player: Player, targetPlayerId?: string, additionalData?: any): void {
    if (!targetPlayerId) return;

    const target = gameState.players.get(targetPlayerId);
    if (!target) return;

    // additionalData should contain: { yourComponentIndex, theirComponentIndex }
    // Swap the components
    // TODO: Implement component swapping logic
  }
}
