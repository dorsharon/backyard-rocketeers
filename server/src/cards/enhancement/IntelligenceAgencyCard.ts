import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * Intelligence Agency - See covert actions applied to you.
 * Ongoing passive defensive enhancement for Level 1.
 *
 * See CARDS_CATALOG.md - "Intelligence Agency"
 */
export class IntelligenceAgencyCard extends EnhancementCard {
	readonly id = 'intelligence_agency';
	readonly name = 'Intelligence Agency';
	readonly description =
		'As long as this card is in effect, you can see covert actions that are applied to you.';
	readonly availableAtLevels = [1];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing effect: reveals covert cards played against this player
		// This is managed through the player's state flag
		player.hasIntelligenceAgency = true;
	}
}
