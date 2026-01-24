import { Badge, Box, Group, Text } from '@mantine/core';
import { IconBolt, IconBomb, IconRocket, IconSparkles, IconWand } from '@tabler/icons-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { type CSSProperties, useRef, useState } from 'react';
import { AutoSizeText } from './AutoSizeText';
import { cardTypeConfig, sizeConfig, tierConfig } from './cardConfigs';
import { DiceText } from './DiceText';
import type { GameCardProps } from './GameCard.types';

export function GameCard({
	name,
	type,
	effect,
	description,
	strength,
	tier = 0,
	isCovert = false,
	isRevealed = true,
	isSelected = false,
	isPlayable = true,
	isHandHovered = false,
	onClick,
	size = 'md',
}: GameCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	// Motion values for 3D tilt effect
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	// Spring physics for smooth animation
	const springConfig = { stiffness: 300, damping: 30 };
	const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
	const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

	// Shine effect position
	const shineX = useTransform(x, [-0.5, 0.5], [0, 100]);
	const shineY = useTransform(y, [-0.5, 0.5], [0, 100]);

	const config = cardTypeConfig[type];
	const tierInfo = tier > 0 ? tierConfig[tier] : null;
	const sizeInfo = sizeConfig[size];

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;

		const rect = cardRef.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		// Calculate position relative to center (-0.5 to 0.5)
		const relativeX = (e.clientX - centerX) / rect.width;
		const relativeY = (e.clientY - centerY) / rect.height;

		x.set(relativeX);
		y.set(relativeY);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
		setIsHovered(false);
	};

	// Covert card back design
	if (isCovert && !isRevealed) {
		return (
			<motion.div
				ref={cardRef}
				style={{
					width: sizeInfo.width,
					height: sizeInfo.height,
					perspective: 1000,
					cursor: onClick ? 'pointer' : 'default',
				}}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.98 }}
				onClick={onClick}
			>
				<Box
					style={{
						width: '100%',
						height: '100%',
						borderRadius: 12,
						background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)',
						border: '2px solid rgba(255, 255, 255, 0.2)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					{/* Pattern overlay */}
					<Box
						style={{
							position: 'absolute',
							inset: 0,
							backgroundImage: `repeating-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.03) 0px,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 1px,
                transparent 10px
              )`,
						}}
					/>
					{/* Question mark */}
					<Text size="3rem" fw={900} c="rgba(255, 255, 255, 0.2)">
						?
					</Text>
					<Badge
						size="xs"
						variant="filled"
						color="dark"
						style={{ position: 'absolute', bottom: 10 }}
					>
						Covert
					</Badge>
				</Box>
			</motion.div>
		);
	}

	return (
		<motion.div
			ref={cardRef}
			style={{
				width: sizeInfo.width,
				height: sizeInfo.height,
				perspective: 1000,
				cursor: onClick ? 'pointer' : 'default',
				opacity: isPlayable || isHandHovered ? 1 : 0.6,
				transition: 'opacity 0.2s ease',
			}}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
			whileTap={onClick ? { scale: 0.98 } : undefined}
			onClick={onClick}
		>
			<motion.div
				style={{
					width: '100%',
					height: '100%',
					rotateX,
					rotateY,
					transformStyle: 'preserve-3d',
				}}
			>
				<Box
					style={
						{
							width: '100%',
							height: '100%',
							borderRadius: 12,
							background: config.gradient,
							border: `2px solid ${isSelected ? '#fff' : config.borderColor}`,
							boxShadow: isSelected
								? `0 0 20px ${config.glowColor}, 0 0 40px ${config.glowColor}, inset 0 0 20px rgba(255, 255, 255, 0.1)`
								: isHovered
									? `0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px ${config.glowColor}`
									: '0 4px 20px rgba(0, 0, 0, 0.4)',
							display: 'flex',
							flexDirection: 'column',
							position: 'relative',
							overflow: 'hidden',
							transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
							'--accent-color': config.accentColor,
						} as CSSProperties
					}
				>
					{/* Holographic shine effect */}
					<motion.div
						style={{
							position: 'absolute',
							inset: 0,
							background: `radial-gradient(
                circle at ${shineX}% ${shineY}%,
                rgba(255, 255, 255, 0.25) 0%,
                rgba(255, 255, 255, 0.1) 20%,
                transparent 50%
              )`,
							pointerEvents: 'none',
							opacity: isHovered ? 1 : 0,
							transition: 'opacity 0.3s ease',
						}}
					/>

					{/* Rainbow holographic overlay */}
					<Box
						style={{
							position: 'absolute',
							inset: 0,
							background: `linear-gradient(
                125deg,
                rgba(255, 0, 0, 0.05) 0%,
                rgba(255, 154, 0, 0.05) 10%,
                rgba(208, 222, 33, 0.05) 20%,
                rgba(79, 220, 74, 0.05) 30%,
                rgba(63, 218, 216, 0.05) 40%,
                rgba(47, 201, 226, 0.05) 50%,
                rgba(28, 127, 238, 0.05) 60%,
                rgba(95, 21, 242, 0.05) 70%,
                rgba(186, 12, 248, 0.05) 80%,
                rgba(251, 7, 217, 0.05) 90%,
                rgba(255, 0, 0, 0.05) 100%
              )`,
							opacity: isHovered ? 1 : 0,
							transition: 'opacity 0.3s ease',
							pointerEvents: 'none',
						}}
					/>

					{/* Card Header */}
					<Box
						p="xs"
						style={{
							background: 'rgba(0, 0, 0, 0.3)',
							borderBottom: `1px solid ${config.borderColor}40`,
						}}
					>
						<Group justify="space-between" wrap="nowrap" gap={4}>
							<Badge
								size="xs"
								variant="light"
								color="gray"
								leftSection={config.icon}
								style={{
									background: 'rgba(0, 0, 0, 0.4)',
									border: `1px solid ${config.accentColor}40`,
									color: config.accentColor,
								}}
							>
								{config.label}
							</Badge>
							{strength !== undefined && strength > 0 && (
								<Badge
									size="xs"
									variant="filled"
									style={{
										background: `linear-gradient(135deg, ${config.accentColor}, ${config.accentColor}80)`,
									}}
									leftSection={<IconBolt size={10} />}
								>
									{strength}
								</Badge>
							)}
						</Group>
					</Box>

					{/* Card Image Area */}
					<Box
						style={{
							flex: '0 0 auto',
							height:
								size === 'xl' ? 170 : size === 'lg' ? 140 : size === 'md' ? 100 : 60,
							margin: '8px',
							borderRadius: 8,
							background: 'rgba(0, 0, 0, 0.4)',
							border: `1px solid ${config.borderColor}30`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Placeholder icon based on type */}
						<Box style={{ opacity: 0.3 }}>
							{type === 'component' && (
								<IconRocket size={size === 'xl' ? 56 : size === 'lg' ? 48 : 36} />
							)}
							{type === 'sabotage' && (
								<IconBomb size={size === 'xl' ? 56 : size === 'lg' ? 48 : 36} />
							)}
							{type === 'ability' && (
								<IconWand size={size === 'xl' ? 56 : size === 'lg' ? 48 : 36} />
							)}
							{type === 'enhancement' && (
								<IconSparkles size={size === 'xl' ? 56 : size === 'lg' ? 48 : 36} />
							)}
						</Box>

						{/* Tier badge for components */}
						{tierInfo && (
							<Badge
								size="xs"
								variant="filled"
								style={{
									position: 'absolute',
									bottom: 4,
									right: 4,
									background: `linear-gradient(135deg, ${tierInfo.color}, ${tierInfo.color}80)`,
								}}
								leftSection={tierInfo.icon}
							>
								{tierInfo.label}
							</Badge>
						)}
					</Box>

					{/* Card Title */}
					<Box px="xs" pb={4}>
						<AutoSizeText
							maxLines={2}
							baseFontSize={
								size === 'xl' ? 20 : size === 'lg' ? 16 : size === 'md' ? 14 : 12
							}
							minFontSize={10}
							fontWeight={700}
							color="white"
						>
							{name}
						</AutoSizeText>
					</Box>

					{/* Card Effect & Description */}
					<Box
						px="xs"
						pb="xs"
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							gap: 4,
							overflow: 'hidden',
						}}
					>
						{/* Effect Text */}
						{effect && (
							<Box
								style={{
									background: `linear-gradient(135deg, ${config.accentColor}15, ${config.accentColor}05)`,
									borderRadius: 6,
									padding: size === 'sm' ? 4 : 8,
									border: `1px solid ${config.accentColor}30`,
								}}
							>
								<AutoSizeText
									maxLines={3}
									baseFontSize={
										size === 'xl' ? 16 : size === 'lg' ? 13 : size === 'md' ? 12 : 10
									}
									minFontSize={8}
									fontWeight={500}
									color={config.accentColor}
								>
									<DiceText
										text={effect}
										size={size === 'xl' ? 16 : size === 'sm' ? 10 : size === 'md' ? 12 : 13}
										color={config.accentColor}
									/>
								</AutoSizeText>
							</Box>
						)}
						{/* Flavor Text (Description) */}
						<Box
							style={{
								flex: 1,
								background: 'rgba(0, 0, 0, 0.3)',
								borderRadius: 6,
								padding: size === 'sm' ? 4 : 8,
								border: `1px solid ${config.borderColor}20`,
							}}
						>
							<AutoSizeText
								maxLines={3}
								baseFontSize={
									size === 'xl' ? 14 : size === 'lg' ? 12 : size === 'md' ? 11 : 10
								}
								minFontSize={8}
								fontWeight={400}
								fontStyle="italic"
								color="rgba(255, 255, 255, 0.6)"
							>
								{description}
							</AutoSizeText>
						</Box>
					</Box>

					{/* Covert indicator */}
					{isCovert && isRevealed && (
						<Badge
							size="xs"
							variant="outline"
							color="gray"
							style={{
								position: 'absolute',
								top: 4,
								right: 4,
							}}
						>
							Covert
						</Badge>
					)}

					{/* Bottom decorative line */}
					<Box
						style={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							right: 0,
							height: 3,
							background: `linear-gradient(90deg, transparent, ${config.accentColor}, transparent)`,
						}}
					/>
				</Box>
			</motion.div>
		</motion.div>
	);
}
