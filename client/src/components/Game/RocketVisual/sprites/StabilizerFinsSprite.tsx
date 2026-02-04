import { motion } from 'motion/react';
import type { SpriteProps } from '../RocketVisual.types';
import { SIZE_CONFIGS, TIER_STYLES } from '../RocketVisual.types';

/**
 * Stabilizer fins SVG sprite.
 * The side fins that provide aerodynamic stability.
 */
export function StabilizerFinsSprite({ tier, size, isHovered = false }: SpriteProps) {
	const config = SIZE_CONFIGS[size];
	const style = TIER_STYLES[tier];
	const width = config.width * 1.6; // Wider to accommodate fins
	const height = config.width * 0.6;
	const gradientId = `finsGrad-${tier}-${size}`;

	return (
		<motion.svg
			width={width}
			height={height}
			viewBox="0 0 160 60"
			animate={{ scale: isHovered ? 1.05 : 1 }}
			transition={{ duration: 0.2 }}
			style={{ overflow: 'visible' }}
		>
			<defs>
				{/* Fin gradient */}
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor={style.gradient[0]} />
					<stop offset="100%" stopColor={style.gradient[1]} />
				</linearGradient>

				{/* Highlight gradient */}
				<linearGradient id={`finHighlight-${tier}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor={style.metallic ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'} />
					<stop offset="100%" stopColor="transparent" />
				</linearGradient>

				{/* Glow for tier 3 */}
				{tier === 3 && (
					<filter id={`finsGlow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="2" result="blur" />
						<feFlood floodColor={style.glow} />
						<feComposite in2="blur" operator="in" />
						<feMerge>
							<feMergeNode />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				)}
			</defs>

			{/* Center body connection piece */}
			<rect
				x="55"
				y="15"
				width="50"
				height="30"
				rx="3"
				fill={`url(#${gradientId})`}
				stroke={style.primary}
				strokeWidth={config.strokeWidth}
			/>

			{/* Left fin */}
			<g filter={tier === 3 ? `url(#finsGlow-${size})` : undefined}>
				<path
					d={tier === 1
						? "M55 20 L20 55 L15 50 L10 55 L35 20 Z" // Tier 1: Jagged/rough shape
						: tier === 2
							? "M55 20 L15 55 L25 55 L55 35 Z" // Tier 2: Clean swept
							: "M55 20 L5 55 L20 55 Q35 45, 55 30 Z" // Tier 3: Curved aerodynamic
					}
					fill={`url(#${gradientId})`}
					stroke={style.primary}
					strokeWidth={config.strokeWidth}
				/>
				{/* Highlight */}
				<path
					d={tier <= 2
						? "M55 20 L25 45 L35 20 Z"
						: "M55 20 L20 45 Q35 35, 55 25 Z"
					}
					fill={`url(#finHighlight-${tier}-${size})`}
				/>
			</g>

			{/* Right fin (mirrored) */}
			<g filter={tier === 3 ? `url(#finsGlow-${size})` : undefined}>
				<path
					d={tier === 1
						? "M105 20 L140 55 L145 50 L150 55 L125 20 Z"
						: tier === 2
							? "M105 20 L145 55 L135 55 L105 35 Z"
							: "M105 20 L155 55 L140 55 Q125 45, 105 30 Z"
					}
					fill={`url(#${gradientId})`}
					stroke={style.primary}
					strokeWidth={config.strokeWidth}
				/>
				{/* Highlight */}
				<path
					d={tier <= 2
						? "M105 20 L135 45 L125 20 Z"
						: "M105 20 L140 45 Q125 35, 105 25 Z"
					}
					fill={`url(#finHighlight-${tier}-${size})`}
				/>
			</g>

			{/* Tier 1: Damage marks */}
			{tier === 1 && (
				<g opacity="0.5">
					<circle cx="30" cy="40" r="3" fill="#44403c" />
					<line x1="125" y1="35" x2="135" y2="45" stroke="#57534e" strokeWidth="2" />
				</g>
			)}

			{/* Tier 2+: Structural ribs */}
			{tier >= 2 && (
				<g stroke={style.secondary} strokeWidth="0.5" opacity="0.5">
					<line x1="45" y1="25" x2="25" y2="50" />
					<line x1="115" y1="25" x2="135" y2="50" />
				</g>
			)}

			{/* Tier 3: LED accents */}
			{tier === 3 && (
				<g>
					<motion.circle
						cx="35"
						cy="38"
						r="2"
						fill={style.secondary}
						animate={{ opacity: [0.4, 1, 0.4] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					/>
					<motion.circle
						cx="125"
						cy="38"
						r="2"
						fill={style.secondary}
						animate={{ opacity: [0.4, 1, 0.4] }}
						transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
					/>
				</g>
			)}

			{/* Mounting bolts */}
			<g fill={style.secondary} opacity="0.7">
				<circle cx="60" cy="25" r="2" />
				<circle cx="100" cy="25" r="2" />
				<circle cx="60" cy="35" r="2" />
				<circle cx="100" cy="35" r="2" />
			</g>
		</motion.svg>
	);
}
