import type { CardData, GameStateData } from '../../../types/game';

export type { CardData, GameStateData };

export interface GameBoardProps {
	gameState: GameStateData | null;
	playerId: string | null;
	onSendMessage: (type: string, data?: Record<string, unknown>) => void;
	error?: string | null;
	onClearError?: () => void;
	pendingAction?: string | null;
}

export interface PlayerData {
	sessionId: string;
	name: string;
	level: number;
	isReady: boolean;
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
