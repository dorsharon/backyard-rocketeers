import type { GameState } from '../../schemas/GameState';
import type { Player } from '../../schemas/Player';
import { AbilityCard } from '../AbilityCard';

/**
 * Reverse Engineering - Downgrade all of another player's components.
 * Devastating sabotage ability that weakens opponent's rocket.
 *
 * See CARDS_CATALOG.md - "Reverse Engineering"
 */
export class ReverseEngineeringCard extends AbilityCard {
	readonly id = 'reverse_engineering';
	readonly name = 'Reverse Engineering';
	readonly description = "Downgrade all of another player's components";
	readonly availableAtLevels = [1, 3];
	readonly isCovert = false;

	apply(gameState: GameState, player: Player, targetPlayerId?: string): void {
		if (!targetPlayerId) return;

		const target = gameState.players.get(targetPlayerId);
		if (!target) return;

		// Downgrade all components one tier:
		// Cutting Edge -> Second-hand
		// Second-hand -> Improvised
		// Improvised -> destroyed/removed

		target.rocketComponents.forEach((component) => {
			const componentName = component.name;

			// Check for Cutting Edge (contains "Cutting Edge")
			if (componentName.includes('Cutting Edge')) {
				// Replace with Second-hand version
				const newName = componentName.replace('Cutting Edge', 'Second-Hand');
				component.name = newName;
				component.strength = Math.max(1, component.strength - 1);
			}
			// Check for Second-hand (contains "Second-Hand" or "Second-hand")
			else if (
				componentName.includes('Second-Hand') ||
				componentName.includes('Second-hand')
			) {
				// Replace with Improvised version
				const newName = componentName
					.replace('Second-Hand', 'Improvised')
					.replace('Second-hand', 'Improvised');
				component.name = newName;
				component.strength = Math.max(1, component.strength - 1);
			}
			// Improvised components are destroyed (can't downgrade further)
			// They will be removed after this loop
		});

		// Remove destroyed (Improvised) components
		target.rocketComponents = target.rocketComponents.filter(
			(component) => !component.name.includes('Improvised'),
		);

		// Check if rocket is destroyed (no components left)
		if (target.rocketComponents.length === 0) {
			target.hasLaunchPad = false;
		}

		// Remove this card from player's hand after use
		const cardIndex = player.hand.findIndex((c) => c.id === this.id);
		if (cardIndex > -1) {
			player.hand.splice(cardIndex, 1);
		}
	}
}
