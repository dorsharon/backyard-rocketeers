import { motion } from 'motion/react';
import type { SpriteProps } from '../RocketVisual.types';
import { SIZE_CONFIGS, TIER_STYLES } from '../RocketVisual.types';

/**
 * Thruster (engine) SVG sprite.
 * The rocket engine at the bottom.
 */
export function ThrusterSprite({ tier, size, isHovered = false, animate = false }: SpriteProps) {
	const config = SIZE_CONFIGS[size];
	const style = TIER_STYLES[tier];
	const width = config.width;
	const height = config.width * 0.7;
	const gradientId = `thrusterGrad-${tier}-${size}`;

	return (
		<motion.svg
			width={width}
			height={height}
			viewBox="0 0 100 70"
			animate={{ scale: isHovered ? 1.05 : 1 }}
			transition={{ duration: 0.2 }}
			style={{ overflow: 'visible' }}
		>
			<defs>
				{/* Engine bell gradient */}
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor={style.gradient[1]} />
					<stop offset="30%" stopColor={style.gradient[0]} />
					<stop offset="70%" stopColor={style.gradient[0]} />
					<stop offset="100%" stopColor={style.gradient[1]} />
				</linearGradient>

				{/* Inner engine gradient (darker) */}
				<radialGradient id={`thrusterInner-${tier}-${size}`} cx="50%" cy="0%" r="100%">
					<stop offset="0%" stopColor="#1f2937" />
					<stop offset="100%" stopColor="#030712" />
				</radialGradient>

				{/* Flame gradient */}
				<linearGradient id={`flameGrad-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="#fef3c7" />
					<stop offset="20%" stopColor="#fcd34d" />
					<stop offset="50%" stopColor="#f97316" />
					<stop offset="80%" stopColor="#dc2626" />
					<stop offset="100%" stopColor="transparent" />
				</linearGradient>

				{/* Glow for tier 3 */}
				{tier === 3 && (
					<filter id={`thrusterGlow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
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

			{/* Mounting collar at top */}
			<rect
				x="25"
				y="0"
				width="50"
				height="8"
				fill={`url(#${gradientId})`}
				stroke={style.primary}
				strokeWidth={config.strokeWidth}
			/>

			{/* Main engine bell */}
			<g filter={tier === 3 ? `url(#thrusterGlow-${size})` : undefined}>
				<path
					d="M30 8 L70 8 L80 45 L85 50 L15 50 L20 45 Z"
					fill={`url(#${gradientId})`}
					stroke={style.primary}
					strokeWidth={config.strokeWidth}
				/>

				{/* Engine bell inner surface */}
				<path
					d="M35 12 L65 12 L72 42 L28 42 Z"
					fill={`url(#thrusterInner-${tier}-${size})`}
				/>
			</g>

			{/* Nozzle rim */}
			<ellipse
				cx="50"
				cy="50"
				rx="35"
				ry="5"
				fill={style.gradient[1]}
				stroke={style.primary}
				strokeWidth={config.strokeWidth}
			/>

			{/* Inner nozzle */}
			<ellipse
				cx="50"
				cy="50"
				rx="25"
				ry="3"
				fill="#0f172a"
				stroke="#1e293b"
				strokeWidth="1"
			/>

			{/* Tier 1: Corrosion/damage */}
			{tier === 1 && (
				<g opacity="0.4">
					<ellipse cx="40" cy="30" rx="4" ry="2" fill="#78350f" />
					<ellipse cx="60" cy="35" rx="3" ry="2" fill="#44403c" />
					<path d="M45 20 L48 25 L43 25 Z" fill="#92400e" />
				</g>
			)}

			{/* Tier 2: Cooling vents */}
			{tier >= 2 && (
				<g stroke={style.secondary} strokeWidth="1" opacity="0.5">
					<line x1="35" y1="15" x2="32" y2="40" />
					<line x1="50" y1="12" x2="50" y2="42" />
					<line x1="65" y1="15" x2="68" y2="40" />
				</g>
			)}

			{/* Tier 3: Heat shield segments */}
			{tier === 3 && (
				<g opacity="0.6">
					<path d="M38 20 L42 20 L44 38 L36 38 Z" fill={style.secondary} />
					<path d="M48 18 L52 18 L52 40 L48 40 Z" fill={style.secondary} />
					<path d="M58 20 L62 20 L64 38 L56 38 Z" fill={style.secondary} />
				</g>
			)}

			{/* Gimbal mounts */}
			<g fill={style.primary}>
				<circle cx="30" cy="15" r="3" />
				<circle cx="70" cy="15" r="3" />
			</g>

			{/* Animated exhaust flame when launching */}
			{animate && (
				<g>
					<motion.path
						d="M35 52 Q40 70, 50 85 Q60 70, 65 52"
						fill={`url(#flameGrad-${size})`}
						animate={{
							d: [
								"M35 52 Q40 70, 50 85 Q60 70, 65 52",
								"M32 52 Q45 75, 50 90 Q55 75, 68 52",
								"M35 52 Q40 70, 50 85 Q60 70, 65 52",
							],
							opacity: [0.8, 1, 0.8],
						}}
						transition={{ duration: 0.3, repeat: Infinity }}
					/>
					{/* Inner hot core */}
					<motion.ellipse
						cx="50"
						cy="55"
						rx="10"
						ry="3"
						fill="#fef3c7"
						animate={{ ry: [3, 5, 3], opacity: [0.8, 1, 0.8] }}
						transition={{ duration: 0.2, repeat: Infinity }}
					/>
				</g>
			)}

			{/* Status indicators - tier 3 */}
			{tier === 3 && (
				<g>
					<motion.circle
						cx="25"
						cy="8"
						r="2"
						fill="#22c55e"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 1, repeat: Infinity }}
					/>
					<motion.circle
						cx="75"
						cy="8"
						r="2"
						fill="#22c55e"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
					/>
				</g>
			)}
		</motion.svg>
	);
}
