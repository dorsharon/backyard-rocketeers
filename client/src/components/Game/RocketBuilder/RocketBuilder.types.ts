export interface RocketComponent {
	id: string;
	name: string;
	type: string;
	strength: number;
	tier: number;
	isCovert: boolean;
	isRevealed: boolean;
}

export interface RocketBuilderProps {
	hasLaunchPad: boolean;
	components: RocketComponent[];
	groundFuel: number;
	canLaunch: boolean;
	isMyTurn: boolean;
	currentPhase: string;
	onLaunch: () => void;
	pendingAction?: string | null;
}

export interface ComponentSlotProps {
	component?: RocketComponent;
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
