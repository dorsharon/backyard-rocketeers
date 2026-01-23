import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Laser Cannon - Shoot and destroy an asteroid, a rival rocket, or a rover on Mars.
 * Multi-purpose destruction card available in Level 2 and 3.
 *
 * See CARDS_CATALOG.md - "Laser Cannon"
 */
export class LaserCannonCard extends AbilityCard {
	readonly id = 'laser_cannon';
	readonly name = 'Laser Cannon';
	readonly description =
		'Shoot and destroy an asteroid, a rival rocket or even a rover on the surface of mars!';
	readonly availableAtLevels = [2, 3];
	readonly isCovert = false;

	apply(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
		additionalData?: any,
	): void {
		if (!targetPlayerId || !additionalData) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		const { targetType } = additionalData;

		// targetType can be: "asteroid", "rocket_component", or "rover"

		if (targetType === 'asteroid') {
			// Cancel an Asteroid Storm in progress
			// Implementation would track active hazards on target
			target.cumulativeDamage = 0;
		} else if (targetType === 'rocket_component') {
			// Destroy 1 component on rival rocket
			if (target.rocketComponents.length > 0) {
				const destroyed = target.rocketComponents.pop();
				if (destroyed && destroyed.isCovert && !destroyed.isRevealed) {
					target.covertCardsCount--;
				}
			}

			// Check if rocket is destroyed
			if (target.rocketComponents.length === 0) {
				target.hasLaunchPad = false;
			}
		} else if (targetType === 'rover') {
			// Destroy opponent's rover in Level 3
			if (player.level === 3 && target.roverDistance > 0) {
				target.roverDistance = 0;
			}
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
