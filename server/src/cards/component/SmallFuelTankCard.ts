import { ComponentCard } from '../ComponentCard';

/**
 * Small Fuel Tank - Add 10% to fuel capacity.
 * Available in all levels.
 *
 * See CARDS_CATALOG.md - "Small Fuel Tank"
 */
export class SmallFuelTankCard extends ComponentCard {
	readonly id = '0sP7Q0M7xaEOQeCU8ivYs';
	readonly name = 'Small Fuel Tank';
	readonly componentType = 'fuel_tank' as const;
	readonly description = "It's either this, or we run on potatoes.";
	readonly availableAtLevels = [1, 2, 3];
	readonly isCovert = false;
	readonly strength = 10; // 10% fuel
}
