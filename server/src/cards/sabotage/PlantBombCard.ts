import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { SabotageCard } from '../SabotageCard';

/**
 * Plant Bomb - Covert sabotage that destroys a chosen component when activated.
 *
 * Covert: Yes
 * Effect: Place covertly on opponent's rocket, detonate later to destroy chosen component
 * Can be detected by X-Ray Machine or Security Audit
 *
 * See CARDS_CATALOG.md - "Plant Bomb"
 */
export class PlantBombCard extends SabotageCard {
	readonly id = 'JxcNwV0pjzJDz82LnxHek';
	readonly name = 'Plant Bomb';
	readonly effect =
		"Choose another player's component and destroy it at any following turn you wish";
	readonly description = "Just don't blow up anything during lunch.";
	readonly availableAtLevels = [1];
	readonly isCovert = true;

	canPlay(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
	): boolean {
		if (!targetPlayerId) return false;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return false;

		// Can't plant on self
		if (target.sessionId === player.sessionId) return false;

		// Target must have rocket components
		if (target.rocketComponents.length === 0) return false;

		// Check covert card limit on target
		return target.covertCardsCount < 2;
	}

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		// Add bomb to target's rocket as covert component
		const bombSchema = this.toSchema();
		bombSchema.isRevealed = false; // Keep hidden
		target.rocketComponents.push(bombSchema);
		target.covertCardsCount++;
	}
}
