import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * Solar Wind - +20% speed in Level 2.
 * Movement enhancement that provides instant speed boost in space.
 *
 * See CARDS_CATALOG.md - "Solar Wind"
 */
export class SolarWindCard extends EnhancementCard {
	readonly id = 'solar_wind';
	readonly name = 'Solar Wind';
	readonly description = 'Gain an extra 20% speed in Level 2.';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing passive effect: +20% speed boost in Level 2
		// This synergizes with Solar Sail (both together = 40% boost)
		// Implemented through game logic that applies speed multipliers
		// Check with: player.hasCard('solar_wind')
		player.enhancements.push(this.toSchema());
	}
}
