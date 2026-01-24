import { ComponentCard } from '../ComponentCard';

/**
 * Improvised Solar Panels - Basic solar power generation.
 *
 * Effect: 10% power per turn
 * Vulnerable to Dust Storm (blocks for 3 turns)
 *
 * See CARDS_CATALOG.md - "Improvised Solar Panels"
 */
export class ImprovisedSolarPanelsCard extends ComponentCard {
	readonly id = '3Jeb0Kk6tUuTI_5alrUgj';
	readonly name = 'Improvised Solar Panels';
	readonly componentType = 'generator' as const;
	readonly effect = '10% power collection capability every turn';
	readonly description = "For what it's worth, it's powering our toaster...";
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 10; // 10% power/turn
	readonly tier = 1 as const;
}
