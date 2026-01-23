import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Security Audit - Reveal if a target component is covert.
 * Defensive reconnaissance card to find hidden defenses or staging.
 *
 * See CARDS_CATALOG.md - "Security Audit"
 */
export class SecurityAuditCard extends AbilityCard {
	readonly id = 'security_audit';
	readonly name = 'Security Audit';
	readonly description =
		"Choose one of target player's components on their rocket and reveal if it's covert";
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
		if (!target || target.rocketComponents.length === 0) return;

		const { componentId } = additionalData;

		// Find the target component
		const component = target.rocketComponents.find((c) => c.id === componentId);
		if (!component) return;

		// Reveal whether it's covert or not
		// In implementation, this would be sent back to the audit player
		// Does NOT reveal what the covert card is, just that it IS covert
		component.isRevealed = true;

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
