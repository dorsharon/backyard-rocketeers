import { ComponentCard } from '../ComponentCard';

/**
 * Cutting Edge Fuselage - Premium rocket body.
 *
 * Strength: 3
 * Tier: Cutting Edge
 * Launch failure rate: 0% (never fails)
 *
 * See CARDS_CATALOG.md - "Cutting Edge Fuselage"
 */
export class CuttingEdgeFuselageCard extends ComponentCard {
	readonly id = 'cSP1AOcBCjJZDJVUyvrFz';
	readonly name = 'Cutting Edge Fuselage';
	readonly componentType = 'fuselage' as const;
	readonly effect = 'Never fails';
	readonly description = 'This is the dawn of a new era, baby!';
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 3;
	readonly tier = 3 as const; // Cutting Edge
}
