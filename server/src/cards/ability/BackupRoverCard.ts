import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Backup Rover - Covert card that auto-deploys if main rover fails.
 * Provides 4km/turn and never fails. Insurance against rover sabotage.
 * Only 2 copies in Level 3 deck.
 *
 * See CARDS_CATALOG.md - "Backup Rover"
 */
export class BackupRoverCard extends AbilityCard {
	readonly id = 'backup_rover';
	readonly name = 'Backup Rover';
	readonly effect =
		'If your main rover fails or is destroyed, this rover automatically deploys and provides 4km/turn. Never fails.';
	readonly description =
		'If your main rover fails or is destroyed, this rover automatically deploys and provides 4km/turn. Never fails.';
	readonly availableAtLevels = [3];
	readonly isCovert = true;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// This card remains hidden until main rover fails
		// When activated, it provides 4km per turn and never fails
		// Implementation would:
		// 1. Check if main rover has failed/is destroyed
		// 2. If so, reveal this card and activate it
		// 3. Provide 4km per turn automatically

		// For now, when triggered, activate the backup rover
		// The actual trigger would be when main rover breaks

		// Auto-activate when main rover is gone
		if (player.roverDistance === 0 && player.level === 3) {
			// Activate backup rover: provides 4km per turn, never fails
			player.roverDistance = 4;
		}

		// If already activated, provide the distance per turn
		if (player.roverDistance > 0) {
			// Backup rover provides steady 4km per turn
			// Already set above on first activation
		}
	}
}
