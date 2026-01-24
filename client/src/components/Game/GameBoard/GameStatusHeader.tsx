import { Badge, Box, Group, Paper, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCards, IconClock, IconPlayerPlay, IconRocket } from '@tabler/icons-react';
import { motion } from 'motion/react';

interface GameStatusHeaderProps {
	gameState: any;
	currentPlayerName: string;
}

export function GameStatusHeader({ gameState, currentPlayerName }: GameStatusHeaderProps) {
	const getPhaseInfo = () => {
		switch (gameState.currentPhase) {
			case 'draw':
				return { label: 'Draw Phase', color: 'blue', icon: IconCards };
			case 'action':
				return { label: 'Action Phase', color: 'green', icon: IconPlayerPlay };
			default:
				return { label: 'Waiting', color: 'gray', icon: IconClock };
		}
	};

	const phase = getPhaseInfo();
	const PhaseIcon = phase.icon;

	return (
		<Paper
			p="md"
			radius="lg"
			style={{
				background: 'rgba(0, 0, 0, 0.3)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.1)',
			}}
		>
			<Group justify="space-between" wrap="wrap">
				<Group gap="md">
					<motion.div
						animate={{ rotate: [0, 10, -10, 0] }}
						transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
					>
						<ThemeIcon
							size="lg"
							radius="xl"
							variant="gradient"
							gradient={{ from: 'violet', to: 'pink' }}
						>
							<IconRocket size={20} />
						</ThemeIcon>
					</motion.div>
					<Box>
						<Title order={4} c="white">
							Backyard Rocketeers
						</Title>
						<Text size="xs" c="dimmed">
							Turn {gameState.turnCount} | {currentPlayerName}'s turn
						</Text>
					</Box>
				</Group>

				<Group gap="sm">
					<Badge
						size="lg"
						variant="light"
						color={phase.color}
						leftSection={<PhaseIcon size={14} />}
						styles={{
							root: {
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
							},
						}}
					>
						{phase.label}
					</Badge>
				</Group>
			</Group>
		</Paper>
	);
}
