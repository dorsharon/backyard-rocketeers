import { Avatar, Badge, Box, Card, Group, Text, Tooltip } from '@mantine/core';
import {
	IconCards,
	IconCheck,
	IconClock,
	IconPlayerPlay,
	IconUser,
} from '@tabler/icons-react';
import { motion } from 'motion/react';
import type { PlayerData } from './GameBoard.types';

interface PlayerCardProps {
	player: PlayerData;
	isYou: boolean;
	isCurrentTurn: boolean;
}

export function PlayerCard({ player, isYou, isCurrentTurn }: PlayerCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Card
				padding="md"
				radius="lg"
				style={{
					background: isYou
						? 'linear-gradient(135deg, rgba(121, 80, 242, 0.2) 0%, rgba(121, 80, 242, 0.05) 100%)'
						: 'rgba(255, 255, 255, 0.03)',
					border: isCurrentTurn
						? '2px solid #7950f2'
						: isYou
							? '1px solid rgba(121, 80, 242, 0.5)'
							: '1px solid rgba(255, 255, 255, 0.1)',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{isCurrentTurn && (
					<Box
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							height: '3px',
							background: 'linear-gradient(90deg, #7950f2, #e64980, #fd7e14)',
							animation: 'shimmer 2s linear infinite',
							backgroundSize: '200% 100%',
						}}
					/>
				)}

				<Group justify="space-between" wrap="nowrap">
					<Group gap="sm" wrap="nowrap">
						<Avatar
							radius="xl"
							size="md"
							color={isYou ? 'violet' : 'gray'}
							variant={isYou ? 'filled' : 'light'}
						>
							<IconUser size={18} />
						</Avatar>
						<Box>
							<Group gap="xs">
								<Text fw={600} size="sm" c="white">
									{player.name}
								</Text>
								{isYou && (
									<Badge size="xs" variant="light" color="violet">
										You
									</Badge>
								)}
								{isCurrentTurn && (
									<Badge
										size="xs"
										variant="filled"
										color="orange"
										leftSection={<IconPlayerPlay size={10} />}
									>
										Turn
									</Badge>
								)}
							</Group>
							<Group gap="xs" mt={4}>
								<Badge size="xs" variant="outline" color="blue">
									Level {player.level}
								</Badge>
								{player.isReady ? (
									<Badge
										size="xs"
										variant="light"
										color="green"
										leftSection={<IconCheck size={10} />}
									>
										Ready
									</Badge>
								) : (
									<Badge
										size="xs"
										variant="light"
										color="yellow"
										leftSection={<IconClock size={10} />}
									>
										Waiting
									</Badge>
								)}
							</Group>
						</Box>
					</Group>

					<Tooltip label={`${player.hand?.length || 0} cards in hand`}>
						<Group gap={4}>
							<IconCards size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
							<Text size="sm" c="dimmed">
								{player.hand?.length || 0}
							</Text>
						</Group>
					</Tooltip>
				</Group>
			</Card>
		</motion.div>
	);
}
