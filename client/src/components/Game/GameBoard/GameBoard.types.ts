export interface GameBoardProps {
	gameState: any;
	playerId: string | null;
	onSendMessage: (type: string, data?: any) => void;
	error?: string | null;
	onClearError?: () => void;
	pendingAction?: string | null;
}

export interface PlayerData {
	sessionId: string;
	name: string;
	level: number;
	isReady: boolean;
	hand?: any[];
	groundFuel?: number;
	hasLaunchPad?: boolean;
	rocketComponents?: any[];
}

export interface LaunchSequenceState {
	isVisible: boolean;
	playerName: string;
	rollResults: number[];
	launchSuccess: boolean;
	failureReason?: string;
}
