import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { SabotageCard } from '../SabotageCard';

/**
 * Rover Sabotage - Forces immediate malfunction check on target's rover.
 * Roll 1d6: 1-3 = rover breaks down and stops providing distance.
 *
 * See CARDS_CATALOG.md - "Rover Sabotage"
 */
export class RoverSabotageCard extends SabotageCard {
	readonly id = 'rover_sabotage';
	readonly name = 'Rover Sabotage';
	readonly description =
		"Someone forgot to tighten the bolts! Probably Carl. It's always Carl.";
	readonly availableAtLevels = [3];
	readonly isCovert = false;

	canPlay(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
	): boolean {
		if (!super.canPlay(gameState, player, targetPlayerId)) return false;

		const target = gameState.players.get(targetPlayerId!);
		if (!target) return false;

		// Target must have an active (not broken) rover
		return target.rocketComponents.some((c) => c.name.includes('Rover'));
	}

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		// Force malfunction check: roll 1d6, 1-3 = breakdown
		const roll = Math.floor(Math.random() * 6) + 1;

		if (roll <= 3) {
			// Rover breaks down
			// TODO: Mark rover as broken in game state
			// Would need to track component status
		}
	}
}
