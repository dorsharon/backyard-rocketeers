import { ComponentCard } from '../ComponentCard';

/**
 * Deep Space Array - Ultra-powerful signal transmission array.
 * INSTANT WIN: Provides +3 Signal Strength (meets win condition alone!)
 *
 * Effect: +3 Signal Strength
 * Can be enhanced by Signal Amplifier (+1 = 4 total)
 * RARE: Only 2 copies in Level 3 deck
 *
 * See CARDS_CATALOG.md - "Deep Space Array"
 */
export class DeepSpaceArrayCard extends ComponentCard {
	readonly id = 'deep_space_array';
	readonly name = 'Deep Space Array';
	readonly componentType = 'antenna' as const;
	readonly effect = 'Provides +3 Signal Strength when placed (instantly completes signal requirement!)';
	readonly description =
		'Welcome to the 22nd century! This bad boy can contact aliens in another galaxy.';
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 3; // +3 signal (instant win!)
	readonly tier: null = null;
}
