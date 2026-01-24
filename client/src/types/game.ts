/**
 * Shared game types for the client.
 * These mirror the server schema types for type-safe client-side usage.
 */

export type CardType = 'component' | 'sabotage' | 'ability' | 'enhancement';
export type GamePhase = 'draw' | 'action' | 'discard' | 'waiting';

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

export interface CardData {
	id: string;
	name: string;
	type: CardType;
	effect: string;
	description: string;
	isCovert: boolean;
	isRevealed: boolean;
	strength: number;
	tier: number;
	componentType?: ComponentType;
}

export interface PlayerData {
	sessionId: string;
	name: string;
	level: number;

	// Hand (private - only visible to owner)
	hand: CardData[];

	// Rocket components (visible to all, except covert)
	rocketComponents: CardData[];

	// Enhancements (visible to all)
	enhancements: CardData[];

	// Level 1: Fuel system
	groundFuel: number;
	hasLaunchPad: boolean;

	// Level 2: Space travel
	spaceFuel: number;
	distanceFromMars: number;
	cumulativeDamage: number;
	originalRocketStrength: number;

	// Level 3: Mars surface
	power: number;
	roverDistance: number;
	signalStrength: number;

	// Multi-turn effects tracking
	trappedTurnsRemaining: number;
	blockedTurnsRemaining: number;

	// Covert cards count (unrevealed only)
	covertCardsCount: number;

	// Game state
	isReady: boolean;
	hasLaunched: boolean;
	hasLanded: boolean;
	isEliminated: boolean;
}

export interface LaunchRollResult {
	componentName: string;
	tier: number;
	roll: number;
	success: boolean;
}

export interface LaunchSequenceData {
	isActive: boolean;
	playerId: string;
	rollResults: LaunchRollResult[];
	success: boolean;
	failureReason?: string;
}

export interface GameStateData {
	players: Record<string, PlayerData>;
	currentPlayerIndex: number;
	currentLevel: number;
	turnCount: number;
	gameStarted: boolean;
	gameEnded: boolean;
	winnerId: string;
	currentPhase: GamePhase;
	playerOrder: string[];
	launchSequence?: LaunchSequenceData;
}

// Message types for server communication
export interface WelcomeMessage {
	message: string;
	playerId: string;
}

export interface ErrorMessage {
	message: string;
}

export interface PlayerJoinedMessage {
	playerId: string;
	playerName: string;
	playerCount: number;
}

export interface PlayerLeftMessage {
	playerId: string;
	playerName: string;
	playerCount: number;
}

export interface CardsDrawnMessage {
	playerId: string;
	count: number;
	handSize: number;
}

export interface CardPlayedMessage {
	playerId: string;
	cardId: string;
	cardName: string;
	cardType: CardType;
	targetPlayerId: string | null;
	success: boolean;
}

export interface TurnEndedMessage {
	previousPlayerId: string;
	currentPlayerId: string;
	turnCount: number;
}

export interface PhaseChangeMessage {
	phase: GamePhase;
}

export interface DiceRollMessage {
	playerId: string;
	rolls: number[];
	total: number;
	reason: string;
}

export interface GameEndedMessage {
	winnerId: string | null;
	winnerName?: string;
	reason: string;
}

export interface GameStartedMessage {
	firstPlayerId: string;
	currentPhase: GamePhase;
}

export interface LaunchInitiatedMessage {
	playerId: string;
}

export interface LaunchRollsMessage {
	playerId: string;
	rolls: LaunchRollResult[];
	success: boolean;
}

export interface LaunchSuccessMessage {
	playerId: string;
	startingDistance: number;
	distanceRolls: number[];
}

export interface LaunchFailedMessage {
	playerId: string;
	failedComponents: string[];
}

export interface GameMessage {
	type: string;
	data: unknown;
	timestamp: number;
}
