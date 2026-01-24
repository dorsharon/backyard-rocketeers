import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Space Gas Station - Add 30% fuel after launch.
 * Refueling card for extending space travel range in Level 2.
 *
 * See CARDS_CATALOG.md - "Space Gas Station"
 */
export class SpaceGasStationCard extends AbilityCard {
	readonly id = 'space_gas_station';
	readonly name = 'Space Gas Station';
	readonly effect = 'Refuel on the go (Add 30% fuel after launch)';
	readonly description = 'Is there a McDrive there too?';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Only applies in Level 2 (space travel)
		if (player.level === 2) {
			// Add 30% space fuel (capped at 100%)
			player.spaceFuel = Math.min(100, player.spaceFuel + 30);
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
