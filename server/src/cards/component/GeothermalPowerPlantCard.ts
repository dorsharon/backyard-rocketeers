import { ComponentCard } from '../ComponentCard';

/**
 * Geothermal Power Plant - Ultra-powerful ground heat generator.
 *
 * Effect: 50% power per turn
 * Not affected by Dust Storm
 * Can be stolen by Power Flow Re-routing sabotage
 *
 * See CARDS_CATALOG.md - "Geothermal Power Plant"
 */
export class GeothermalPowerPlantCard extends ComponentCard {
	readonly id = 'GeeU-JoI87NiVxWTpe_-X';
	readonly name = 'Geothermal Power Plant';
	readonly componentType = 'generator' as const;
	readonly description = 'It is definitly hot down there...';
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 50; // 50% power/turn
}
