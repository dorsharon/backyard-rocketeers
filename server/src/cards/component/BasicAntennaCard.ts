import { ComponentCard } from '../ComponentCard';

/**
 * Basic Antenna - Basic signal transmission device.
 *
 * Effect: +1 Signal Strength
 * Can be enhanced by Signal Amplifier (+1 = 2 total)
 *
 * See CARDS_CATALOG.md - "Basic Antenna"
 */
export class BasicAntennaCard extends ComponentCard {
	readonly id = 'basic_antenna';
	readonly name = 'Basic Antenna';
	readonly componentType = 'antenna' as const;
	readonly effect = 'Provides +1 Signal Strength when placed';
	readonly description =
		"It's literally a coat hanger wrapped in tinfoil. But hey, it works!";
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 1; // +1 signal
	readonly tier: null = null;
}
