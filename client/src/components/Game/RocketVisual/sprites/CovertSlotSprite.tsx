import { motion } from 'motion/react';
import type { CovertSlotSpriteProps } from '../RocketVisual.types';
import { SIZE_CONFIGS } from '../RocketVisual.types';

/**
 * Covert slot placeholder SVG sprite.
 * Shown when a covert component is hidden from view.
 */
export function CovertSlotSprite({ size, componentType }: CovertSlotSpriteProps) {
	const config = SIZE_CONFIGS[size];

	// Determine dimensions based on component type
	let width = config.width;
	let height = config.width;
	let viewBox = '0 0 100 100';

	switch (componentType) {
		case 'fuselage':
			height = config.width * 1.2;
			viewBox = '0 0 100 120';
			break;
		case 'nose_cone':
			height = config.width * 0.8;
			viewBox = '0 0 100 80';
			break;
		case 'stabilizer_fins':
			width = config.width * 1.6;
			height = config.width * 0.6;
			viewBox = '0 0 160 60';
			break;
		case 'thruster':
			height = config.width * 0.7;
			viewBox = '0 0 100 70';
			break;
		default:
			break;
	}

	const centerX = componentType === 'stabilizer_fins' ? 80 : 50;
	const centerY = componentType === 'nose_cone' ? 45 :
		componentType === 'fuselage' ? 60 :
			componentType === 'thruster' ? 35 :
				componentType === 'stabilizer_fins' ? 30 : 50;

	return (
		<motion.svg
			width={width}
			height={height}
			viewBox={viewBox}
			animate={{ opacity: [0.5, 0.7, 0.5] }}
			transition={{ duration: 2, repeat: Infinity }}
			style={{ overflow: 'visible' }}
		>
			<defs>
				{/* Mysterious gradient */}
				<radialGradient id="covertGradient" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#1e1b4b" />
					<stop offset="100%" stopColor="#0f0d24" />
				</radialGradient>

				{/* Scan line pattern */}
				<pattern id="scanLines" patternUnits="userSpaceOnUse" width="4" height="4">
					<line x1="0" y1="0" x2="4" y2="0" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" />
				</pattern>

				{/* Glow filter */}
				<filter id="covertGlow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feFlood floodColor="rgba(139, 92, 246, 0.3)" />
					<feComposite in2="blur" operator="in" />
					<feMerge>
						<feMergeNode />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{/* Background shape matching component type */}
			<g filter="url(#covertGlow)">
				{componentType === 'fuselage' && (
					<path
						d="M25 0 L75 0 L80 10 L80 110 L75 120 L25 120 L20 110 L20 10 Z"
						fill="url(#covertGradient)"
						stroke="#4c1d95"
						strokeWidth={config.strokeWidth}
						strokeDasharray="5,5"
					/>
				)}
				{componentType === 'nose_cone' && (
					<path
						d="M50 5 Q30 25, 25 55 L25 75 L75 75 L75 55 Q70 25, 50 5"
						fill="url(#covertGradient)"
						stroke="#4c1d95"
						strokeWidth={config.strokeWidth}
						strokeDasharray="5,5"
					/>
				)}
				{componentType === 'stabilizer_fins' && (
					<g>
						<rect
							x="55"
							y="15"
							width="50"
							height="30"
							rx="3"
							fill="url(#covertGradient)"
							stroke="#4c1d95"
							strokeWidth={config.strokeWidth}
							strokeDasharray="5,5"
						/>
						<path
							d="M55 20 L20 55 L30 55 L55 35 Z"
							fill="url(#covertGradient)"
							stroke="#4c1d95"
							strokeWidth={config.strokeWidth}
							strokeDasharray="5,5"
						/>
						<path
							d="M105 20 L140 55 L130 55 L105 35 Z"
							fill="url(#covertGradient)"
							stroke="#4c1d95"
							strokeWidth={config.strokeWidth}
							strokeDasharray="5,5"
						/>
					</g>
				)}
				{componentType === 'thruster' && (
					<path
						d="M30 5 L70 5 L80 40 L20 40 Z"
						fill="url(#covertGradient)"
						stroke="#4c1d95"
						strokeWidth={config.strokeWidth}
						strokeDasharray="5,5"
					/>
				)}
				{/* Default rectangle for other types */}
				{!['fuselage', 'nose_cone', 'stabilizer_fins', 'thruster'].includes(componentType || '') && (
					<rect
						x="10"
						y="10"
						width="80"
						height="80"
						rx="5"
						fill="url(#covertGradient)"
						stroke="#4c1d95"
						strokeWidth={config.strokeWidth}
						strokeDasharray="5,5"
					/>
				)}
			</g>

			{/* Scan line overlay */}
			<rect
				x="0"
				y="0"
				width="100%"
				height="100%"
				fill="url(#scanLines)"
				opacity="0.5"
			/>

			{/* Question mark */}
			<motion.g
				animate={{ scale: [0.9, 1.1, 0.9] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<text
					x={centerX}
					y={centerY}
					textAnchor="middle"
					dominantBaseline="middle"
					fill="#8b5cf6"
					fontSize={size === 'sm' ? '20' : size === 'md' ? '28' : '36'}
					fontWeight="bold"
					fontFamily="monospace"
				>
					?
				</text>
			</motion.g>

			{/* "COVERT" label for larger sizes */}
			{size !== 'sm' && (
				<text
					x={centerX}
					y={centerY + (size === 'lg' ? 30 : 20)}
					textAnchor="middle"
					fill="#6d28d9"
					fontSize={size === 'md' ? '8' : '10'}
					fontFamily="monospace"
					letterSpacing="2"
				>
					CLASSIFIED
				</text>
			)}

			{/* Animated corner brackets */}
			<g stroke="#7c3aed" strokeWidth="2" opacity="0.6">
				<motion.path
					d={`M${centerX - 20} ${centerY - 25} L${centerX - 25} ${centerY - 25} L${centerX - 25} ${centerY - 15}`}
					fill="none"
					animate={{ opacity: [0.3, 0.8, 0.3] }}
					transition={{ duration: 1.5, repeat: Infinity }}
				/>
				<motion.path
					d={`M${centerX + 20} ${centerY - 25} L${centerX + 25} ${centerY - 25} L${centerX + 25} ${centerY - 15}`}
					fill="none"
					animate={{ opacity: [0.3, 0.8, 0.3] }}
					transition={{ duration: 1.5, repeat: Infinity, delay: 0.375 }}
				/>
				<motion.path
					d={`M${centerX - 25} ${centerY + 15} L${centerX - 25} ${centerY + 25} L${centerX - 15} ${centerY + 25}`}
					fill="none"
					animate={{ opacity: [0.3, 0.8, 0.3] }}
					transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
				/>
				<motion.path
					d={`M${centerX + 25} ${centerY + 15} L${centerX + 25} ${centerY + 25} L${centerX + 15} ${centerY + 25}`}
					fill="none"
					animate={{ opacity: [0.3, 0.8, 0.3] }}
					transition={{ duration: 1.5, repeat: Infinity, delay: 1.125 }}
				/>
			</g>
		</motion.svg>
	);
}
