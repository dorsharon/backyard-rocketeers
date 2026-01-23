import { ComponentCard } from '../ComponentCard';

/**
 * Second-Hand Solar Panels - Reliable solar power generation.
 *
 * Effect: 20% power per turn
 * Vulnerable to Dust Storm (blocks for 3 turns)
 *
 * See CARDS_CATALOG.md - "Second-Hand Solar Panels"
 */
export class SecondHandSolarPanelsCard extends ComponentCard {
	readonly id = 'L_zrgsXaELepqVFskF9R7';
	readonly name = 'Second-Hand Solar Panels';
	readonly componentType = 'generator' as const;
	readonly description =
		'I took them off my roof just for that, they better work!';
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 20; // 20% power/turn
}
