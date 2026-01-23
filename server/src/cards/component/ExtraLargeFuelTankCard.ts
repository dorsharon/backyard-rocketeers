import { ComponentCard } from '../ComponentCard';

/**
 * Extra Large Fuel Tank - Add 50% to fuel capacity.
 * Available in Level 1 and Level 2 only.
 *
 * See CARDS_CATALOG.md - "Extra Large Fuel Tank"
 */
export class ExtraLargeFuelTankCard extends ComponentCard {
	readonly id = 'DzGGI1aYgBLJPlQXsfkbf';
	readonly name = 'Extra Large Fuel Tank';
	readonly componentType = 'fuel_tank' as const;
	readonly description = 'Did someone say oil crisis?';
	readonly availableAtLevels = [1, 2];
	readonly isCovert = false;
	readonly strength = 50; // 50% fuel
}
