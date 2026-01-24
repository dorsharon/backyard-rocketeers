import { Schema, type } from '@colyseus/schema';

/**
 * Component types for rocket parts.
 * Used for type-safe component lookups instead of string matching.
 */
export type ComponentType =
	| 'launch_pad'
	| 'fuselage'
	| 'nose_cone'
	| 'stabilizer_fins'
	| 'thruster'
	| 'boosters'
	| 'staging'
	| 'defense'
	| 'fuel_tank'
	| 'rover'
	| 'generator'
	| 'antenna'
	| '';

/**
 * CardSchema represents a card in a player's hand or on the board.
 * Synchronized across all clients via Colyseus.
 */
export class CardSchema extends Schema {
	@type('string') id: string = '';
	@type('string') name: string = '';
	@type('string') type: 'component' | 'sabotage' | 'ability' | 'enhancement' =
		'component';
	@type('string') effect: string = ''; // What the card does mechanically
	@type('string') description: string = ''; // Flavor text
	@type('boolean') isCovert: boolean = false;
	@type('boolean') isRevealed: boolean = false;

	// For components: strength value (0-3)
	@type('number') strength: number = 0;

	// For components: tier (0=N/A, 1=improvised, 2=second-hand, 3=cutting-edge)
	@type('number') tier: number = 0;

	// For components: specific component type for type-safe lookups
	@type('string') componentType: ComponentType = '';

	constructor(
		id: string,
		name: string,
		cardType: 'component' | 'sabotage' | 'ability' | 'enhancement',
		effect: string = '',
		description: string = '',
		isCovert: boolean = false,
		strength: number = 0,
		tier: number | null = null,
		componentType: ComponentType = '',
	) {
		super();
		this.id = id;
		this.name = name;
		this.type = cardType;
		this.effect = effect;
		this.description = description;
		this.isCovert = isCovert;
		this.isRevealed = !isCovert; // Non-covert cards are always revealed
		this.strength = strength;
		this.tier = tier ?? 0; // Convert null to 0 for Colyseus schema
		this.componentType = componentType;
	}
}
