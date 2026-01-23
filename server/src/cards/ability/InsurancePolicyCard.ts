import type { CardSchema } from '../../schemas/CardSchema';
import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Insurance Policy - Covert card that saves 2 components if rocket is destroyed.
 * Play before destruction happens to salvage parts.
 * Only 2 copies in Level 1 deck.
 *
 * See CARDS_CATALOG.md - "Insurance Policy"
 */
export class InsurancePolicyCard extends AbilityCard {
	readonly id = 'insurance_policy';
	readonly name = 'Insurance Policy';
	readonly description =
		'Play before your rocket is destroyed. If destroyed, keep 2 components of your choice';
	readonly availableAtLevels = [1];
	readonly isCovert = true;

	apply(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
		additionalData?: unknown,
	): void {
		// This card is played covertly on the player's rocket
		// When rocket is destroyed, the player chooses 2 components to keep
		// Those components go to the player's hand and can be replayed

		if (!additionalData) return;

		const { savedComponentIds = [] } = additionalData as {
			savedComponentIds?: string[];
		};

		// Find the 2 components to save (using regular array for collection)
		const componentsToSave: CardSchema[] = [];

		for (const componentId of savedComponentIds) {
			const component = player.rocketComponents.find(
				(c) => c.id === componentId,
			);
			if (component) {
				componentsToSave.push(component);
			}
		}

		// Move saved components to player's hand
		for (const component of componentsToSave) {
			const index = player.rocketComponents.indexOf(component);
			if (index > -1) {
				player.rocketComponents.splice(index, 1);
				player.hand.push(component);
			}
		}

		// Remove this card from player's rocket (it was played as covert)
		const cardIndex = player.rocketComponents.findIndex(
			(c) => c.id === this.id,
		);
		if (cardIndex > -1) {
			player.rocketComponents.splice(cardIndex, 1);
		}
	}
}
