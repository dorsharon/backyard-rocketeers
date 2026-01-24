import { ComponentCard } from '../ComponentCard';

/**
 * Hypergolic Boosters - Advanced toxic fuel boosters.
 *
 * Strength: 3
 * Tier: Cutting Edge
 * Effect: +70km in Level 2
 *
 * See CARDS_CATALOG.md - "Hypergolic Boosters"
 */
export class HypergolicBoostersCard extends ComponentCard {
	readonly id = 'Da7GX02MLzo8RMjGXgYEV';
	readonly name = 'Hypergolic Boosters';
	readonly componentType = 'boosters' as const;
	readonly effect = 'Strength: 3. +70km in Level 2';
	readonly description = 'Look what a mixture of two toxic fuels can do';
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 3;
	readonly tier = 3 as const;
}
