import { ComponentCard } from '../ComponentCard';

/**
 * Solid Rocket Boosters - Shuttle-era boosters.
 *
 * Strength: 2
 * Tier: Second-hand
 * Effect: +30km in Level 2
 *
 * See CARDS_CATALOG.md - "Solid Rocket Boosters"
 */
export class SolidRocketBoostersCard extends ComponentCard {
	readonly id = 'mmWd2byuit5tfPoEVK4mn';
	readonly name = 'Solid Rocket Boosters';
	readonly componentType = 'boosters' as const;
	readonly effect = '+30km in Level 2';
	readonly description =
		'They worked during the Shuttle era, so what could go wrong?';
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 2;
	readonly tier = 2 as const;
}
