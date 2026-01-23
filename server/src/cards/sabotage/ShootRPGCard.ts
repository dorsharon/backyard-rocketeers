import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { SabotageCard } from '../SabotageCard';

/**
 * Shoot An RPG - Destroy 1 component (2 on roll 5-6).
 * Roll: 1d6. 5-6 = destroy 2 components, otherwise destroy 1.
 *
 * See CARDS_CATALOG.md - "Shoot An RPG"
 */
export class ShootRPGCard extends SabotageCard {
	readonly id = 'Uff4shh3MegAoFCpxEP9P';
	readonly name = 'Shoot An RPG';
	readonly description = 'Hasta la vista, baby!';
	readonly availableAtLevels = [1];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target || target.rocketComponents.length === 0) return;

		// Roll for bonus destruction (would use actual dice utility)
		const roll = Math.floor(Math.random() * 6) + 1;
		const destroyCount = roll >= 5 ? 2 : 1;

		// Destroy components (from the end, arbitrary choice)
		for (
			let i = 0;
			i < destroyCount && target.rocketComponents.length > 0;
			i++
		) {
			const destroyed = target.rocketComponents.pop();
			if (destroyed && destroyed.isCovert && !destroyed.isRevealed) {
				target.covertCardsCount--;
			}
		}

		// Check if rocket is destroyed (no components left)
		if (target.rocketComponents.length === 0) {
			target.hasLaunchPad = false;
		}
	}
}
