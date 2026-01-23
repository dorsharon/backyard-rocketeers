import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Parallel Universe - Swap up to 3 components with target player.
 * Strategic trading card for upgrading or sabotaging. Only 1 copy in Level 1 deck.
 *
 * See CARDS_CATALOG.md - "Parallel Universe"
 */
export class ParallelUniverseCard extends AbilityCard {
	readonly id = 'parallel_universe';
	readonly name = 'Parallel Universe';
	readonly description = 'Swap up to 3 components with target player';
	readonly availableAtLevels = [1];
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

		const { playerComponents = [], targetComponents = [] } = additionalData;

		// Validate that we're not trying to swap Launch Pad
		const validPlayerComponents = playerComponents.filter(
			(componentId: string) => {
				const component = player.rocketComponents.find(
					(c) => c.id === componentId,
				);
				return component && component.name !== 'Launch Pad';
			},
		);

		const validTargetComponents = targetComponents.filter(
			(componentId: string) => {
				const component = target.rocketComponents.find(
					(c) => c.id === componentId,
				);
				return component && component.name !== 'Launch Pad';
			},
		);

		// Only swap up to 3 of each
		const numSwaps = Math.min(
			3,
			validPlayerComponents.length,
			validTargetComponents.length,
		);

		// Perform swaps
		for (let i = 0; i < numSwaps; i++) {
			const playerComponentId = validPlayerComponents[i];
			const targetComponentId = validTargetComponents[i];

			const playerComponent = player.rocketComponents.find(
				(c) => c.id === playerComponentId,
			);
			const targetComponent = target.rocketComponents.find(
				(c) => c.id === targetComponentId,
			);

			if (!playerComponent || !targetComponent) continue;

			// Swap components between player and target
			const playerIndex = player.rocketComponents.indexOf(playerComponent);
			const targetIndex = target.rocketComponents.indexOf(targetComponent);

			if (playerIndex > -1 && targetIndex > -1) {
				const temp = player.rocketComponents[playerIndex];
				player.rocketComponents[playerIndex] =
					target.rocketComponents[targetIndex];
				target.rocketComponents[targetIndex] = temp;
			}
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
