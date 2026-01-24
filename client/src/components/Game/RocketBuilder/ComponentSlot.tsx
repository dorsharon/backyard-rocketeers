import { Badge, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { motion } from 'motion/react';
import type { ComponentSlotProps, TierInfo } from './RocketBuilder.types';

// Get tier info for display
function getTierInfo(tier: number): TierInfo {
	switch (tier) {
		case 1:
			return { label: 'Improvised', color: '#a3a3a3' };
		case 2:
			return { label: 'Second-Hand', color: '#fbbf24' };
		case 3:
			return { label: 'Cutting Edge', color: '#22d3ee' };
		default:
			return { label: '', color: '#666' };
	}
}

// Get component type icon
function getComponentIcon(name: string): string {
	if (name.includes('Fuselage')) return '🚀';
	if (name.includes('Nose')) return '🔺';
	if (name.includes('Fins') || name.includes('Stabilizer')) return '◀▶';
	if (name.includes('Thruster')) return '🔥';
	if (name.includes('Boosters')) return '⚡';
	if (name.includes('Staging')) return '📦';
	if (name.includes('Anti')) return '🛡️';
	return '🔧';
}

export function ComponentSlot({ component, index }: ComponentSlotProps) {
	const tierInfo = component ? getTierInfo(component.tier) : null;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: index * 0.1 }}
		>
			<Tooltip
				label={
					component ? (
						<Stack gap={4}>
							<Text size="sm" fw={600}>
								{component.name}
							</Text>
							{tierInfo?.label && (
								<Text size="xs" c="dimmed">
									{tierInfo.label}
								</Text>
							)}
							{component.strength > 0 && <Text size="xs">Strength: +{component.strength}</Text>}
							{component.isCovert && !component.isRevealed && (
								<Badge size="xs" color="gray">
									Hidden
								</Badge>
							)}
						</Stack>
					) : (
						'Empty slot'
					)
				}
				position="top"
				withArrow
			>
				<Paper
					p="xs"
					radius="md"
					style={{
						width: 70,
						height: 70,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						background: component
							? `linear-gradient(135deg, ${tierInfo?.color}20, ${tierInfo?.color}10)`
							: 'rgba(255, 255, 255, 0.03)',
						border: component
							? `2px solid ${tierInfo?.color}60`
							: '2px dashed rgba(255, 255, 255, 0.1)',
						cursor: 'default',
						transition: 'all 0.2s ease',
					}}
				>
					{component ? (
						<>
							<Text size="xl">{getComponentIcon(component.name)}</Text>
							{component.isCovert && !component.isRevealed ? (
								<Text size="xs" c="dimmed">
									?
								</Text>
							) : (
								<Text size="xs" c="dimmed" ta="center" lineClamp={1} style={{ maxWidth: 60 }}>
									{component.name.split(' ')[0]}
								</Text>
							)}
						</>
					) : (
						<Text size="xl" c="dimmed" style={{ opacity: 0.3 }}>
							+
						</Text>
					)}
				</Paper>
			</Tooltip>
		</motion.div>
	);
}
