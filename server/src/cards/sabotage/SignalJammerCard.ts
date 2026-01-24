import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { SabotageCard } from '../SabotageCard';

/**
 * Signal Jammer - Reduce target player's signal strength by 1 (minimum 0).
 * Does not destroy signal components, just reduces current signal value.
 *
 * See CARDS_CATALOG.md - "Signal Jammer"
 */
export class SignalJammerCard extends SabotageCard {
	readonly id = 'signal_jammer';
	readonly name = 'Signal Jammer';
	readonly effect = "Reduce target player's signal strength by 1 (minimum 0)";
	readonly description = 'Can you hear me now? ...Good!';
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

		// Target must have signal strength > 0
		// TODO: Implement signal tracking
		// return target.signalStrength > 0;
		return true;
	}

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		// Reduce signal strength by 1 (minimum 0)
		// TODO: Implement signal tracking
		// target.signalStrength = Math.max(0, target.signalStrength - 1);
	}
}
