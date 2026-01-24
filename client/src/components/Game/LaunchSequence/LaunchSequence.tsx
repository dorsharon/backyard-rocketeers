import {
	Badge,
	Box,
	Card,
	Group,
	Progress,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Countdown } from './Countdown';
import { Dice } from './Dice';
import { Explosion } from './Explosion';
import type { LaunchPhase, LaunchSequenceProps } from './LaunchSequence.types';
import { RocketLiftoff } from './RocketLiftoff';

export function LaunchSequence({
	isVisible,
	playerName,
	rollResults = [],
	launchSuccess,
	failureReason,
	onComplete,
}: LaunchSequenceProps) {
	const [phase, setPhase] = useState<LaunchPhase>('countdown');
	const [showExplosion, setShowExplosion] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setPhase('countdown');
			setShowExplosion(false);
		}
	}, [isVisible]);

	const handleCountdownComplete = () => {
		setPhase('rolling');
	};

	useEffect(() => {
		if (phase === 'rolling' && rollResults.length > 0) {
			// Wait for dice to finish rolling, then show result
			const timer = setTimeout(() => {
				setPhase('result');
				if (!launchSuccess) {
					setShowExplosion(true);
				}
			}, rollResults.length * 200 + 1500);

			return () => clearTimeout(timer);
		}
		return undefined;
	}, [phase, rollResults, launchSuccess]);

	useEffect(() => {
		if (phase === 'result' && onComplete) {
			const timer = setTimeout(onComplete, 3000);
			return () => clearTimeout(timer);
		}
		return undefined;
	}, [phase, onComplete]);

	if (!isVisible) return null;

	// Calculate roll stats
	const successfulRolls = rollResults.filter((r) => r >= 4).length;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'rgba(0, 0, 0, 0.9)',
				backdropFilter: 'blur(20px)',
				zIndex: 1000,
			}}
		>
			<Card
				padding="xl"
				radius="xl"
				style={{
					background: 'rgba(0, 0, 0, 0.6)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					minWidth: 400,
					maxWidth: 600,
					textAlign: 'center',
					position: 'relative',
					overflow: 'visible',
				}}
			>
				<Stack gap="xl" align="center">
					{/* Header */}
					<Box>
						<Badge
							size="lg"
							variant="gradient"
							gradient={{ from: 'orange', to: 'red' }}
							mb="sm"
						>
							LAUNCH SEQUENCE
						</Badge>
						<Title order={3} c="white">
							{playerName}'s Rocket
						</Title>
					</Box>

					{/* Countdown Phase */}
					{phase === 'countdown' && <Countdown onComplete={handleCountdownComplete} />}

					{/* Rolling Phase */}
					{phase === 'rolling' && (
						<Stack gap="lg" align="center">
							<Box style={{ position: 'relative' }}>
								<RocketLiftoff success={false} />
							</Box>

							<Text c="dimmed" size="sm">
								Rolling launch checks...
							</Text>

							<Group gap="md" justify="center">
								{rollResults.map((result, index) => (
									<Dice key={index} value={result} delay={index * 200} isSuccess={result >= 4} />
								))}
							</Group>
						</Stack>
					)}

					{/* Result Phase */}
					{phase === 'result' && (
						<Stack gap="lg" align="center">
							<Box style={{ position: 'relative' }}>
								{showExplosion && <Explosion />}
								<RocketLiftoff success={launchSuccess || false} />
							</Box>

							<AnimatePresence>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', delay: 0.5 }}
								>
									{launchSuccess ? (
										<Stack align="center" gap="sm">
											<ThemeIcon size={60} radius="xl" color="green" variant="light">
												<IconCheck size={30} />
											</ThemeIcon>
											<Title order={2} c="green">
												LAUNCH SUCCESSFUL!
											</Title>
											<Text c="dimmed">The rocket is heading to space!</Text>
										</Stack>
									) : (
										<Stack align="center" gap="sm">
											<ThemeIcon size={60} radius="xl" color="red" variant="light">
												<IconX size={30} />
											</ThemeIcon>
											<Title order={2} c="red">
												LAUNCH FAILED!
											</Title>
											{failureReason && (
												<Badge
													color="red"
													variant="light"
													size="lg"
													leftSection={<IconAlertTriangle size={14} />}
												>
													{failureReason}
												</Badge>
											)}
										</Stack>
									)}
								</motion.div>
							</AnimatePresence>

							{/* Roll Summary */}
							<Card
								padding="md"
								radius="md"
								style={{
									background: 'rgba(255, 255, 255, 0.05)',
									border: '1px solid rgba(255, 255, 255, 0.1)',
									width: '100%',
								}}
							>
								<Stack gap="sm">
									<Group justify="space-between">
										<Text size="sm" c="dimmed">
											Dice Rolled
										</Text>
										<Group gap="xs">
											{rollResults.map((result, index) => (
												<Badge key={index} size="sm" color={result >= 4 ? 'green' : 'red'} variant="light">
													{result}
												</Badge>
											))}
										</Group>
									</Group>

									<Group justify="space-between">
										<Text size="sm" c="dimmed">
											Successful Checks (4+)
										</Text>
										<Text size="sm" fw={600} c={successfulRolls > 0 ? 'green' : 'red'}>
											{successfulRolls} / {rollResults.length}
										</Text>
									</Group>

									<Progress
										value={(successfulRolls / Math.max(rollResults.length, 1)) * 100}
										color={successfulRolls >= rollResults.length / 2 ? 'green' : 'red'}
										size="sm"
										radius="xl"
										animated
									/>
								</Stack>
							</Card>
						</Stack>
					)}
				</Stack>
			</Card>
		</motion.div>
	);
}
