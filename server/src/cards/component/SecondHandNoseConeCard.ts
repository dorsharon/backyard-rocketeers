import { ComponentCard } from '../ComponentCard';

/**
 * Second-Hand Nose Cone - Dented but functional.
 *
 * Strength: 2
 * Tier: Second-hand
 * Landing failure rate: 17% (fails on roll 1)
 *
 * See CARDS_CATALOG.md - "Second-Hand Nose Cone"
 */
export class SecondHandNoseConeCard extends ComponentCard {
	readonly id = 'SfiDm_EYgy9fgdqs7078o';
	readonly name = 'Second-Hand Nose Cone';
	readonly componentType = 'nose_cone' as const;
	readonly effect = 'Roll 1d6 at landing: fails on 1';
	readonly description =
		'So it has a few dents on it, so what? It is still pointing straight...';
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 2;
	readonly tier = 2 as const;
}
