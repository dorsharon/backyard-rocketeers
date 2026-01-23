import { ComponentCard } from '../ComponentCard';

/**
 * Anti-Missiles System - Covert defense against missile attacks.
 *
 * Strength: 2
 * Tier: Second-hand
 * Effect: Reduces Missile Attack damage (attacker rolls 1d6 instead of 3d6)
 * Covert: Yes
 *
 * See CARDS_CATALOG.md - "Anti-Missiles System"
 */
export class AntiMissilesSystemCard extends ComponentCard {
	readonly id = 'hfYtOcqjwhXwyn_YRPssZ';
	readonly name = 'Anti-Missiles System';
	readonly componentType = 'defense' as const;
	readonly description = 'Do a barrel roll!';
	readonly availableAtLevels = [1];
	readonly isCovert = true;
	readonly strength = 2;
}
