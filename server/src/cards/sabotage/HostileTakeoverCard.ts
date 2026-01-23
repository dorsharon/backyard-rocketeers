import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { SabotageCard } from '../SabotageCard';

/**
 * Hostile Takeover - Steal one covert card from target player's rocket.
 * Target chooses which one if they have multiple.
 * Covert card goes to your hand (not directly onto your rocket).
 *
 * See CARDS_CATALOG.md - "Hostile Takeover"
 */
export class HostileTakeoverCard extends SabotageCard {
	readonly id = 'hostile_takeover';
	readonly name = 'Hostile Takeover';
	readonly description =
		"It's not personal, it's just business. Well... maybe a little personal.";
	readonly availableAtLevels = [1];
	readonly isCovert = false;

	canPlay(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
	): boolean {
		if (!super.canPlay(gameState, player, targetPlayerId)) return false;

		const target = gameState.players.get(targetPlayerId!);
		if (!target) return false;

		// Target must have at least one covert card on their rocket
		return target.covertCardsCount > 0;
	}

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		// Find first covert card on target's rocket
		const covertCardIndex = target.rocketComponents.findIndex(
			(c) => c.isCovert && !c.isRevealed,
		);
		if (covertCardIndex === -1) return;

		// Remove from target's rocket and add to player's hand
		const stolenCard = target.rocketComponents.splice(covertCardIndex, 1)[0];
		target.covertCardsCount--;
		player.hand.push(stolenCard);
	}
}
