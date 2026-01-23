import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Heat Shield - Covert card with dual purpose.
 * Automatically deflects Cosmic Rays sabotage OR increases landing chances by 20%.
 * Available in Level 2 & 3.
 *
 * See CARDS_CATALOG.md - "Heat Shield"
 */
export class HeatShieldCard extends AbilityCard {
	readonly id = 'heat_shield';
	readonly name = 'Heat Shield';
	readonly description =
		'Deflect a cosmic ray attack or use it to increase landing chances by 20%';
	readonly availableAtLevels = [2, 3];
	readonly isCovert = true;

	apply(
		gameState: GameState,
		player: Player,
		targetPlayerId?: string,
		additionalData?: any,
	): void {
		if (!additionalData) return;

		const { usage } = additionalData;

		// Dual purpose:
		// 1. Automatically deflects Cosmic Rays sabotage when played against you
		// 2. Can be activated to increase landing chances by +20%

		if (usage === 'deflect_cosmic_rays') {
			// Automatically deflect Cosmic Rays attack
			// The attack has no effect on this player's fuselage
			// This would be checked during Cosmic Rays sabotage application
		} else if (usage === 'landing_boost') {
			// Use as +20% landing success chance
			// Implementation would apply this bonus during landing checks
			// Only works during Level 2->3 landing attempt
			if (player.level === 2) {
				// This card provides +20% landing bonus
				// Would be used during landing procedure
			}
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
