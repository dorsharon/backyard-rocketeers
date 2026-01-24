import { useEffect, useRef, useState } from 'react';
import type { AutoSizeTextProps } from './AutoSizeText.types';

export function AutoSizeText({
	children,
	maxLines,
	baseFontSize,
	minFontSize = 8,
	color = 'white',
	fontWeight = 400,
	fontStyle = 'normal',
	textAlign = 'center',
	lineHeight = 1.2,
	className,
}: AutoSizeTextProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [fontSize, setFontSize] = useState(baseFontSize);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Reset to base font size first
		let currentSize = baseFontSize;
		setFontSize(currentSize);

		// Use requestAnimationFrame to ensure DOM has updated
		requestAnimationFrame(() => {
			if (!containerRef.current) return;

			const maxHeight = maxLines * currentSize * lineHeight;

			// Reduce font size until text fits or we hit minimum
			while (containerRef.current.scrollHeight > maxHeight + 1 && currentSize > minFontSize) {
				currentSize -= 0.5;
				setFontSize(currentSize);
			}
		});
	}, [children, maxLines, baseFontSize, minFontSize, lineHeight]);

	return (
		<div
			ref={containerRef}
			className={className}
			style={{
				fontSize: `${fontSize}px`,
				fontWeight,
				fontStyle,
				color,
				textAlign,
				lineHeight,
				display: '-webkit-box',
				WebkitLineClamp: maxLines,
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				wordBreak: 'break-word',
				textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
			}}
		>
			{children}
		</div>
	);
}
