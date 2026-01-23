import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * Spy Satellite - See all opponent cards except covert.
 * Information advantage enhancement for Level 2.
 * Can be destroyed by Missile Attack sabotage.
 *
 * See CARDS_CATALOG.md - "Spy Satellite"
 */
export class SpySatelliteCard extends EnhancementCard {
	readonly id = 'spy_satellite';
	readonly name = 'Spy Satellite';
	readonly description =
		"All your opponent's cards (except covert) are visible to you.";
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing effect: reveals all opponent cards except covert cards
		// Provides information advantage for strategic planning
		// Check with: player.hasCard('spy_satellite')
		player.enhancements.push(this.toSchema());
	}
}
