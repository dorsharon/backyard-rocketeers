import { ActionIcon, Avatar, Box, Button, Group, Portal, Stack, Text, Tooltip } from '@mantine/core';
import { IconCards, IconPlayerPlay, IconX, IconZoomIn } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { GameCard } from './GameCard';
import type { CardHandProps } from './GameCard.types';

// Card layout constants
const CARD_HAND = {
	SM_CARD_WIDTH: 140,
	CONTAINER_PADDING: 32,
	MIN_VISIBLE_WIDTH: 40,
	BASE_OVERLAP_DESKTOP: -40,
	BASE_OVERLAP_MOBILE: -20,
	MOBILE_BREAKPOINT: 768,
	// Container heights
	CONTAINER_HEIGHT_MOBILE: 230,
	CONTAINER_HEIGHT_DESKTOP: 320,
	// Rotation limits
	MAX_ROTATION_MOBILE: 20,
	MAX_ROTATION_DESKTOP: 30,
	ROTATION_PER_CARD_MOBILE: 3,
	ROTATION_PER_CARD_DESKTOP: 5,
	// Y offset for arc effect
	Y_OFFSET_MOBILE: 6,
	Y_OFFSET_DESKTOP: 10,
} as const;

export function CardHand({
	cards,
	selectedCardId,
	onCardClick: _onCardClick,
	onPlayCard,
	isPlayable = true,
	unplayableReason,
	otherPlayers = [],
	currentPlayerId,
}: CardHandProps) {
	const totalCards = cards.length;
	const [isMobile, setIsMobile] = useState(false);
	const [viewportWidth, setViewportWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 1024
	);
	const [zoomedCardId, setZoomedCardId] = useState<string | null>(null);
	const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
	const [actionMenuCardId, setActionMenuCardId] = useState<string | null>(null);
	const [showTargetSelection, setShowTargetSelection] = useState(false);

	// Check viewport size
	useEffect(() => {
		const checkViewport = () => {
			setIsMobile(window.innerWidth < CARD_HAND.MOBILE_BREAKPOINT);
			setViewportWidth(window.innerWidth);
		};
		checkViewport();
		window.addEventListener('resize', checkViewport);
		return () => window.removeEventListener('resize', checkViewport);
	}, []);

	// Memoize card overlap calculation
	const cardOverlap = useMemo(() => {
		if (isMobile) {
			const availableWidth = viewportWidth - CARD_HAND.CONTAINER_PADDING;
			const totalCardsWidth = CARD_HAND.SM_CARD_WIDTH * totalCards;

			if (totalCardsWidth <= availableWidth) {
				return CARD_HAND.BASE_OVERLAP_MOBILE;
			}
			const neededOverlap = (totalCardsWidth - availableWidth) / (totalCards - 1 || 1);
			const maxOverlap = CARD_HAND.SM_CARD_WIDTH - CARD_HAND.MIN_VISIBLE_WIDTH;
			return -Math.min(neededOverlap + 20, maxOverlap);
		}
		return CARD_HAND.BASE_OVERLAP_DESKTOP;
	}, [isMobile, viewportWidth, totalCards]);

	// Memoize rotation spread calculation
	const maxRotation = useMemo(() => {
		return isMobile
			? Math.min(totalCards * CARD_HAND.ROTATION_PER_CARD_MOBILE, CARD_HAND.MAX_ROTATION_MOBILE)
			: Math.min(totalCards * CARD_HAND.ROTATION_PER_CARD_DESKTOP, CARD_HAND.MAX_ROTATION_DESKTOP);
	}, [isMobile, totalCards]);

	const zoomedCard = zoomedCardId
		? cards.find((c) => c.id === zoomedCardId)
		: null;

	const handleCardClick = (cardId: string) => {
		// Toggle action menu on click
		setActionMenuCardId((prev) => (prev === cardId ? null : cardId));
	};

	const handleZoomCard = (cardId: string) => {
		setZoomedCardId(cardId);
		setActionMenuCardId(null);
	};

	const handlePlayFromMenu = (cardId: string) => {
		const card = cards.find((c) => c.id === cardId);
		if (!card || !isPlayable) return;

		// Check if this is a sabotage card that needs a target
		if (card.type === 'sabotage') {
			setZoomedCardId(cardId);
			setActionMenuCardId(null);
			setShowTargetSelection(true);
			return;
		}
		onPlayCard?.(cardId);
		setActionMenuCardId(null);
	};

	const handlePlayCard = () => {
		if (zoomedCardId && isPlayable) {
			// Check if this is a sabotage card that needs a target
			if (zoomedCard?.type === 'sabotage') {
				setShowTargetSelection(true);
				return;
			}
			onPlayCard?.(zoomedCardId);
			setZoomedCardId(null);
		}
	};

	const handleSelectTarget = (targetPlayerId: string) => {
		if (zoomedCardId) {
			onPlayCard?.(zoomedCardId, targetPlayerId);
			setZoomedCardId(null);
			setShowTargetSelection(false);
		}
	};

	const handleCancelTargetSelection = () => {
		setShowTargetSelection(false);
	};

	// Get valid targets for sabotage (opponents with launch pad)
	const validTargets = otherPlayers.filter(
		(p) => p.sessionId !== currentPlayerId && p.hasLaunchPad
	);

	const cardSize = isMobile ? 'sm' : 'md';
	const containerHeight = isMobile
		? CARD_HAND.CONTAINER_HEIGHT_MOBILE
		: CARD_HAND.CONTAINER_HEIGHT_DESKTOP;
	const yOffsetMultiplier = isMobile ? CARD_HAND.Y_OFFSET_MOBILE : CARD_HAND.Y_OFFSET_DESKTOP;

	return (
		<>
			{/* Card Hand Display */}
			<Box
				onClick={() => setActionMenuCardId(null)}
				style={{
					position: 'relative',
					height: containerHeight,
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-end',
					paddingBottom: isMobile ? 10 : 20,
					overflow: 'visible',
				}}
			>
				<Box
					style={{
						display: 'flex',
						flexWrap: 'nowrap',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					{cards.map((card, index) => {
						const centerOffset = index - (totalCards - 1) / 2;
						const rotation =
							(centerOffset / Math.max(totalCards - 1, 1)) * maxRotation;
						const yOffset = Math.abs(centerOffset) * yOffsetMultiplier;
						const isSelected = card.id === selectedCardId;
						const isHovered = card.id === hoveredCardId;

						// Base z-index: cards in center are higher
						const baseZIndex = totalCards - Math.abs(Math.round(centerOffset));

						return (
							<motion.div
								key={card.id}
								initial={{ opacity: 0, y: 50 }}
								animate={{
									opacity: 1,
									y: isSelected ? -20 : yOffset,
									rotate: rotation,
									scale: isSelected ? 1.1 : 1,
									zIndex: isHovered ? 200 : isSelected ? 100 : baseZIndex,
								}}
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 25,
								}}
								whileHover={{
									y: -25,
									scale: 1.15,
									zIndex: 200,
									transition: { duration: 0.2 },
								}}
								onHoverStart={() => setHoveredCardId(card.id)}
								onHoverEnd={() => setHoveredCardId(null)}
								onClick={(e) => {
									e.stopPropagation();
									handleCardClick(card.id);
								}}
								style={{
									position: 'relative',
									marginLeft: index === 0 ? 0 : cardOverlap,
									transformOrigin: 'bottom center',
									cursor: 'pointer',
								}}
							>
								<GameCard
									id={card.id}
									name={card.name}
									type={card.type}
									effect={card.effect}
									description={card.description}
									strength={card.strength}
									tier={card.tier}
									isCovert={card.isCovert}
									isRevealed={card.isRevealed}
									isSelected={isSelected || actionMenuCardId === card.id}
									isPlayable={isPlayable}
									isHandHovered={isHovered}
									size={cardSize}
								/>
							</motion.div>
						);
					})}
				</Box>
			</Box>

			{/* Floating Action Bar - rendered via Portal */}
			<Portal>
				<AnimatePresence>
					{actionMenuCardId && (
						<motion.div
							initial={{ opacity: 0, y: 20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 20, scale: 0.95 }}
							transition={{ type: 'spring', stiffness: 400, damping: 30 }}
							style={{
								position: 'fixed',
								bottom: isMobile ? 12 : 20,
								left: '50%',
								transform: 'translateX(-50%)',
								zIndex: 1000,
							}}
						>
							<Group
								gap={8}
								style={{
									background: 'rgba(15, 15, 25, 0.95)',
									backdropFilter: 'blur(12px)',
									padding: '8px 12px',
									borderRadius: 28,
									border: '1px solid rgba(255, 255, 255, 0.12)',
									boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
								}}
							>
								{[
									{
										icon: <IconZoomIn size={20} />,
										label: 'View',
										color: 'blue',
										onClick: () => handleZoomCard(actionMenuCardId),
										delay: 0,
									},
									{
										icon: <IconPlayerPlay size={20} />,
										label: isPlayable ? 'Play' : 'Wait',
										tooltip: isPlayable ? 'Play Card' : (unplayableReason || 'Not your turn'),
										color: isPlayable ? 'teal' : 'gray',
										onClick: () => handlePlayFromMenu(actionMenuCardId),
										delay: 0.05,
										disabled: !isPlayable,
									},
									{
										icon: <IconX size={20} />,
										label: 'Close',
										color: 'dark',
										onClick: () => setActionMenuCardId(null),
										delay: 0.1,
									},
								].map((action) => (
									<motion.div
										key={action.label}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											type: 'spring',
											stiffness: 500,
											damping: 25,
											delay: action.delay,
										}}
									>
										<Tooltip
											label={action.tooltip || action.label}
											position="top"
											withArrow
											transitionProps={{ transition: 'pop', duration: 150 }}
										>
											<ActionIcon
												variant={action.disabled ? 'subtle' : 'light'}
												color={action.color}
												size="xl"
												radius="xl"
												onClick={(e) => {
													e.stopPropagation();
													action.onClick();
												}}
												disabled={action.disabled}
												style={{
													transition: 'transform 0.15s ease, background 0.15s ease',
												}}
												onMouseEnter={(e) => {
													if (!action.disabled) {
														e.currentTarget.style.transform = 'scale(1.1)';
													}
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.transform = 'scale(1)';
												}}
											>
												{action.icon}
											</ActionIcon>
										</Tooltip>
									</motion.div>
								))}
							</Group>
						</motion.div>
					)}
				</AnimatePresence>
			</Portal>

			{/* Zoomed Card Modal - rendered via Portal to ensure full-screen overlay */}
			<Portal>
				<AnimatePresence>
					{zoomedCard && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={() => setZoomedCardId(null)}
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: 'rgba(0, 0, 0, 0.9)',
								zIndex: 9999,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
								padding: 20,
							}}
						>
							{/* Close button */}
							<ActionIcon
								variant="filled"
								color="dark"
								size="xl"
								radius="xl"
								onClick={() => setZoomedCardId(null)}
								style={{
									position: 'absolute',
									top: 20,
									right: 20,
									zIndex: 10001,
								}}
							>
								<IconX size={20} />
							</ActionIcon>

							{/* Zoomed Card Container */}
							<motion.div
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.5, opacity: 0 }}
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 25,
								}}
								onClick={(e) => e.stopPropagation()}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 16,
								}}
							>
								{/* The card itself */}
								<Box>
									<GameCard
										id={zoomedCard.id}
										name={zoomedCard.name}
										type={zoomedCard.type}
										effect={zoomedCard.effect}
										description={zoomedCard.description}
										strength={zoomedCard.strength}
										tier={zoomedCard.tier}
										isCovert={zoomedCard.isCovert}
										isRevealed={zoomedCard.isRevealed}
										isSelected={zoomedCard.id === selectedCardId}
										isPlayable={true}
										size="xl"
									/>
								</Box>

								{/* Target selection for sabotage cards */}
								{showTargetSelection && zoomedCard?.type === 'sabotage' ? (
									<Stack gap="md" align="center" style={{ marginTop: 8 }}>
										<Text c="white" fw={500}>Select a target:</Text>
										{validTargets.length > 0 ? (
											<Group gap="sm" justify="center">
												{validTargets.map((target) => (
													<Button
														key={target.sessionId}
														variant="light"
														color="red"
														size="md"
														leftSection={
															<Avatar size="sm" color="red" radius="xl">
																{target.name.charAt(0).toUpperCase()}
															</Avatar>
														}
														onClick={() => handleSelectTarget(target.sessionId)}
													>
														{target.name}
													</Button>
												))}
											</Group>
										) : (
											<Text c="dimmed" size="sm" fs="italic">
												No valid targets (opponents need a Launch Pad)
											</Text>
										)}
										<Button
											variant="subtle"
											color="gray"
											size="sm"
											onClick={handleCancelTargetSelection}
										>
											Cancel
										</Button>
									</Stack>
								) : isPlayable ? (
									<Button
										size="lg"
										leftSection={<IconCards size={20} />}
										onClick={handlePlayCard}
										variant="gradient"
										gradient={{ from: 'teal', to: 'lime', deg: 105 }}
										style={{
											marginTop: 8,
											boxShadow: '0 4px 20px rgba(0, 255, 128, 0.3)',
										}}
									>
										{zoomedCard?.type === 'sabotage' ? 'Select Target' : 'Play Card'}
									</Button>
								) : (
									<Tooltip
										label={unplayableReason || "Wait for your turn to play"}
										position="bottom"
										withArrow
									>
										<Button
											size="lg"
											leftSection={<IconCards size={20} />}
											variant="light"
											color="gray"
											disabled
											style={{
												marginTop: 8,
											}}
										>
											Play Card
										</Button>
									</Tooltip>
								)}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</Portal>
		</>
	);
}
