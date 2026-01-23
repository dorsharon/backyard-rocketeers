import { CardSchema } from '../schemas/CardSchema';
import type { GameState } from '../schemas/GameState';
import type { Player } from '../schemas/Player';
import { Card } from './Card';

/**
 * Base class for all sabotage cards.
 * Sabotage cards are played to damage or hinder opponents.
 *
 * See GAME_RULES.md - "Sabotage Mechanics" section.
 */
export abstract class SabotageCard extends Card {
	readonly type = 'sabotage' as const;

	/**
	 * Check if sabotage can be played on target.
	 */
	canPlay(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
	): boolean {
		// Must have a valid target
		if (!targetPlayerId) {
			return false;
		}

		const target = gameState.players.get(targetPlayerId);
		if (!target) {
			return false;
		}

		// Can't target yourself (usually)
		if (target.sessionId === player.sessionId) {
			return false;
		}

		// Target must have a rocket (Launch Pad at minimum)
		if (!target.hasLaunchPad) {
			return false;
		}

		return true;
	}

	toSchema(): CardSchema {
		return new CardSchema(
			this.generateInstanceId(),
			this.name,
			this.type,
			this.description,
			this.isCovert,
			0,
		);
	}
}
