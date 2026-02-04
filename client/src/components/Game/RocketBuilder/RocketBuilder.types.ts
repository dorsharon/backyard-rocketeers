import type { CardData } from '../../../types/game';

export interface RocketBuilderProps {
	hasLaunchPad: boolean;
	components: CardData[];
	groundFuel: number;
	canLaunch: boolean;
	isMyTurn: boolean;
	currentPhase: string;
	onLaunch: () => void;
	pendingAction?: string | null;
}

export interface ComponentSlotProps {
	component?: CardData;
	index: number;
}

export interface TierInfo {
	label: string;
	color: string;
}

export interface LaunchRequirement {
	name: string;
	met: boolean;
	icon: React.ReactNode;
}
