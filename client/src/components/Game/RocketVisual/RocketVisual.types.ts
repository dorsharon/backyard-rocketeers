import type { CardData, ComponentType } from '../../../types/game';

/**
 * Size variants for rocket visualization.
 * - sm: Mini rocket for PlayerRocketCard (other players)
 * - md: Medium for secondary displays
 * - lg: Large for main player rocket view
 */
export type RocketSize = 'sm' | 'md' | 'lg';

/**
 * Tier levels for component styling.
 */
export type ComponentTier = 1 | 2 | 3;

/**
 * Props for the main RocketVisual component.
 */
export interface RocketVisualProps {
	/** Rocket components to display */
	components: CardData[];
	/** Whether the player has a launch pad */
	hasLaunchPad: boolean;
	/** Ground fuel percentage (0-100) */
	groundFuel: number;
	/** Size variant */
	size: RocketSize;
	/** Whether this is the owner's view (shows full covert details) */
	isOwner: boolean;
	/** Callback when hovering over a component */
	onComponentHover?: (component: CardData | null) => void;
	/** Callback when clicking a component */
	onComponentClick?: (component: CardData) => void;
}

/**
 * Props for individual sprite components.
 */
export interface SpriteProps {
	/** Tier of the component (1=improvised, 2=second-hand, 3=cutting-edge) */
	tier: ComponentTier;
	/** Size variant */
	size: RocketSize;
	/** Whether the component is being hovered */
	isHovered?: boolean;
	/** Animation state */
	animate?: boolean;
}

/**
 * Props for the covert slot placeholder.
 */
export interface CovertSlotSpriteProps {
	size: RocketSize;
	/** Component type being hidden (for sizing) */
	componentType: ComponentType;
}

/**
 * Tier styling configuration.
 */
export interface TierStyle {
	/** Primary color */
	primary: string;
	/** Secondary/accent color */
	secondary: string;
	/** Gradient colors for fills */
	gradient: [string, string];
	/** Glow/shadow color */
	glow: string;
	/** Metal/surface appearance */
	metallic: boolean;
	/** Label text */
	label: string;
}

/**
 * Size configuration for sprites.
 */
export interface SizeConfig {
	/** Base width for sprites */
	width: number;
	/** Stroke width */
	strokeWidth: number;
	/** Scale factor */
	scale: number;
}

/**
 * Tier styles mapping.
 */
export const TIER_STYLES: Record<ComponentTier, TierStyle> = {
	1: {
		primary: '#6b7280', // Gray
		secondary: '#9ca3af',
		gradient: ['#4b5563', '#374151'],
		glow: 'rgba(107, 114, 128, 0.3)',
		metallic: false,
		label: 'Improvised',
	},
	2: {
		primary: '#94a3b8', // Silver
		secondary: '#cbd5e1',
		gradient: ['#64748b', '#475569'],
		glow: 'rgba(148, 163, 184, 0.4)',
		metallic: true,
		label: 'Second-hand',
	},
	3: {
		primary: '#8b5cf6', // Violet
		secondary: '#a78bfa',
		gradient: ['#7c3aed', '#6d28d9'],
		glow: 'rgba(139, 92, 246, 0.5)',
		metallic: true,
		label: 'Cutting Edge',
	},
};

/**
 * Size configurations.
 */
export const SIZE_CONFIGS: Record<RocketSize, SizeConfig> = {
	sm: { width: 60, strokeWidth: 1, scale: 0.5 },
	md: { width: 100, strokeWidth: 1.5, scale: 0.8 },
	lg: { width: 160, strokeWidth: 2, scale: 1 },
};
