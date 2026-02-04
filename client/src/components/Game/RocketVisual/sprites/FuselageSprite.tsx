import { motion } from 'motion/react';
import type { SpriteProps } from '../RocketVisual.types';
import { SIZE_CONFIGS, TIER_STYLES } from '../RocketVisual.types';

/**
 * Fuselage (main body) SVG sprite.
 * The central cylindrical part of the rocket.
 */
export function FuselageSprite({ tier, size, isHovered = false }: SpriteProps) {
	const config = SIZE_CONFIGS[size];
	const style = TIER_STYLES[tier];
	const width = config.width;
	const height = config.width * 1.2;
	const gradientId = `fuselageGrad-${tier}-${size}`;
	const highlightId = `fuselageHighlight-${tier}-${size}`;

	return (
		<motion.svg
			width={width}
			height={height}
			viewBox="0 0 100 120"
			animate={{ scale: isHovered ? 1.05 : 1 }}
			transition={{ duration: 0.2 }}
			style={{ overflow: 'visible' }}
		>
			<defs>
				{/* Main body gradient */}
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor={style.gradient[1]} />
					<stop offset="30%" stopColor={style.gradient[0]} />
					<stop offset="70%" stopColor={style.gradient[0]} />
					<stop offset="100%" stopColor={style.gradient[1]} />
				</linearGradient>

				{/* Highlight gradient for metallic effect */}
				<linearGradient id={highlightId} x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="transparent" />
					<stop offset="40%" stopColor={style.metallic ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'} />
					<stop offset="60%" stopColor={style.metallic ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'} />
					<stop offset="100%" stopColor="transparent" />
				</linearGradient>

				{/* Glow filter for tier 3 */}
				{tier === 3 && (
					<filter id={`fuselageGlow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
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

			{/* Main fuselage body */}
			<g filter={tier === 3 ? `url(#fuselageGlow-${size})` : undefined}>
				<path
					d="M25 0 L75 0 L80 10 L80 110 L75 120 L25 120 L20 110 L20 10 Z"
					fill={`url(#${gradientId})`}
					stroke={style.primary}
					strokeWidth={config.strokeWidth}
				/>

				{/* Highlight overlay */}
				<path
					d="M25 0 L75 0 L80 10 L80 110 L75 120 L25 120 L20 110 L20 10 Z"
					fill={`url(#${highlightId})`}
				/>
			</g>

			{/* Panel lines - horizontal */}
			<g stroke={style.secondary} strokeWidth={config.strokeWidth * 0.5} opacity="0.5">
				<line x1="20" y1="30" x2="80" y2="30" />
				<line x1="20" y1="60" x2="80" y2="60" />
				<line x1="20" y1="90" x2="80" y2="90" />
			</g>

			{/* Rivets/detail dots - tier dependent */}
			{tier >= 2 && (
				<g fill={style.secondary} opacity="0.6">
					{[20, 50, 80].map((y) => (
						<g key={y}>
							<circle cx="28" cy={y} r="1.5" />
							<circle cx="72" cy={y} r="1.5" />
						</g>
					))}
				</g>
			)}

			{/* Window/porthole - tier 2+ */}
			{tier >= 2 && (
				<g>
					<ellipse
						cx="50"
						cy="45"
						rx="8"
						ry="10"
						fill="#1e293b"
						stroke={style.secondary}
						strokeWidth={config.strokeWidth}
					/>
					{/* Window glare */}
					<ellipse
						cx="48"
						cy="43"
						rx="3"
						ry="4"
						fill="rgba(255,255,255,0.2)"
					/>
				</g>
			)}

			{/* Tier 1: Rust/patch marks */}
			{tier === 1 && (
				<g opacity="0.3">
					<ellipse cx="35" cy="40" rx="6" ry="4" fill="#92400e" />
					<ellipse cx="65" cy="75" rx="5" ry="3" fill="#78350f" />
					<rect x="40" y="95" width="12" height="8" rx="1" fill="#a3a3a3" stroke="#737373" strokeWidth="0.5" />
				</g>
			)}

			{/* Tier 3: LED strips */}
			{tier === 3 && (
				<g>
					<motion.rect
						x="22"
						y="15"
						width="2"
						height="90"
						fill={style.secondary}
						animate={{ opacity: [0.3, 1, 0.3] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
					<motion.rect
						x="76"
						y="15"
						width="2"
						height="90"
						fill={style.secondary}
						animate={{ opacity: [0.3, 1, 0.3] }}
						transition={{ duration: 2, repeat: Infinity, delay: 1 }}
					/>
				</g>
			)}

			{/* USA/branding stripe - tier 2+ */}
			{tier >= 2 && (
				<g>
					<rect x="38" y="70" width="24" height="4" fill="#ef4444" rx="1" />
					<rect x="38" y="76" width="24" height="4" fill="#f8fafc" rx="1" />
					<rect x="38" y="82" width="24" height="4" fill="#3b82f6" rx="1" />
				</g>
			)}
		</motion.svg>
	);
}
