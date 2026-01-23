import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Newton's Third Law - Return an equal sabotage effect to the player who used it.
 * Reflects sabotage back to caster. Available in all levels.
 * Only 1 copy per level deck.
 *
 * See CARDS_CATALOG.md - "Newton's Third Law"
 */
export class NewtonsThirdLawCard extends AbilityCard {
	readonly id = 'newtons_third_law';
	readonly name = "Newton's Third Law";
	readonly description =
		'Return an equal sabotage effect to the player who used it against you';
	readonly availableAtLevels = [1, 2, 3];
	readonly isCovert = false;

	apply(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
		additionalData?: any,
	): void {
		if (!targetPlayerId || !additionalData) return;

		const caster = gameState.players.get(targetPlayerId);
		if (!caster) return;

		const { sabotageEffect } = additionalData;

		// This card reflects the EXACT same sabotage effect back to the caster
		// Examples:
		// - They Shoot RPG at you -> rolls against them instead
		// - They steal fuel -> you steal their fuel instead
		// - They send you back 50km -> they go back 50km instead

		if (sabotageEffect.type === 'damage') {
			// Reflect damage back to caster
			if (caster.rocketComponents.length > 0) {
				const count = sabotageEffect.count || 1;
				for (let i = 0; i < count && caster.rocketComponents.length > 0; i++) {
					const destroyed = caster.rocketComponents.pop();
					if (destroyed && destroyed.isCovert && !destroyed.isRevealed) {
						caster.covertCardsCount--;
					}
				}
			}
		} else if (sabotageEffect.type === 'distance') {
			// Reflect distance change back to caster
			caster.distanceFromMars += sabotageEffect.amount;
		} else if (sabotageEffect.type === 'fuel') {
			// Reflect fuel theft back to caster
			const fuelAmount = sabotageEffect.amount || 10;
			if (caster.groundFuel >= fuelAmount) {
				caster.groundFuel -= fuelAmount;
				player.groundFuel += fuelAmount;
			}
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
