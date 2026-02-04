import {
	Badge,
	Box,
	Button,
	Card,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconBolt, IconFlame, IconRocket, IconRocketOff, IconShield, IconTarget } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { RocketVisual } from '../RocketVisual/RocketVisual';
import type { LaunchRequirement, RocketBuilderProps } from './RocketBuilder.types';

export function RocketBuilder({
	hasLaunchPad,
	components,
	groundFuel,
	canLaunch,
	isMyTurn,
	currentPhase,
	onLaunch,
	pendingAction,
}: RocketBuilderProps) {
	// Calculate rocket strength
	const totalStrength = components.reduce((sum, c) => sum + (c.strength || 0), 0);

	// Check required components using componentType for accuracy
	const hasFuselage = components.some((c) => c.componentType === 'fuselage');
	const hasNoseCone = components.some((c) => c.componentType === 'nose_cone');
	const hasFins = components.some((c) => c.componentType === 'stabilizer_fins');
	const hasThruster = components.some((c) => c.componentType === 'thruster');

	const requirements: LaunchRequirement[] = [
		{ name: 'Launch Pad', met: hasLaunchPad, icon: <IconTarget size={14} /> },
		{ name: 'Fuselage', met: hasFuselage, icon: <IconRocket size={14} /> },
		{ name: 'Nose Cone', met: hasNoseCone, icon: <IconShield size={14} /> },
		{ name: 'Stabilizer Fins', met: hasFins, icon: <IconBolt size={14} /> },
		{ name: 'Thruster', met: hasThruster, icon: <IconFlame size={14} /> },
		{ name: '100% Fuel', met: groundFuel >= 100, icon: <IconFlame size={14} /> },
	];

	const requirementsMet = requirements.filter((r) => r.met).length;

	return (
		<Card
			padding="lg"
			radius="lg"
			style={{
				background: 'rgba(0, 0, 0, 0.3)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.1)',
			}}
		>
			<Stack gap="md">
				<Group justify="space-between">
					<Title order={5} c="white">
						Your Rocket
					</Title>
					<Badge
						variant="gradient"
						gradient={{
							from: totalStrength > 10 ? 'green' : totalStrength > 5 ? 'yellow' : 'red',
							to: totalStrength > 10 ? 'teal' : totalStrength > 5 ? 'orange' : 'pink',
						}}
					>
						Strength: {totalStrength}
					</Badge>
				</Group>

				{/* Launch Pad Visual */}
				<Box
					style={{
						position: 'relative',
						padding: '20px',
						background: hasLaunchPad
							? 'linear-gradient(180deg, rgba(74, 222, 128, 0.1) 0%, rgba(74, 222, 128, 0.05) 100%)'
							: 'rgba(255, 255, 255, 0.02)',
						borderRadius: 12,
						border: hasLaunchPad
							? '1px solid rgba(74, 222, 128, 0.3)'
							: '1px dashed rgba(255, 255, 255, 0.1)',
					}}
				>
					{!hasLaunchPad ? (
						<Stack align="center" gap="sm" py="xl">
							<ThemeIcon size={60} radius="xl" variant="light" color="gray">
								<IconRocketOff size={30} />
							</ThemeIcon>
							<Text c="dimmed" ta="center" size="sm">
								Place a Launch Pad to start building
							</Text>
						</Stack>
					) : (
						<Box style={{ display: 'flex', justifyContent: 'center' }}>
							<RocketVisual
								components={components}
								hasLaunchPad={hasLaunchPad}
								groundFuel={groundFuel}
								size="lg"
								isOwner={true}
							/>
						</Box>
					)}
				</Box>

				{/* Launch Requirements Checklist */}
				<Box>
					<Text size="xs" c="dimmed" mb="xs">
						Launch Requirements ({requirementsMet}/{requirements.length})
					</Text>
					<Group gap={6} wrap="wrap">
						{requirements.map((req) => (
							<Badge
								key={req.name}
								size="sm"
								variant={req.met ? 'filled' : 'outline'}
								color={req.met ? 'green' : 'gray'}
								leftSection={req.icon}
								style={{
									opacity: req.met ? 1 : 0.5,
								}}
							>
								{req.name}
							</Badge>
						))}
					</Group>
				</Box>

				{/* Launch Button */}
				<AnimatePresence>
					{hasLaunchPad && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
						>
							<Button
								fullWidth
								size="lg"
								variant="gradient"
								gradient={canLaunch ? { from: 'orange', to: 'red' } : { from: 'gray', to: 'dark' }}
								leftSection={<IconRocket size={20} />}
								disabled={
									!canLaunch ||
									!isMyTurn ||
									currentPhase !== 'action' ||
									pendingAction === 'launch_rocket'
								}
								loading={pendingAction === 'launch_rocket'}
								onClick={onLaunch}
								style={{
									boxShadow: canLaunch ? '0 4px 20px rgba(255, 100, 0, 0.4)' : undefined,
								}}
							>
								{!hasLaunchPad
									? 'Need Launch Pad'
									: !canLaunch
										? 'Requirements Not Met'
										: 'LAUNCH!'}
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</Stack>
		</Card>
	);
}
