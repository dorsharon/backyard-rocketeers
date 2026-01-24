import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * X-Ray Machine - Reveal if Plant Bomb has been planted on your rocket.
 * Defensive counter to Plant Bomb sabotage.
 *
 * See CARDS_CATALOG.md - "X-Ray Machine"
 */
export class XRayMachineCard extends AbilityCard {
	readonly id = 'x_ray_machine';
	readonly name = 'X-Ray Machine';
	readonly effect = 'See if a bomb has been planted on your rocket';
	readonly description = 'I have nothing to hide';
	readonly availableAtLevels = [1];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// This card reveals if any Plant Bomb cards are covert on the player's rocket
		// In implementation, the effect would:
		// 1. Check if player has any covert Plant Bomb cards on their rocket
		// 2. Reveal them to the player
		// 3. If found, discard the bomb card

		const plantBombFound = player.rocketComponents.some(
			(component) =>
				component.id === 'plant_bomb' &&
				component.isCovert &&
				!component.isRevealed,
		);

		if (plantBombFound) {
			// Reveal and discard the Plant Bomb
			const plantBomb = player.rocketComponents.find(
				(c) => c.id === 'plant_bomb' && c.isCovert && !c.isRevealed,
			);
			if (plantBomb) {
				plantBomb.isRevealed = true;
				const index = player.rocketComponents.indexOf(plantBomb);
				if (index > -1) {
					player.rocketComponents.splice(index, 1);
				}
			}
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
