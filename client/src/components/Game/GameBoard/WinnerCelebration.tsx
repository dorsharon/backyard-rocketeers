import { Card, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';
import { motion } from 'motion/react';

interface WinnerCelebrationProps {
	winnerName: string;
}

export function WinnerCelebration({ winnerName }: WinnerCelebrationProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ type: 'spring', duration: 0.8 }}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'rgba(0, 0, 0, 0.8)',
				backdropFilter: 'blur(10px)',
				zIndex: 1000,
			}}
		>
			<Card
				padding="xl"
				radius="xl"
				style={{
					background:
						'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 140, 0, 0.1) 100%)',
					border: '2px solid rgba(255, 215, 0, 0.5)',
					textAlign: 'center',
				}}
			>
				<Stack align="center" gap="lg">
					<motion.div
						animate={{
							scale: [1, 1.2, 1],
							rotate: [0, 10, -10, 0],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
						}}
					>
						<ThemeIcon
							size={100}
							radius="xl"
							variant="gradient"
							gradient={{ from: 'yellow', to: 'orange' }}
						>
							<IconTrophy size={50} />
						</ThemeIcon>
					</motion.div>

					<Title order={1} c="white">
						Mission Complete!
					</Title>
					<Title order={2} style={{ color: '#ffd700' }}>
						{winnerName} Wins!
					</Title>
					<Text c="dimmed">Successfully reached the Alien Base on Mars</Text>
				</Stack>
			</Card>
		</motion.div>
	);
}
