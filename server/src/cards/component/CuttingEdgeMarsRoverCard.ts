import { ComponentCard } from '../ComponentCard';

/**
 * Cutting Edge Mars Rover - Advanced surface exploration vehicle.
 *
 * Effect: 7km/turn toward alien base
 * Malfunction rate: 17% (roll 1 each turn)
 *
 * See CARDS_CATALOG.md - "Cutting Edge Mars Rover"
 */
export class CuttingEdgeMarsRoverCard extends ComponentCard {
	readonly id = 'XyxUP5VTkpZa5YG2tQ4tk';
	readonly name = 'Cutting Edge Mars Rover';
	readonly componentType = 'rover' as const;
	readonly effect = 'Provides 7km/turn. Roll 1d6 each turn: fails on 1';
	readonly description = 'No fear, the Rover is here!';
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 7; // 7km/turn
	readonly tier = 3 as const;
}
