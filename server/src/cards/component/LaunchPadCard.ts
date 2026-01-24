import { ComponentCard } from '../ComponentCard';

/**
 * Launch Pad - Required foundation for building rocket.
 * Must be placed before any other components.
 * Provides 6 slots for rocket components.
 *
 * See CARDS_CATALOG.md - "Launch Pad"
 */
export class LaunchPadCard extends ComponentCard {
	readonly id = 'cpwgGUMh2RBCBA9BSXCr7';
	readonly name = 'Launch Pad';
	readonly componentType = 'launch_pad' as const;
	readonly effect = 'Baseplate with 6 component slots to build your rocket upon';
	readonly description = "It's elemantry, Watson, my friend";
	readonly availableAtLevels = [1];
	readonly isCovert = false;
	readonly strength = 0;
	readonly tier: null = null;
}
