import type { CardData, GameStateData } from '../../../types/game';

export type { CardData, GameStateData };

export interface GameBoardProps {
	gameState: GameStateData | null;
	playerId: string | null;
	onSendMessage: (type: string, data?: Record<string, unknown>) => void;
	error?: string | null;
	onClearError?: () => void;
	pendingAction?: string | null;
	/**
	 * Real covert card data for the current player.
	 * Server sends this privately; should be merged with rocketComponents
	 * to show the owner their real covert card details.
	 */
	myCovertCards?: CardData[];
}

export interface PlayerData {
	sessionId: string;
	name: string;
	level: number;
	isReady: boolean;
	isBot: boolean;
	hand: CardData[];
	groundFuel: number;
	hasLaunchPad: boolean;
	rocketComponents: CardData[];
}

export interface LaunchSequenceState {
	isVisible: boolean;
	playerName: string;
	rollResults: number[];
	launchSuccess: boolean;
	failureReason?: string;
}
