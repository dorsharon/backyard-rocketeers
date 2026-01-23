import { ComponentCard } from '../ComponentCard';

/**
 * Second-Hand Mars Rover - Reliable surface exploration vehicle.
 *
 * Effect: 5km/turn toward alien base
 * Malfunction rate: 33% (roll 1-2 each turn)
 *
 * See CARDS_CATALOG.md - "Second-Hand Mars Rover"
 */
export class SecondHandMarsRoverCard extends ComponentCard {
	readonly id = 'PnTxE7npcftQhdz8lyEkC';
	readonly name = 'Second-Hand Mars Rover';
	readonly componentType = 'rover' as const;
	readonly description = 'Hey, it was already there once!';
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 5; // 5km/turn
}
