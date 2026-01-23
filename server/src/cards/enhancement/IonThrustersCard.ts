import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { EnhancementCard } from '../EnhancementCard';

/**
 * Ion Thrusters - +3km every turn, even without fuel.
 * Passive movement enhancement for Level 2.
 *
 * See CARDS_CATALOG.md - "Ion Thrusters"
 */
export class IonThrustersCard extends EnhancementCard {
	readonly id = 'ion_thrusters';
	readonly name = 'Ion Thrusters';
	readonly description = 'Gain 3km every turn, even without fuel.';
	readonly availableAtLevels = [2];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		// Ongoing passive effect: +3km per turn
		// Works even with 0% fuel, providing guaranteed movement
		// Cannot be stopped by fuel sabotage
		// Check with: player.hasCard('ion_thrusters')
		player.enhancements.push(this.toSchema());
	}
}
