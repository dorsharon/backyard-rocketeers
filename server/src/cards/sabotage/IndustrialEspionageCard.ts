import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { SabotageCard } from '../SabotageCard';

/**
 * Industrial Espionage - Look at another player's hand for 2 turns.
 * Does NOT reveal covert cards on their rocket (only hand cards).
 *
 * See CARDS_CATALOG.md - "Industrial Espionage"
 */
export class IndustrialEspionageCard extends SabotageCard {
	readonly id = '2IfkMjKveeo6iiCa7vc4b';
	readonly name = 'Industrial Espionage';
	readonly description =
		"If you'll be a good boy, we might let you look at their browsing history too.";
	readonly availableAtLevels = [1];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		// TODO: Implement espionage tracking
		// Track that player can see target's hand for next 2 turns
		// This would need game state to track espionage effects
	}
}
