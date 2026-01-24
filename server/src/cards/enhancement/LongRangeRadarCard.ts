import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * Long Range Radar - Detects and avoids Asteroid Storms.
 * Defensive enhancement for Level 2.
 *
 * See CARDS_CATALOG.md - "Long Range Radar"
 */
export class LongRangeRadarCard extends EnhancementCard {
	readonly id = 'long_range_radar';
	readonly name = 'Long Range Radar';
	readonly effect = 'Detect and avoid asteroid storms';
	readonly description = 'Detect and avoid asteroid storms.';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing protection: completely negates Asteroid Storm sabotage
		// Asteroid Storms played against this player have no effect
		// Defensive enhancement paired with other hazard protections
		// Check with: player.hasCard('long_range_radar')
		player.enhancements.push(this.toSchema());
	}
}
