import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { SabotageCard } from '../SabotageCard';

/**
 * Inspection Delay - Target player cannot place or replace any components during their next turn.
 * Does not prevent other actions (sabotage, abilities, drawing, launching).
 *
 * See CARDS_CATALOG.md - "Inspection Delay"
 */
export class InspectionDelayCard extends SabotageCard {
	readonly id = 'inspection_delay';
	readonly name = 'Inspection Delay';
	readonly description =
		'Red tape strikes again! Nothing like good old bureaucracy to slow things down.';
	readonly availableAtLevels = [1];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		// TODO: Add status effect to prevent component placement next turn
		// Would need game state to track status effects
	}
}
