import { Box, Progress, Stack, Text, Tooltip } from '@mantine/core';
import { motion } from 'motion/react';
import { useState } from 'react';
import type { CardData, ComponentType } from '../../../types/game';
import type { ComponentTier, RocketVisualProps } from './RocketVisual.types';
import { SIZE_CONFIGS, TIER_STYLES } from './RocketVisual.types';
import { CovertSlotSprite } from './sprites/CovertSlotSprite';
import { FuselageSprite } from './sprites/FuselageSprite';
import { LaunchPadSprite } from './sprites/LaunchPadSprite';
import { NoseConeSprite } from './sprites/NoseConeSprite';
import { StabilizerFinsSprite } from './sprites/StabilizerFinsSprite';
import { ThrusterSprite } from './sprites/ThrusterSprite';

/**
 * Get component by type from the components array.
 */
function getComponentByType(
	components: CardData[],
	componentType: ComponentType,
): CardData | undefined {
	return components.find((c) => c.componentType === componentType);
}

/**
 * Check if a component is a covert placeholder (hidden from view).
 */
function isCovertPlaceholder(component: CardData): boolean {
	return component.isCovert && !component.isRevealed && component.baseId === 'covert_placeholder';
}

/**
 * Render tooltip content for a component.
 */
function ComponentTooltipContent({
	component,
	isOwner,
}: {
	component: CardData;
	isOwner: boolean;
}) {
	// Hidden covert card (non-owner viewing)
	if (isCovertPlaceholder(component)) {
		return (
			<Stack gap={4}>
				<Text fw={600} size="sm" c="violet.3">
					Hidden Component
				</Text>
				<Text size="xs" c="dimmed">
					This component is classified.
				</Text>
			</Stack>
		);
	}

	const tier = (component.tier || 1) as ComponentTier;
	const tierStyle = TIER_STYLES[tier];

	return (
		<Stack gap={4}>
			<Text fw={600} size="sm" c="white">
				{component.name}
			</Text>
			<Text
				size="xs"
				c={tier === 3 ? 'violet.3' : tier === 2 ? 'gray.4' : 'gray.5'}
			>
				{tierStyle.label} (Tier {tier})
			</Text>
			{component.strength > 0 && (
				<Text size="xs" c="yellow.4">
					Strength: +{component.strength}
				</Text>
			)}
			{component.effect && (
				<Text size="xs" c="dimmed" maw={200}>
					{component.effect}
				</Text>
			)}
			{component.isCovert && isOwner && (
				<Text size="xs" c="violet.4" fs="italic">
					Covert - Hidden from opponents
				</Text>
			)}
		</Stack>
	);
}

/**
 * Wrapper for components with tooltip.
 */
function ComponentWrapper({
	component,
	isOwner,
	children,
	onHover,
	onClick,
}: {
	component: CardData;
	isOwner: boolean;
	children: React.ReactNode;
	onHover?: (component: CardData | null) => void;
	onClick?: (component: CardData) => void;
}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Tooltip
			label={<ComponentTooltipContent component={component} isOwner={isOwner} />}
			position="right"
			withArrow
			multiline
			w={220}
			styles={{
				tooltip: {
					background: 'rgba(15, 23, 42, 0.95)',
					border: '1px solid rgba(139, 92, 246, 0.3)',
					backdropFilter: 'blur(10px)',
				},
			}}
		>
			<Box
				style={{ cursor: onClick ? 'pointer' : 'default' }}
				onMouseEnter={() => {
					setIsHovered(true);
					onHover?.(component);
				}}
				onMouseLeave={() => {
					setIsHovered(false);
					onHover?.(null);
				}}
				onClick={() => onClick?.(component)}
			>
				<motion.div
					animate={{ scale: isHovered ? 1.02 : 1 }}
					transition={{ duration: 0.15 }}
				>
					{children}
				</motion.div>
			</Box>
		</Tooltip>
	);
}

/**
 * RocketVisual - Renders a complete rocket visualization.
 * Assembles individual component sprites vertically.
 */
export function RocketVisual({
	components,
	hasLaunchPad,
	groundFuel,
	size,
	isOwner,
	onComponentHover,
	onComponentClick,
}: RocketVisualProps) {
	const config = SIZE_CONFIGS[size];

	// Get components by type
	const noseCone = getComponentByType(components, 'nose_cone');
	const fuselage = getComponentByType(components, 'fuselage');
	const fins = getComponentByType(components, 'stabilizer_fins');
	const thruster = getComponentByType(components, 'thruster');

	// Render a component sprite or placeholder
	const renderComponent = (
		component: CardData | undefined,
		componentType: ComponentType,
		SpriteComponent: React.ComponentType<{ tier: ComponentTier; size: typeof size; isHovered?: boolean }>,
	) => {
		if (!component) {
			// Empty slot - show nothing or a faint outline
			return null;
		}

		// Check if this is a hidden covert component
		if (isCovertPlaceholder(component)) {
			return (
				<ComponentWrapper
					component={component}
					isOwner={isOwner}
					onHover={onComponentHover}
				>
					<CovertSlotSprite size={size} componentType={componentType} />
				</ComponentWrapper>
			);
		}

		const tier = (component.tier || 1) as ComponentTier;

		return (
			<ComponentWrapper
				component={component}
				isOwner={isOwner}
				onHover={onComponentHover}
				onClick={onComponentClick}
			>
				<Box style={{ position: 'relative' }}>
					<SpriteComponent tier={tier} size={size} />
					{/* Covert indicator for owner */}
					{component.isCovert && isOwner && (
						<Box
							style={{
								position: 'absolute',
								top: 0,
								right: 0,
								background: 'rgba(139, 92, 246, 0.8)',
								borderRadius: '50%',
								width: size === 'sm' ? 12 : size === 'md' ? 16 : 20,
								height: size === 'sm' ? 12 : size === 'md' ? 16 : 20,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text size="xs" c="white" fw={700}>
								C
							</Text>
						</Box>
					)}
				</Box>
			</ComponentWrapper>
		);
	};

	return (
		<Stack
			align="center"
			gap={0}
			style={{
				position: 'relative',
				padding: size === 'sm' ? 8 : size === 'md' ? 12 : 16,
			}}
		>
			{/* Nose Cone */}
			{noseCone && renderComponent(noseCone, 'nose_cone', NoseConeSprite)}

			{/* Fuselage */}
			{fuselage && (
				<Box style={{ marginTop: -4 }}>
					{renderComponent(fuselage, 'fuselage', FuselageSprite)}
				</Box>
			)}

			{/* Stabilizer Fins - positioned around thruster */}
			{fins && (
				<Box style={{ marginTop: -8, position: 'relative', zIndex: 1 }}>
					{renderComponent(fins, 'stabilizer_fins', StabilizerFinsSprite)}
				</Box>
			)}

			{/* Thruster */}
			{thruster && (
				<Box style={{ marginTop: -10, position: 'relative', zIndex: 0 }}>
					{renderComponent(thruster, 'thruster', ThrusterSprite)}
				</Box>
			)}

			{/* Launch Pad */}
			{hasLaunchPad && (
				<Box style={{ marginTop: size === 'sm' ? 4 : 8 }}>
					<LaunchPadSprite size={size} />
				</Box>
			)}

			{/* Fuel Gauge - only show if has launch pad and size is md or lg */}
			{hasLaunchPad && size !== 'sm' && (
				<Box w={config.width} mt="xs">
					<Text size="xs" c="dimmed" ta="center" mb={4}>
						Fuel: {groundFuel}%
					</Text>
					<Progress
						value={groundFuel}
						size={size === 'md' ? 'xs' : 'sm'}
						color={groundFuel >= 100 ? 'green' : groundFuel >= 50 ? 'yellow' : 'red'}
						style={{
							background: 'rgba(0, 0, 0, 0.3)',
						}}
					/>
				</Box>
			)}

			{/* Empty state when no components */}
			{!hasLaunchPad && components.length === 0 && (
				<Box
					style={{
						width: config.width,
						height: config.width * 1.5,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						border: '2px dashed rgba(255, 255, 255, 0.2)',
						borderRadius: 8,
					}}
				>
					<Text size={size === 'sm' ? 'xs' : 'sm'} c="dimmed" ta="center">
						{size !== 'sm' && 'Play a Launch Pad\nto start building'}
						{size === 'sm' && 'No Rocket'}
					</Text>
				</Box>
			)}
		</Stack>
	);
}
