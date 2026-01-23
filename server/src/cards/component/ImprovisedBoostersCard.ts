import { ComponentCard } from '../ComponentCard';

/**
 * Improvised Boosters - Basic boosters for extra distance.
 *
 * Strength: 1
 * Tier: Improvised
 * Effect: +10km in Level 2
 *
 * See CARDS_CATALOG.md - "Improvised Boosters"
 */
export class ImprovisedBoostersCard extends ComponentCard {
	readonly id = 'Ey1gmj55WX96RDVRS42Hy';
	readonly name = 'Improvised Boosters';
	readonly componentType = 'boosters' as const;
	readonly description = "Who said you can't build rockets at home?";
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 1;
}
