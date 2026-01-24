import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { SabotageCard } from '../SabotageCard';

/**
 * Dust Storm - Blocks solar panel from producing power for 3 turns.
 * Does NOT affect Windmill Generator or Geothermal Power Plant.
 *
 * See CARDS_CATALOG.md - "Dust Storm"
 */
export class DustStormCard extends SabotageCard {
	readonly id = 'GWBJ9axStwo5JqGn0o5ex';
	readonly name = 'Dust Storm';
	readonly effect =
		'Block any solar panel on the surface and prevent it from producing power for 3 turns';
	readonly description =
		"Guys, I told you, no more beans for dinner! now look what you've done...";
	readonly availableAtLevels = [3];
	readonly isCovert = false;

	canPlay(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
	): boolean {
		if (!super.canPlay(gameState, player, targetPlayerId)) return false;

		const target = gameState.players.get(targetPlayerId!);
		if (!target) return false;

		// Target must have at least one solar panel component
		return target.rocketComponents.some((c) => c.name.includes('Solar Panels'));
	}

	apply(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
		additionalData?: any,
	): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		// additionalData should contain: { solarPanelComponentIndex }
		// TODO: Add status effect to block solar panel for 3 turns
		// Would need game state to track status effects on specific components
	}
}
