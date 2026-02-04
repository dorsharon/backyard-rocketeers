import { motion } from 'motion/react';
import type { RocketSize, SizeConfig } from '../RocketVisual.types';
import { SIZE_CONFIGS } from '../RocketVisual.types';

interface LaunchPadSpriteProps {
	size: RocketSize;
	isHovered?: boolean;
}

/**
 * Launch pad SVG sprite.
 * The base platform where the rocket sits.
 */
export function LaunchPadSprite({ size, isHovered = false }: LaunchPadSpriteProps) {
	const config: SizeConfig = SIZE_CONFIGS[size];
	const width = config.width * 1.4;
	const height = config.width * 0.3;

	return (
		<motion.svg
			width={width}
			height={height}
			viewBox="0 0 140 30"
			animate={{ scale: isHovered ? 1.02 : 1 }}
			transition={{ duration: 0.2 }}
			style={{ overflow: 'visible' }}
		>
			<defs>
				{/* Platform gradient */}
				<linearGradient id="launchPadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#525252" />
					<stop offset="50%" stopColor="#404040" />
					<stop offset="100%" stopColor="#262626" />
				</linearGradient>

				{/* Metal texture pattern */}
				<pattern id="metalPattern" patternUnits="userSpaceOnUse" width="10" height="10">
					<rect width="10" height="10" fill="url(#launchPadGradient)" />
					<line x1="0" y1="5" x2="10" y2="5" stroke="#3f3f46" strokeWidth="0.5" />
				</pattern>

				{/* Glow filter */}
				<filter id="launchPadGlow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="2" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{/* Shadow */}
			<ellipse
				cx="70"
				cy="28"
				rx="65"
				ry="4"
				fill="rgba(0,0,0,0.3)"
			/>

			{/* Main platform base */}
			<path
				d="M10 20 L20 8 L120 8 L130 20 L125 25 L15 25 Z"
				fill="url(#metalPattern)"
				stroke="#525252"
				strokeWidth={config.strokeWidth}
			/>

			{/* Platform top surface */}
			<path
				d="M20 8 L30 4 L110 4 L120 8 L20 8 Z"
				fill="#52525b"
				stroke="#71717a"
				strokeWidth={config.strokeWidth * 0.5}
			/>

			{/* Support legs */}
			<g fill="#404040" stroke="#525252" strokeWidth={config.strokeWidth * 0.5}>
				<path d="M25 25 L20 30 L30 30 L28 25" />
				<path d="M115 25 L112 30 L122 30 L120 25" />
				<path d="M67 25 L64 30 L76 30 L73 25" />
			</g>

			{/* Warning stripes on edges */}
			<g fill="#fbbf24" opacity="0.8">
				<rect x="15" y="20" width="5" height="5" />
				<rect x="25" y="20" width="5" height="5" />
				<rect x="110" y="20" width="5" height="5" />
				<rect x="120" y="20" width="5" height="5" />
			</g>

			{/* Center marking */}
			<circle cx="70" cy="12" r="4" fill="none" stroke="#71717a" strokeWidth="1" strokeDasharray="2,2" />

			{/* Status lights */}
			<motion.circle
				cx="35"
				cy="12"
				r="2"
				fill="#22c55e"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 1.5, repeat: Infinity }}
			/>
			<motion.circle
				cx="105"
				cy="12"
				r="2"
				fill="#22c55e"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
			/>
		</motion.svg>
	);
}
