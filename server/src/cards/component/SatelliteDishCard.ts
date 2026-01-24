import { ComponentCard } from '../ComponentCard';

/**
 * Satellite Dish - Advanced signal transmission device.
 *
 * Effect: +2 Signal Strength
 * Can be enhanced by Signal Amplifier (+1 = 3 total = instant win!)
 *
 * See CARDS_CATALOG.md - "Satellite Dish"
 */
export class SatelliteDishCard extends ComponentCard {
	readonly id = 'satellite_dish';
	readonly name = 'Satellite Dish';
	readonly componentType = 'antenna' as const;
	readonly effect = 'Provides +2 Signal Strength when placed';
	readonly description =
		"Now we're talking! Finally, something that looks like it belongs on a space mission.";
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 2; // +2 signal
	readonly tier: null = null;
}
