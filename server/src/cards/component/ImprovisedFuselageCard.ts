import { ComponentCard } from '../ComponentCard';

/**
 * Improvised Fuselage - Basic rocket body made from wine barrels.
 *
 * Strength: 1
 * Tier: Improvised
 * Launch failure rate: 33% (fails on roll 1-2)
 *
 * See CARDS_CATALOG.md - "Improvised Fuselage"
 */
export class ImprovisedFuselageCard extends ComponentCard {
	readonly id = 'Bu31GZSszf2eU9mlBuDi9';
	readonly name = 'Improvised Fuselage';
	readonly componentType = 'fuselage' as const;
	readonly effect = 'Strength: 1. Roll 1d6 when challenged: fails on 1-2';
	readonly description =
		"I mean, who ever said that a couple of wine barrels CAN'T be used as a fuselage?";
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 1;
	readonly tier = 1 as const;
}
