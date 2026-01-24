import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Signal Booster - Gain +1 Signal Strength immediately.
 * Does not require a component slot. Instant signal boost in Level 3.
 *
 * See CARDS_CATALOG.md - "Signal Booster"
 */
export class SignalBoosterCard extends AbilityCard {
	readonly id = 'signal_booster';
	readonly name = 'Signal Booster';
	readonly effect =
		'Gain +1 Signal Strength immediately (does not require a component slot)';
	readonly description =
		'Gain +1 Signal Strength immediately (does not require a component slot)';
	readonly availableAtLevels = [3];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Only applies in Level 3 (Mars surface)
		if (player.level === 3) {
			// Instant +1 signal strength (capped at 3 needed for win)
			player.signalStrength = Math.min(3, player.signalStrength + 1);
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
