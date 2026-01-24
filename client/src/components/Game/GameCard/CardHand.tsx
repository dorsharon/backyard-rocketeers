import { Box, Group } from '@mantine/core';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { GameCard } from './GameCard';
import type { CardHandProps } from './GameCard.types';

export function CardHand({ cards, selectedCardId, onCardClick, isPlayable = true }: CardHandProps) {
	const totalCards = cards.length;
	const maxRotation = Math.min(totalCards * 5, 30); // Max 30 degrees total spread
	const [isMobile, setIsMobile] = useState(false);

	// Check if we're on mobile
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Mobile layout: horizontal scrollable list
	if (isMobile) {
		return (
			<Box
				style={{
					width: '100%',
					overflowX: 'auto',
					overflowY: 'hidden',
					WebkitOverflowScrolling: 'touch',
					paddingBottom: 8,
					paddingTop: 8,
				}}
			>
				<Group
					gap="sm"
					wrap="nowrap"
					style={{
						padding: '0 8px',
						minWidth: 'min-content',
					}}
				>
					{cards.map((card) => {
						const isSelected = card.id === selectedCardId;
						return (
							<motion.div
								key={card.id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{
									opacity: 1,
									scale: isSelected ? 1.05 : 1,
								}}
								transition={{ duration: 0.2 }}
								style={{
									flexShrink: 0,
									border: isSelected ? '2px solid #7950f2' : 'none',
									borderRadius: 14,
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
									onClick={() => onCardClick?.(card.id)}
									size="sm"
								/>
							</motion.div>
						);
					})}
				</Group>
			</Box>
		);
	}

	// Desktop layout: fan display
	return (
		<Group
			gap={0}
			justify="center"
			style={{
				position: 'relative',
				height: 280,
				paddingTop: 20,
			}}
		>
			{cards.map((card, index) => {
				const centerOffset = index - (totalCards - 1) / 2;
				const rotation = (centerOffset / Math.max(totalCards - 1, 1)) * maxRotation;
				const yOffset = Math.abs(centerOffset) * 10;
				const isSelected = card.id === selectedCardId;

				return (
					<motion.div
						key={card.id}
						initial={{ opacity: 0, y: 50 }}
						animate={{
							opacity: 1,
							y: isSelected ? -20 : yOffset,
							rotate: rotation,
							scale: isSelected ? 1.1 : 1,
							zIndex: isSelected ? 100 : totalCards - Math.abs(centerOffset),
						}}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 25,
						}}
						whileHover={{
							y: -20,
							scale: 1.1,
							zIndex: 100,
							transition: { duration: 0.2 },
						}}
						style={{
							marginLeft: index === 0 ? 0 : -40,
							transformOrigin: 'bottom center',
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
							onClick={() => onCardClick?.(card.id)}
							size="md"
						/>
					</motion.div>
				);
			})}
		</Group>
	);
}
