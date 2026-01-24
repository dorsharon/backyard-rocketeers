import {
	IconBomb,
	IconRocket,
	IconShield,
	IconSparkles,
	IconStar,
	IconTarget,
	IconWand,
} from '@tabler/icons-react';
import type { CardType, CardTypeConfig, SizeConfig, TierConfig } from './GameCard.types';

export const cardTypeConfig: Record<CardType, CardTypeConfig> = {
	component: {
		gradient: 'linear-gradient(135deg, #1a472a 0%, #2d5a3d 50%, #1a472a 100%)',
		borderColor: '#4ade80',
		icon: <IconRocket size={16} />,
		label: 'Component',
		accentColor: '#4ade80',
		glowColor: 'rgba(74, 222, 128, 0.4)',
	},
	sabotage: {
		gradient: 'linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 50%, #4a1a1a 100%)',
		borderColor: '#f87171',
		icon: <IconBomb size={16} />,
		label: 'Sabotage',
		accentColor: '#f87171',
		glowColor: 'rgba(248, 113, 113, 0.4)',
	},
	ability: {
		gradient: 'linear-gradient(135deg, #1a1a4a 0%, #2d2d6b 50%, #1a1a4a 100%)',
		borderColor: '#60a5fa',
		icon: <IconWand size={16} />,
		label: 'Ability',
		accentColor: '#60a5fa',
		glowColor: 'rgba(96, 165, 250, 0.4)',
	},
	enhancement: {
		gradient: 'linear-gradient(135deg, #4a1a4a 0%, #6b2d6b 50%, #4a1a4a 100%)',
		borderColor: '#c084fc',
		icon: <IconSparkles size={16} />,
		label: 'Enhancement',
		accentColor: '#c084fc',
		glowColor: 'rgba(192, 132, 252, 0.4)',
	},
};

export const tierConfig: Record<number, TierConfig> = {
	1: { label: 'Improvised', color: '#a3a3a3', icon: <IconTarget size={12} /> },
	2: { label: 'Second-Hand', color: '#fbbf24', icon: <IconShield size={12} /> },
	3: { label: 'Cutting Edge', color: '#22d3ee', icon: <IconStar size={12} /> },
};

export const sizeConfig: Record<'sm' | 'md' | 'lg' | 'xl', SizeConfig> = {
	sm: { width: 140, height: 210, titleSize: 'xs', descSize: 'xs' },
	md: { width: 200, height: 300, titleSize: 'sm', descSize: 'xs' },
	lg: { width: 240, height: 360, titleSize: 'md', descSize: 'sm' },
	xl: { width: 300, height: 450, titleSize: 'md', descSize: 'sm' },
};
