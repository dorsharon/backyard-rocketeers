import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * All-Terrain Wheels - +20% rover speed.
 * Movement enhancement for Level 3.
 *
 * See CARDS_CATALOG.md - "All-Terrain Wheels"
 */
export class AllTerrainWheelsCard extends EnhancementCard {
	readonly id = 'all_terrain_wheels';
	readonly name = 'All-Terrain Wheels';
	readonly description = 'Increase rover speed by 20%.';
	readonly availableAtLevels = [3];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing passive effect: +20% rover distance per turn
		// Examples:
		// - Improvised Rover (3km) → 3.6km per turn
		// - Second-Hand Rover (5km) → 6km per turn
		// - Cutting Edge Rover (7km) → 8.4km per turn
		// Helps reach 100km to alien base faster
		// Check with: player.hasCard('all_terrain_wheels')
		player.enhancements.push(this.toSchema());
	}
}
