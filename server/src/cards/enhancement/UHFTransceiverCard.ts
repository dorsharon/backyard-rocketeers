import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * UHF Transceiver - Immune to Cyber Attack.
 * Defensive enhancement for Level 2.
 *
 * See CARDS_CATALOG.md - "UHF Transceiver"
 */
export class UHFTransceiverCard extends EnhancementCard {
	readonly id = 'uhf_transceiver';
	readonly name = 'UHF Transceiver';
	readonly effect =
		'This com device is not affected by a cyber attack, so you can avoid navigation errors';
	readonly description =
		'This com device is not affected by a cyber attack, so you can avoid navigation errors.';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing protection: completely blocks Cyber Attack sabotage
		// Navigation errors from Cyber Attack have no effect
		// Prevents 50km setbacks from Cyber Attack card
		// Check with: player.hasCard('uhf_transceiver')
		player.enhancements.push(this.toSchema());
	}
}
