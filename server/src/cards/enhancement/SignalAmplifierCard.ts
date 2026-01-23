import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * Signal Amplifier - All antennas provide +1 additional signal.
 * Signal enhancement multiplier for Level 3.
 *
 * See CARDS_CATALOG.md - "Signal Amplifier"
 */
export class SignalAmplifierCard extends EnhancementCard {
	readonly id = 'signal_amplifier';
	readonly name = 'Signal Amplifier';
	readonly description =
		'All your communication components (antennas, dishes, arrays) provide +1 additional Signal Strength.';
	readonly availableAtLevels = [3];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing passive effect: +1 signal multiplier for all signal components
		// Examples with this enhancement:
		// - Basic Antenna (1) → 2 signal
		// - Satellite Dish (2) → 3 signal (instant win!)
		// - Deep Space Array (3) → 4 signal (guaranteed victory)
		// Very powerful for signal win condition
		// Check with: player.hasCard('signal_amplifier')
		player.enhancements.push(this.toSchema());
	}
}
