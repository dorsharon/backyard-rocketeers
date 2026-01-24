import { ComponentCard } from '../ComponentCard';

/**
 * Improvised Mars Rover - Basic surface exploration vehicle.
 *
 * Effect: 3km/turn toward alien base
 * Malfunction rate: 50% (roll 1-3 each turn)
 *
 * See CARDS_CATALOG.md - "Improvised Mars Rover"
 */
export class ImprovisedMarsRoverCard extends ComponentCard {
	readonly id = 'E6GlxvSs6bgiinERVlUsK';
	readonly name = 'Improvised Mars Rover';
	readonly componentType = 'rover' as const;
	readonly effect = 'Provides 3km/turn. Roll 1d6 each turn: fails on 1-3';
	readonly description = 'It will get there, have faith!';
	readonly availableAtLevels = [3];
	readonly isCovert = false;
	readonly strength = 3; // 3km/turn
	readonly tier = 1 as const;
}
