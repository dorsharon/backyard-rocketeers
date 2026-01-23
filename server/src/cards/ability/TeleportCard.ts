import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Teleport - Gain 10km of travel distance.
 * Reliable movement boost in Level 2. More common than Wrap-Drive Generator.
 *
 * See CARDS_CATALOG.md - "Teleport"
 */
export class TeleportCard extends AbilityCard {
	readonly id = 'teleport';
	readonly name = 'Teleport';
	readonly description = 'Gain 10km of travel distance';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Only applies in Level 2 (space travel)
		if (player.level === 2) {
			// +10km reliable movement boost
			player.distanceFromMars += 10;
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
