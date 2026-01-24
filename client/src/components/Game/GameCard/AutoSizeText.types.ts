import type { CSSProperties, ReactNode } from 'react';

export interface AutoSizeTextProps {
	children: ReactNode;
	maxLines: number;
	baseFontSize: number;
	minFontSize?: number;
	color?: string;
	fontWeight?: CSSProperties['fontWeight'];
	fontStyle?: CSSProperties['fontStyle'];
	textAlign?: CSSProperties['textAlign'];
	lineHeight?: number;
	className?: string;
}
