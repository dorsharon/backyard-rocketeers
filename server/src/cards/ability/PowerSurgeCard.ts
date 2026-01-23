import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Power Surge - Gain 30% power immediately.
 * Does not require a generator. Emergency power boost in Level 3.
 *
 * See CARDS_CATALOG.md - "Power Surge"
 */
export class PowerSurgeCard extends AbilityCard {
	readonly id = 'power_surge';
	readonly name = 'Power Surge';
	readonly description =
		'Gain 30% power immediately (does not require a generator)';
	readonly availableAtLevels = [3];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Only applies in Level 3 (Mars surface)
		if (player.level === 3) {
			// Instant +30% power (capped at 100%)
			player.power = Math.min(100, player.power + 30);
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
