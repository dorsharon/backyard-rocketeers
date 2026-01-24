import type { ReactNode } from 'react';

export type CardType = 'component' | 'sabotage' | 'ability' | 'enhancement';

export interface GameCardProps {
	id: string;
	name: string;
	type: CardType;
	effect?: string;
	description: string;
	strength?: number;
	tier?: number;
	isCovert?: boolean;
	isRevealed?: boolean;
	isSelected?: boolean;
	isPlayable?: boolean;
	isHandHovered?: boolean;
	onClick?: () => void;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CardTypeConfig {
	gradient: string;
	borderColor: string;
	icon: ReactNode;
	label: string;
	accentColor: string;
	glowColor: string;
}

export interface TierConfig {
	label: string;
	color: string;
	icon: ReactNode;
}

export interface SizeConfig {
	width: number;
	height: number;
	titleSize: 'xs' | 'sm' | 'md';
	descSize: 'xs' | 'sm';
}

export interface CardHandProps {
	cards: Array<{
		id: string;
		name: string;
		type: CardType;
		effect?: string;
		description: string;
		strength?: number;
		tier?: number;
		isCovert?: boolean;
		isRevealed?: boolean;
	}>;
	selectedCardId?: string | null;
	onCardClick?: (cardId: string) => void;
	isPlayable?: boolean;
}
