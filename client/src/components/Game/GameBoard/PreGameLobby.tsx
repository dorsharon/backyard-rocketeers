import {
	Alert,
	Avatar,
	Box,
	Button,
	Card,
	Group,
	Paper,
	Progress,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import {
	IconAlertCircle,
	IconCheck,
	IconCircleCheck,
	IconCircleDashed,
	IconRocket,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import type { PlayerData } from './GameBoard.types';

interface PreGameLobbyProps {
	players: PlayerData[];
	currentPlayer: PlayerData | undefined;
	playerId: string | null;
	onReady: () => void;
	onStartGame: () => void;
	pendingAction?: string | null;
}

export function PreGameLobby({
	players,
	currentPlayer,
	playerId,
	onReady,
	onStartGame,
	pendingAction,
}: PreGameLobbyProps) {
	const allReady = players.length >= 2 && players.every((p) => p.isReady);
	const readyCount = players.filter((p) => p.isReady).length;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Card
				padding="xl"
				radius="xl"
				style={{
					background: 'rgba(0, 0, 0, 0.4)',
					backdropFilter: 'blur(20px)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					maxWidth: 500,
					margin: '0 auto',
				}}
			>
				<Stack gap="xl" align="center">
					<motion.div
						animate={{
							y: [0, -10, 0],
							rotate: [0, 5, -5, 0],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					>
						<ThemeIcon
							size={80}
							radius="xl"
							variant="gradient"
							gradient={{ from: 'violet', to: 'pink', deg: 135 }}
						>
							<IconRocket size={40} />
						</ThemeIcon>
					</motion.div>

					<Box ta="center">
						<Title order={2} c="white" mb="xs">
							Mission Briefing
						</Title>
						<Text c="dimmed" size="sm">
							Waiting for astronauts to report for duty
						</Text>
					</Box>

					<Box w="100%">
						<Group justify="space-between" mb="xs">
							<Text size="sm" c="dimmed">
								Ready Status
							</Text>
							<Text size="sm" c="white" fw={600}>
								{readyCount}/{players.length} Ready
							</Text>
						</Group>
						<Progress
							value={(readyCount / Math.max(players.length, 2)) * 100}
							color={allReady ? 'green' : 'violet'}
							size="lg"
							radius="xl"
							animated
						/>
					</Box>

					<Stack gap="xs" w="100%">
						{players.map((player) => (
							<Paper
								key={player.sessionId}
								p="sm"
								radius="md"
								style={{
									background:
										player.sessionId === playerId
											? 'rgba(121, 80, 242, 0.2)'
											: 'rgba(255, 255, 255, 0.05)',
									border:
										player.sessionId === playerId
											? '1px solid rgba(121, 80, 242, 0.5)'
											: '1px solid rgba(255, 255, 255, 0.05)',
								}}
							>
								<Group justify="space-between">
									<Group gap="sm">
										<Avatar size="sm" color="violet" radius="xl">
											{player.name.charAt(0).toUpperCase()}
										</Avatar>
										<Text size="sm" c="white" fw={500}>
											{player.name}
											{player.sessionId === playerId && (
												<Text span c="dimmed" size="xs" ml={4}>
													(You)
												</Text>
											)}
										</Text>
									</Group>
									<AnimatePresence mode="wait">
										{player.isReady ? (
											<motion.div
												key="ready"
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												exit={{ scale: 0 }}
											>
												<ThemeIcon color="green" size="sm" radius="xl">
													<IconCircleCheck size={14} />
												</ThemeIcon>
											</motion.div>
										) : (
											<motion.div
												key="waiting"
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												exit={{ scale: 0 }}
											>
												<ThemeIcon color="gray" size="sm" radius="xl" variant="light">
													<IconCircleDashed size={14} />
												</ThemeIcon>
											</motion.div>
										)}
									</AnimatePresence>
								</Group>
							</Paper>
						))}
					</Stack>

					{players.length < 2 && (
						<Alert
							color="yellow"
							variant="light"
							icon={<IconAlertCircle size={16} />}
							style={{ width: '100%' }}
						>
							Need at least 2 players to start the mission
						</Alert>
					)}

					<Group gap="sm" w="100%">
						<Button
							flex={1}
							size="lg"
							variant={currentPlayer?.isReady ? 'light' : 'gradient'}
							gradient={{ from: 'violet', to: 'pink' }}
							onClick={onReady}
							disabled={currentPlayer?.isReady || pendingAction === 'ready'}
							leftSection={currentPlayer?.isReady ? <IconCheck size={18} /> : undefined}
							loading={pendingAction === 'ready'}
						>
							{currentPlayer?.isReady ? 'Ready!' : 'Mark Ready'}
						</Button>

						<Button
							flex={1}
							size="lg"
							variant="gradient"
							gradient={{ from: 'orange', to: 'red' }}
							onClick={onStartGame}
							disabled={!allReady || players.length < 2 || pendingAction === 'start_game'}
							leftSection={<IconRocket size={18} />}
							loading={pendingAction === 'start_game'}
						>
							Launch Mission
						</Button>
					</Group>
				</Stack>
			</Card>
		</motion.div>
	);
}
