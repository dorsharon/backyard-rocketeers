import { ArraySchema, Schema, type } from '@colyseus/schema';
import { CardSchema } from './CardSchema';

/**
 * Player schema - represents a single player in the game.
 * Synchronized across all clients via Colyseus.
 *
 * See GAME_RULES.md for complete player state requirements.
 */
export class Player extends Schema {
	@type('string') sessionId: string = '';
	@type('string') name: string = '';
	@type('number') level: number = 1; // 1, 2, or 3

	// Hand (private - only visible to owner)
	@type([CardSchema]) hand = new ArraySchema<CardSchema>();

	// Rocket components (visible to all, except covert)
	@type([CardSchema]) rocketComponents = new ArraySchema<CardSchema>();

	// Enhancements (visible to all)
	@type([CardSchema]) enhancements = new ArraySchema<CardSchema>();

	// Level 1: Fuel system
	@type('number') groundFuel: number = 0; // 0-100%
	@type('boolean') hasLaunchPad: boolean = false;

	// Level 2: Space travel
	@type('number') spaceFuel: number = 0; // 0-100%
	@type('number') distanceFromMars: number = 0; // kilometers
	@type('number') cumulativeDamage: number = 0; // tracking damage in Level 2
	@type('number') originalRocketStrength: number = 0; // for explosion check

	// Level 3: Mars surface
	@type('number') power: number = 0; // 0-100%
	@type('number') roverDistance: number = 0; // 0-20 km
	@type('number') signalStrength: number = 0; // 0-3

	// Multi-turn effects tracking
	@type('number') trappedTurnsRemaining: number = 0; // Van-Allen Belts
	@type('number') blockedTurnsRemaining: number = 0; // Inspection Delay

	// Covert cards count (unrevealed only)
	@type('number') covertCardsCount: number = 0;

	// Game state
	@type('boolean') isReady: boolean = false;
	@type('boolean') hasLaunched: boolean = false; // Reached Level 2
	@type('boolean') hasLanded: boolean = false; // Reached Level 3
	@type('boolean') isEliminated: boolean = false;

	constructor(sessionId: string, name: string) {
		super();
		this.sessionId = sessionId;
		this.name = name;
	}

	/**
	 * Calculate total rocket strength (sum of all component strengths).
	 */
	getRocketStrength(): number {
		let strength = 0;
		this.rocketComponents.forEach((component) => {
			strength += component.strength;
		});
		return strength;
	}

	/**
	 * Check if player has reached Level 3 win condition.
	 * Must have power >= 100, roverDistance >= 20, signalStrength >= 3.
	 */
	hasWinCondition(): boolean {
		return (
			this.level === 3 &&
			this.power >= 100 &&
			this.roverDistance >= 20 &&
			this.signalStrength >= 3
		);
	}

	/**
	 * Check if player can launch (Level 1).
	 */
	canLaunch(): boolean {
		if (this.level !== 1 || !this.hasLaunchPad || this.groundFuel < 100) {
			return false;
		}

		// Must have all 4 required components
		const hasFuselage = this.rocketComponents.some((c) =>
			c.name.includes('Fuselage'),
		);
		const hasNoseCone = this.rocketComponents.some((c) =>
			c.name.includes('Nose Cone'),
		);
		const hasFins = this.rocketComponents.some((c) =>
			c.name.includes('Stabilizer Fins'),
		);
		const hasThruster = this.rocketComponents.some((c) =>
			c.name.includes('Thruster'),
		);

		return hasFuselage && hasNoseCone && hasFins && hasThruster;
	}
}
