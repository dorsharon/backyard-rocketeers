import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * Anti-Matter Propulsion - +20% space fuel per turn for 5 turns.
 * Time-limited fuel enhancement for Level 2.
 *
 * See CARDS_CATALOG.md - "Anti-Matter Propulsion"
 */
export class AntiMatterPropulsionCard extends EnhancementCard {
	readonly id = 'anti_matter_propulsion';
	readonly name = 'Anti-Matter Propulsion';
	readonly description =
		'Gain 20% space fuel per turn for 5 turns (total 100%).';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Time-limited effect: +20% fuel per turn for 5 turns
		// Total: 100% fuel gained over 5 turns
		// Essentially provides unlimited fuel for the Level 2 space journey
		player.hasAntiMatterPropulsion = true;
		player.antiMatterPropulsionTurnsRemaining = 5;
	}
}
