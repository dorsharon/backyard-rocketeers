import { ComponentCard } from '../ComponentCard';

/**
 * Windmill Generator - Wind-powered electricity generation.
 *
 * Effect: 10% power per turn
 * Not affected by Dust Storm
 *
 * See CARDS_CATALOG.md - "Windmill Generator"
 */
export class WindmillGeneratorCard extends ComponentCard {
	readonly id = 'YF2httefcNRT1x7G8n8lS';
	readonly name = 'Windmill Generator';
	readonly componentType = 'generator' as const;
	readonly description = 'The weatherman is always wrong, I tell ya!';
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 10; // 10% power/turn
}
