import { ComponentCard } from '../ComponentCard';

/**
 * Cutting Edge Thruster - Premium propulsion engine.
 *
 * Strength: 3
 * Tier: Cutting Edge
 * Launch failure rate: 0% (never fails)
 *
 * See CARDS_CATALOG.md - "Cutting Edge Thruster"
 */
export class CuttingEdgeThrusterCard extends ComponentCard {
	readonly id = 'pTtpsRJ8NR29OY_GNhn0a';
	readonly name = 'Cutting Edge Thruster';
	readonly componentType = 'thruster' as const;
	readonly effect = 'Strength: 3. Never fails';
	readonly description = "To the moon! Oh, wait, we're going to Mars.";
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 3;
	readonly tier = 3 as const;
}
