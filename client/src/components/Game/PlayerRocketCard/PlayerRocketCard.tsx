import { Avatar, Badge, Box, Card, Group, Progress, Stack, Text } from '@mantine/core';
import { IconRobot, IconRocket, IconUser } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { RocketVisual } from '../RocketVisual/RocketVisual';
import type { PlayerRocketCardProps } from './PlayerRocketCard.types';

/**
 * Get level badge color and label.
 */
function getLevelInfo(level: number): { color: string; label: string } {
	switch (level) {
		case 1:
			return { color: 'blue', label: 'Earth' };
		case 2:
			return { color: 'violet', label: 'Space' };
		case 3:
			return { color: 'orange', label: 'Mars' };
		default:
			return { color: 'gray', label: 'Unknown' };
	}
}

/**
 * PlayerRocketCard - Displays a player's info with their rocket visualization.
 * Used in the multi-player view to show all players' rockets.
 */
export function PlayerRocketCard({
	name,
	level,
	isBot,
	hasLaunchPad,
	groundFuel,
	rocketComponents,
	isYou,
	isCurrentTurn,
	isOwner = false,
}: PlayerRocketCardProps) {
	const levelInfo = getLevelInfo(level);
	const componentCount = rocketComponents.length;
	const hasComponents = componentCount > 0 || hasLaunchPad;

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Card
				padding="sm"
				radius="md"
				style={{
					background: isCurrentTurn
						? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))'
						: 'rgba(0, 0, 0, 0.3)',
					backdropFilter: 'blur(10px)',
					border: isCurrentTurn
						? '2px solid rgba(139, 92, 246, 0.5)'
						: isYou
							? '2px solid rgba(59, 130, 246, 0.4)'
							: '1px solid rgba(255, 255, 255, 0.1)',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Turn indicator glow */}
				{isCurrentTurn && (
					<motion.div
						style={{
							position: 'absolute',
							inset: 0,
							background:
								'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
							pointerEvents: 'none',
						}}
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				)}

				<Stack gap="xs" style={{ position: 'relative', zIndex: 1 }}>
					{/* Header: Avatar + Name + Badges */}
					<Group gap="xs" wrap="nowrap">
						<Avatar
							size="sm"
							radius="xl"
							color={isBot ? 'gray' : isYou ? 'blue' : 'violet'}
							style={{
								border: isCurrentTurn ? '2px solid #8b5cf6' : undefined,
							}}
						>
							{isBot ? <IconRobot size={14} /> : <IconUser size={14} />}
						</Avatar>

						<Box style={{ flex: 1, minWidth: 0 }}>
							<Group gap={4} wrap="nowrap">
								<Text
									size="sm"
									fw={600}
									c="white"
									truncate
									style={{ maxWidth: 80 }}
								>
									{name}
								</Text>
								{isYou && (
									<Badge size="xs" variant="light" color="blue">
										You
									</Badge>
								)}
							</Group>
							<Group gap={4}>
								<Badge size="xs" variant="dot" color={levelInfo.color}>
									{levelInfo.label}
								</Badge>
								{isBot && (
									<Badge size="xs" variant="light" color="gray">
										Bot
									</Badge>
								)}
							</Group>
						</Box>

						{/* Turn indicator */}
						{isCurrentTurn && (
							<motion.div
								animate={{ scale: [1, 1.2, 1] }}
								transition={{ duration: 1, repeat: Infinity }}
							>
								<Badge size="sm" variant="filled" color="violet">
									Turn
								</Badge>
							</motion.div>
						)}
					</Group>

					{/* Mini Rocket Visualization */}
					<Box
						style={{
							display: 'flex',
							justifyContent: 'center',
							minHeight: hasComponents ? 'auto' : 60,
						}}
					>
						{hasComponents ? (
							<RocketVisual
								components={rocketComponents}
								hasLaunchPad={hasLaunchPad}
								groundFuel={groundFuel}
								size="sm"
								isOwner={isOwner}
							/>
						) : (
							<Stack align="center" gap={4} py="xs">
								<IconRocket size={20} style={{ opacity: 0.3, color: 'white' }} />
								<Text size="xs" c="dimmed">
									No rocket
								</Text>
							</Stack>
						)}
					</Box>

					{/* Stats Row */}
					<Group gap="xs" justify="space-between">
						{/* Component count */}
						<Group gap={4}>
							<Text size="xs" c="dimmed">
								Parts:
							</Text>
							<Text size="xs" c="white" fw={500}>
								{componentCount}/4
							</Text>
						</Group>

						{/* Fuel indicator (compact) */}
						{hasLaunchPad && (
							<Group gap={4}>
								<Text size="xs" c="dimmed">
									Fuel:
								</Text>
								<Box w={40}>
									<Progress
										value={groundFuel}
										size={4}
										radius="xl"
										color={
											groundFuel >= 100
												? 'green'
												: groundFuel >= 50
													? 'yellow'
													: 'red'
										}
									/>
								</Box>
								<Text size="xs" c="white" fw={500}>
									{groundFuel}%
								</Text>
							</Group>
						)}
					</Group>
				</Stack>
			</Card>
		</motion.div>
	);
}
