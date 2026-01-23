import { ComponentCard } from '../ComponentCard';

/**
 * Second-hand Fuselage - Sturdy rocket body from eBay.
 *
 * Strength: 2
 * Tier: Second-hand
 * Launch failure rate: 17% (fails on roll 1)
 *
 * See CARDS_CATALOG.md - "Second-hand Fuselage"
 */
export class SecondHandFuselageCard extends ComponentCard {
	readonly id = 'uzQdaUKLJrVTHkkH1uWHe';
	readonly name = 'Second-hand Fuselage';
	readonly componentType = 'fuselage' as const;
	readonly description = 'Hey guys, look what I found on eBay last night!';
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 2;
}
