import { ComponentCard } from '../ComponentCard';

/**
 * Improvised Thruster - Basic propulsion engine.
 *
 * Strength: 1
 * Tier: Improvised
 * Launch failure rate: 70% (fails on roll 1-4)
 *
 * See CARDS_CATALOG.md - "Improvised Thruster"
 */
export class ImprovisedThrusterCard extends ComponentCard {
	readonly id = 'kbX4JOINgdXsuFgkzTjCL';
	readonly name = 'Improvised Thruster';
	readonly componentType = 'thruster' as const;
	readonly effect = 'Roll 1d6 at launch: engine failure on 1-4';
	readonly description = "Let's hope you don't crash and burn.";
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 1;
	readonly tier = 1 as const;
}
