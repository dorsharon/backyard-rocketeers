import { CardSchema } from '../schemas/CardSchema';
import type { GameState } from '../schemas/GameState';
import type { Player } from '../schemas/Player';
import { Card } from './Card';

/**
 * Base class for all component cards (rocket parts).
 * Components are placed on the Launch Pad to build the rocket.
 *
 * See GAME_RULES.md - "Rocket Components" section.
 */
export abstract class ComponentCard extends Card {
	readonly type = 'component' as const;
	abstract readonly strength: number; // 0-3
	abstract readonly componentType:
		| 'launch_pad'
		| 'fuselage'
		| 'nose_cone'
		| 'stabilizer_fins'
		| 'thruster'
		| 'boosters'
		| 'staging'
		| 'defense'
		| 'fuel_tank'
		| 'rover'
		| 'generator'
		| 'antenna';

	/**
	 * Check if component can be placed on player's rocket.
	 */
	canPlay(gameState: GameState, player: Player): boolean {
		// Launch Pad can always be placed if not already placed
		if (this.componentType === 'launch_pad') {
			return !player.hasLaunchPad;
		}

		// Must have Launch Pad before placing other components
		if (!player.hasLaunchPad) {
			return false;
		}

		// Check if rocket already has 6 components (max capacity)
		if (
			player.rocketComponents.length >= 6 &&
			this.componentType !== 'fuel_tank'
		) {
			return false;
		}

		// Check for duplicate component types (exception: can replace same component on same turn)
		const hasDuplicate = player.rocketComponents.some(
			(c) =>
				c.name.includes(this.getComponentTypeName()) &&
				this.componentType !== 'fuel_tank',
		);

		return !hasDuplicate;
	}

	/**
	 * Place component on player's rocket.
	 */
	apply(gameState: GameState, player: Player): void {
		if (this.componentType === 'launch_pad') {
			player.hasLaunchPad = true;
			return;
		}

		// Add fuel if it's a fuel tank
		if (this.componentType === 'fuel_tank') {
			player.groundFuel = Math.min(100, player.groundFuel + this.strength);
			return;
		}

		// Add component to rocket
		player.rocketComponents.push(this.toSchema());

		// Update covert cards count if applicable
		if (this.isCovert) {
			player.covertCardsCount++;
		}
	}

	/**
	 * Get human-readable component type name.
	 */
	protected getComponentTypeName(): string {
		switch (this.componentType) {
			case 'fuselage':
				return 'Fuselage';
			case 'nose_cone':
				return 'Nose Cone';
			case 'stabilizer_fins':
				return 'Stabilizer Fins';
			case 'thruster':
				return 'Thruster';
			case 'boosters':
				return 'Boosters';
			case 'staging':
				return 'Staging';
			case 'defense':
				return 'Defense';
			case 'fuel_tank':
				return 'Fuel Tank';
			case 'launch_pad':
				return 'Launch Pad';
			case 'rover':
				return 'Rover';
			case 'generator':
				return 'Generator';
			case 'antenna':
				return 'Antenna';
			default:
				return 'Component';
		}
	}

	toSchema(): CardSchema {
		return new CardSchema(
			this.generateInstanceId(),
			this.name,
			this.type,
			this.description,
			this.isCovert,
			this.strength,
		);
	}
}
