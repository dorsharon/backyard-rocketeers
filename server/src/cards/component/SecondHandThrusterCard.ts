import { ComponentCard } from '../ComponentCard';

/**
 * Second-hand Thruster - Reliable propulsion engine.
 *
 * Strength: 2
 * Tier: Second-hand
 * Launch failure rate: 33% (fails on roll 1-2)
 *
 * See CARDS_CATALOG.md - "Second-hand Thruster"
 */
export class SecondHandThrusterCard extends ComponentCard {
	readonly id = 'Nm6Z3rhXnCiAZeG3miae2';
	readonly name = 'Second-hand Thruster';
	readonly componentType = 'thruster' as const;
	readonly description = "There's nothing that some duct tape can't fix.";
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 2;
}
