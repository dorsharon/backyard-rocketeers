import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { rollDice } from '../../utils/dice';
import { AbilityCard } from '../AbilityCard';

/**
 * Asteroid Mining - Roll 3d6 for km gained AND 20% space fuel.
 * Provides both distance and fuel simultaneously. Only 1 copy in Level 2 deck (RARE!).
 *
 * See CARDS_CATALOG.md - "Asteroid Mining"
 */
export class AsteroidMiningCard extends AbilityCard {
	readonly id = 'asteroid_mining';
	readonly name = 'Asteroid Mining';
	readonly effect =
		'Roll 3d6. Gain that total in km of travel distance AND 20% space fuel';
	readonly description =
		'Roll 3d6. Gain that total in km of travel distance AND 20% space fuel';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Only applies in Level 2 (space travel)
		if (player.level === 2) {
			// Roll 3d6 for distance (range: 3-18km)
			const rolls = rollDice(3);
			const distanceGain = rolls.reduce((sum, roll) => sum + roll, 0);

			// Apply distance gain
			player.distanceFromMars += distanceGain;

			// BONUS: Also gain 20% space fuel
			player.spaceFuel = Math.min(100, player.spaceFuel + 20);
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
