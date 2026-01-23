import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Emergency Thrusters - Advance 15km but lose 20% space fuel.
 * Trade-off card: speed for fuel in Level 2 space travel.
 *
 * See CARDS_CATALOG.md - "Emergency Thrusters"
 */
export class EmergencyThrustersCard extends AbilityCard {
	readonly id = 'emergency_thrusters';
	readonly name = 'Emergency Thrusters';
	readonly description = 'Advance 15km immediately but lose 20% space fuel';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Only applies in Level 2 (space travel)
		if (player.level === 2) {
			// Can't be used if player has less than 20% fuel remaining
			if (player.spaceFuel >= 20) {
				// Apply bonus and cost
				player.distanceFromMars += 15;
				player.spaceFuel = Math.max(0, player.spaceFuel - 20);
			}
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
