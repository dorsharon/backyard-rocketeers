import { Badge, Box, Card, Divider, Grid, Group, Paper, Progress, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCards, IconFlame, IconRocket } from '@tabler/icons-react';
import type { PlayerData } from './GameBoard.types';

interface YourStatusPanelProps {
	player: PlayerData;
}

export function YourStatusPanel({ player }: YourStatusPanelProps) {
	return (
		<Card
			padding="lg"
			radius="lg"
			style={{
				background:
					'linear-gradient(135deg, rgba(121, 80, 242, 0.1) 0%, rgba(230, 73, 128, 0.05) 100%)',
				border: '1px solid rgba(121, 80, 242, 0.3)',
			}}
		>
			<Stack gap="md">
				<Group justify="space-between">
					<Title order={5} c="white">
						Your Status
					</Title>
					<Badge variant="gradient" gradient={{ from: 'violet', to: 'pink' }}>
						Level {player.level}
					</Badge>
				</Group>

				<Divider color="rgba(255,255,255,0.1)" />

				<Box>
					<Group justify="space-between" mb={4}>
						<Text size="sm" c="dimmed">
							Ground Fuel
						</Text>
						<Text size="sm" fw={600} c="white">
							{player.groundFuel || 0}%
						</Text>
					</Group>
					<Progress
						value={player.groundFuel || 0}
						color="orange"
						size="sm"
						radius="xl"
						animated={(player.groundFuel || 0) > 0}
					/>
				</Box>

				<Grid gutter="xs">
					<Grid.Col span={6}>
						<Paper p="sm" radius="md" style={{ background: 'rgba(255,255,255,0.05)' }}>
							<Group gap="xs">
								<ThemeIcon size="sm" variant="light" color="blue">
									<IconRocket size={12} />
								</ThemeIcon>
								<Box>
									<Text size="xs" c="dimmed">
										Launch Pad
									</Text>
									<Text size="sm" fw={600} c="white">
										{player.hasLaunchPad ? 'Ready' : 'None'}
									</Text>
								</Box>
							</Group>
						</Paper>
					</Grid.Col>
					<Grid.Col span={6}>
						<Paper p="sm" radius="md" style={{ background: 'rgba(255,255,255,0.05)' }}>
							<Group gap="xs">
								<ThemeIcon size="sm" variant="light" color="violet">
									<IconCards size={12} />
								</ThemeIcon>
								<Box>
									<Text size="xs" c="dimmed">
										Hand
									</Text>
									<Text size="sm" fw={600} c="white">
										{player.hand?.length || 0} cards
									</Text>
								</Box>
							</Group>
						</Paper>
					</Grid.Col>
					<Grid.Col span={6}>
						<Paper p="sm" radius="md" style={{ background: 'rgba(255,255,255,0.05)' }}>
							<Group gap="xs">
								<ThemeIcon size="sm" variant="light" color="green">
									<IconFlame size={12} />
								</ThemeIcon>
								<Box>
									<Text size="xs" c="dimmed">
										Components
									</Text>
									<Text size="sm" fw={600} c="white">
										{player.rocketComponents?.length || 0}
									</Text>
								</Box>
							</Group>
						</Paper>
					</Grid.Col>
				</Grid>
			</Stack>
		</Card>
	);
}
