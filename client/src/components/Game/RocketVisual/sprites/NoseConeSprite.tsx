import { motion } from 'motion/react';
import type { SpriteProps } from '../RocketVisual.types';
import { SIZE_CONFIGS, TIER_STYLES } from '../RocketVisual.types';

/**
 * Nose cone (top) SVG sprite.
 * The pointed aerodynamic tip of the rocket.
 */
export function NoseConeSprite({ tier, size, isHovered = false }: SpriteProps) {
	const config = SIZE_CONFIGS[size];
	const style = TIER_STYLES[tier];
	const width = config.width;
	const height = config.width * 0.8;
	const gradientId = `noseGrad-${tier}-${size}`;
	const highlightId = `noseHighlight-${tier}-${size}`;

	return (
		<motion.svg
			width={width}
			height={height}
			viewBox="0 0 100 80"
			animate={{ scale: isHovered ? 1.05 : 1 }}
			transition={{ duration: 0.2 }}
			style={{ overflow: 'visible' }}
		>
			<defs>
				{/* Main gradient */}
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor={style.gradient[1]} />
					<stop offset="30%" stopColor={style.gradient[0]} />
					<stop offset="70%" stopColor={style.gradient[0]} />
					<stop offset="100%" stopColor={style.gradient[1]} />
				</linearGradient>

				{/* Highlight for 3D effect */}
				<linearGradient id={highlightId} x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="transparent" />
					<stop offset="35%" stopColor={style.metallic ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'} />
					<stop offset="50%" stopColor={style.metallic ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'} />
					<stop offset="100%" stopColor="transparent" />
				</linearGradient>

				{/* Glow for tier 3 */}
				{tier === 3 && (
					<filter id={`noseGlow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="3" result="blur" />
						<feFlood floodColor={style.glow} />
						<feComposite in2="blur" operator="in" />
						<feMerge>
							<feMergeNode />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				)}
			</defs>

			{/* Main nose cone shape */}
			<g filter={tier === 3 ? `url(#noseGlow-${size})` : undefined}>
				{/* Nose cone body - curved ogive shape */}
				<path
					d="M50 0
					   Q30 20, 25 50
					   L25 75 L30 80 L70 80 L75 75
					   L75 50
					   Q70 20, 50 0"
					fill={`url(#${gradientId})`}
					stroke={style.primary}
					strokeWidth={config.strokeWidth}
				/>

				{/* Highlight overlay */}
				<path
					d="M50 0
					   Q30 20, 25 50
					   L25 75 L30 80 L70 80 L75 75
					   L75 50
					   Q70 20, 50 0"
					fill={`url(#${highlightId})`}
				/>
			</g>

			{/* Tip cap - different by tier */}
			{tier === 1 && (
				<circle cx="50" cy="5" r="4" fill="#78716c" stroke="#57534e" strokeWidth="1" />
			)}
			{tier === 2 && (
				<ellipse cx="50" cy="4" rx="3" ry="4" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
			)}
			{tier === 3 && (
				<motion.ellipse
					cx="50"
					cy="4"
					rx="3"
					ry="4"
					fill={style.secondary}
					animate={{ opacity: [0.7, 1, 0.7] }}
					transition={{ duration: 1.5, repeat: Infinity }}
				/>
			)}

			{/* Panel seam lines */}
			<g stroke={style.secondary} strokeWidth={config.strokeWidth * 0.4} opacity="0.4">
				<line x1="50" y1="8" x2="50" y2="75" />
				<path d="M33 40 Q50 35, 67 40" fill="none" />
			</g>

			{/* Tier 1: Dents and patches */}
			{tier === 1 && (
				<g opacity="0.4">
					<ellipse cx="40" cy="35" rx="5" ry="3" fill="#44403c" />
					<path d="M55 50 L60 45 L65 52 L58 55 Z" fill="#a8a29e" stroke="#78716c" strokeWidth="0.5" />
				</g>
			)}

			{/* Tier 2+: Aerodynamic ridges */}
			{tier >= 2 && (
				<g stroke={style.secondary} strokeWidth="0.5" opacity="0.6">
					<path d="M35 60 Q50 55, 65 60" fill="none" />
					<path d="M32 70 Q50 66, 68 70" fill="none" />
				</g>
			)}

			{/* Tier 3: Sensor array */}
			{tier === 3 && (
				<g>
					{/* Sensor dome */}
					<ellipse cx="50" cy="30" rx="6" ry="4" fill="#1e1b4b" stroke={style.secondary} strokeWidth="1" />
					<motion.ellipse
						cx="50"
						cy="30"
						rx="3"
						ry="2"
						fill={style.secondary}
						animate={{ opacity: [0.3, 0.8, 0.3] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				</g>
			)}

			{/* Connection flange at bottom */}
			<rect
				x="25"
				y="75"
				width="50"
				height="5"
				fill={style.gradient[1]}
				stroke={style.primary}
				strokeWidth={config.strokeWidth * 0.5}
			/>
		</motion.svg>
	);
}
