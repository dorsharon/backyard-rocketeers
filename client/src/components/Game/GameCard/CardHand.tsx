import { ActionIcon, Box, Button, Portal } from '@mantine/core';
import { IconCards, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { GameCard } from './GameCard';
import type { CardHandProps } from './GameCard.types';

export function CardHand({
	cards,
	selectedCardId,
	onCardClick,
	isPlayable = true,
}: CardHandProps) {
	const totalCards = cards.length;
	const [isMobile, setIsMobile] = useState(false);
	const [viewportWidth, setViewportWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 1024
	);
	const [zoomedCardId, setZoomedCardId] = useState<string | null>(null);
	const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

	// Check viewport size
	useEffect(() => {
		const checkViewport = () => {
			setIsMobile(window.innerWidth < 768);
			setViewportWidth(window.innerWidth);
		};
		checkViewport();
		window.addEventListener('resize', checkViewport);
		return () => window.removeEventListener('resize', checkViewport);
	}, []);

	// Calculate card overlap based on viewport width and number of cards
	const getCardOverlap = () => {
		if (isMobile) {
			// On mobile, calculate overlap to fit all cards without scrolling
			const cardWidth = 140; // sm size width
			const availableWidth = viewportWidth - 32; // Account for padding
			const totalCardsWidth = cardWidth * totalCards;

			if (totalCardsWidth <= availableWidth) {
				// Cards fit without overlap
				return -20;
			}
			// Calculate negative margin to fit all cards
			const neededOverlap = (totalCardsWidth - availableWidth) / (totalCards - 1 || 1);
			return -Math.min(neededOverlap + 20, cardWidth - 40); // Don't overlap more than showing 40px of each card
		}
		// Desktop overlap
		return -40;
	};

	const cardOverlap = getCardOverlap();

	// Calculate rotation spread based on viewport
	const maxRotation = isMobile
		? Math.min(totalCards * 3, 20) // Subtler rotation on mobile
		: Math.min(totalCards * 5, 30);

	const zoomedCard = zoomedCardId
		? cards.find((c) => c.id === zoomedCardId)
		: null;

	const handleCardClick = (cardId: string) => {
		// Always zoom on click for readability
		setZoomedCardId(cardId);
	};

	const handlePlayCard = () => {
		if (zoomedCardId && isPlayable) {
			onCardClick?.(zoomedCardId);
			setZoomedCardId(null);
		}
	};

	const cardSize = isMobile ? 'sm' : 'md';
	const containerHeight = isMobile ? 230 : 320;

	return (
		<>
			{/* Card Hand Display */}
			<Box
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
						const yOffset = Math.abs(centerOffset) * (isMobile ? 6 : 10);
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
								style={{
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
									isSelected={isSelected}
									isPlayable={isPlayable}
									isHandHovered={isHovered}
									onClick={() => handleCardClick(card.id)}
									size={cardSize}
								/>
							</motion.div>
						);
					})}
				</Box>
			</Box>

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

								{/* Play button when it's player's turn */}
								{isPlayable ? (
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
										Play Card
									</Button>
								) : (
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 0.5 }}
										style={{
											color: 'white',
											fontSize: 14,
											margin: 0,
											marginTop: 8,
											textAlign: 'center',
											fontStyle: 'italic',
										}}
									>
										Wait for your turn to play
									</motion.p>
								)}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</Portal>
		</>
	);
}
