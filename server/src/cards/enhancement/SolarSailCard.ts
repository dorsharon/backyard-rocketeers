import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * Solar Sail - +20% speed if Solar Wind occurs (L1 & L2).
 * Synergy enhancement card that boosts speed when Solar Wind is active.
 *
 * See CARDS_CATALOG.md - "Solar Sail"
 */
export class SolarSailCard extends EnhancementCard {
	readonly id = 'solar_sail';
	readonly name = 'Solar Sail';
	readonly effect =
		"If you get a Solar Wind during your space journey, you'll gain an extra 20% speed";
	readonly description =
		"If you get a Solar Wind during your space journey, you'll gain an extra 20% speed.";
	readonly availableAtLevels = [1, 2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing passive effect: synergizes with Solar Wind card
		// Provides +20% speed bonus when Solar Wind is active
		// Implemented through game logic that checks for this enhancement
		// Check with: player.hasCard('solar_sail')
		player.enhancements.push(this.toSchema());
	}
}
