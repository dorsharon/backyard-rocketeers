export interface LaunchSequenceProps {
	isVisible: boolean;
	playerName: string;
	rollResults?: number[];
	launchSuccess?: boolean;
	failureReason?: string;
	onComplete?: () => void;
}

export interface DiceProps {
	value: number;
	delay: number;
	isSuccess: boolean;
}

export interface CountdownProps {
	onComplete: () => void;
}

export interface RocketLiftoffProps {
	success: boolean;
}

export type LaunchPhase = 'countdown' | 'rolling' | 'result';
