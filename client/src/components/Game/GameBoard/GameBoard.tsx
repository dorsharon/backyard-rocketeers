import {
	Alert,
	Badge,
	Box,
	Button,
	Card,
	Grid,
	Group,
	Loader,
	SegmentedControl,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconAlertCircle, IconCards, IconHandStop } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { CardHand } from '../GameCard/CardHand';
import { LaunchSequence } from '../LaunchSequence/LaunchSequence';
import { RocketBuilder } from '../RocketBuilder/RocketBuilder';
import type { GamePhase } from '../../../types/game';
import type { GameBoardProps, GameStateData, LaunchSequenceState, PlayerData } from './GameBoard.types';
import { GameStatusHeader } from './GameStatusHeader';
import { PlayerCard } from './PlayerCard';
import { PreGameLobby } from './PreGameLobby';
import { StarField } from './StarField';
import { WinnerCelebration } from './WinnerCelebration';
import { YourStatusPanel } from './YourStatusPanel';

/**
 * Main game board component.
 * Displays the current game state and handles player actions.
 */
export function GameBoard({
	gameState,
	playerId,
	onSendMessage,
	error: externalError,
	onClearError,
	pendingAction,
}: GameBoardProps) {
	const [localError, setLocalError] = useState<string | null>(null);
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
	const [launchSequence, setLaunchSequence] = useState<LaunchSequenceState | null>(null);
	const [mobileTab, setMobileTab] = useState<string>('rocket');
	const [isMobile, setIsMobile] = useState(false);

	// Check if we're on mobile
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Combine external and local errors
	const error = externalError || localError;

	// Clear local errors after a timeout
	useEffect(() => {
		if (localError) {
			const timer = setTimeout(() => setLocalError(null), 3000);
			return () => clearTimeout(timer);
		}
		return undefined;
	}, [localError]);

	// gameState.players is a plain object after toJSON() conversion, not a Map
	const players: PlayerData[] = gameState?.players
		? Object.values(gameState.players)
		: [];

	// Check for launch sequence data in game state
	// This must be before any early returns to maintain hook order
	useEffect(() => {
		const launch = gameState?.launchSequence;
		if (launch?.isActive) {
			const launchingPlayer = players.find(
				(p) => p.sessionId === launch.playerId,
			);
			// Convert roll results to just the roll numbers for the LaunchSequence component
			const rollNumbers = (launch.rollResults || []).map((r) => r.roll);
			setLaunchSequence({
				isVisible: true,
				playerName: launchingPlayer?.name || 'Unknown',
				rollResults: rollNumbers,
				launchSuccess: launch.success || false,
				failureReason: launch.failureReason,
			});
		}
	}, [gameState?.launchSequence, players]);

	if (!gameState) {
		return (
			<Box
				style={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Stack align="center" gap="md">
					<Loader color="violet" size="lg" type="dots" />
					<Text c="dimmed">Connecting to mission control...</Text>
				</Stack>
			</Box>
		);
	}

	const currentPlayer = players.find((p) => p.sessionId === playerId);
	const currentTurnPlayerId = gameState.playerOrder?.[gameState.currentPlayerIndex];
	const currentTurnPlayer = players.find((p) => p.sessionId === currentTurnPlayerId);
	const isMyTurn = currentTurnPlayerId === playerId;

	// Wrapper for sending messages with error handling
	const handleSendMessage = (type: string, data?: Record<string, unknown>) => {
		setLocalError(null);
		if (onClearError) onClearError();
		onSendMessage(type, data);
	};

	// Handle clearing errors
	const handleClearError = () => {
		setLocalError(null);
		if (onClearError) onClearError();
	};

	// Pre-game lobby
	if (!gameState.gameStarted) {
		return (
			<Box
				style={{
					minHeight: '100vh',
					padding: '40px 20px',
					position: 'relative',
				}}
			>
				<StarField />
				<Box style={{ position: 'relative', zIndex: 1 }}>
					<PreGameLobby
						players={players}
						currentPlayer={currentPlayer}
						playerId={playerId}
						onReady={() => handleSendMessage('ready')}
						onStartGame={() => handleSendMessage('start_game')}
						pendingAction={pendingAction}
					/>
				</Box>
			</Box>
		);
	}

	// Winner screen
	if (gameState.gameEnded && gameState.winnerId) {
		const winner = players.find((p) => p.sessionId === gameState.winnerId);
		return <WinnerCelebration winnerName={winner?.name || 'Unknown'} />;
	}

	// Check if rocket can launch (using componentType for type-safe lookup)
	const components = currentPlayer?.rocketComponents || [];
	const canLaunch =
		(currentPlayer?.hasLaunchPad || false) &&
		(currentPlayer?.groundFuel || 0) >= 100 &&
		components.some((c) => c.componentType === 'fuselage') &&
		components.some((c) => c.componentType === 'nose_cone') &&
		components.some((c) => c.componentType === 'stabilizer_fins') &&
		components.some((c) => c.componentType === 'thruster');

	// Main game UI
	return (
		<Box
			style={{
				minHeight: '100vh',
				padding: isMobile ? '12px' : '20px',
				position: 'relative',
			}}
		>
			<StarField />

			{/* Launch Sequence Overlay */}
			<AnimatePresence>
				{launchSequence?.isVisible && (
					<LaunchSequence
						isVisible={launchSequence.isVisible}
						playerName={launchSequence.playerName}
						rollResults={launchSequence.rollResults}
						launchSuccess={launchSequence.launchSuccess}
						failureReason={launchSequence.failureReason}
						onComplete={() => setLaunchSequence(null)}
					/>
				)}
			</AnimatePresence>

			<Box style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto' }}>
				<Stack gap="lg">
					{/* Game Status Header */}
					<GameStatusHeader
						gameState={gameState}
						currentPlayerName={currentTurnPlayer?.name || 'Unknown'}
					/>

					{/* Error Alert */}
					<AnimatePresence>
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
							>
								<Alert
									color="red"
									icon={<IconAlertCircle size={16} />}
									withCloseButton
									onClose={handleClearError}
								>
									{error}
								</Alert>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Mobile Tab Navigation */}
					{isMobile && (
						<SegmentedControl
							value={mobileTab}
							onChange={setMobileTab}
							fullWidth
							size="sm"
							data={[
								{ label: 'Rocket', value: 'rocket' },
								{ label: 'Players', value: 'players' },
								{ label: 'Status', value: 'status' },
							]}
							styles={{
								root: {
									background: 'rgba(0, 0, 0, 0.3)',
									border: '1px solid rgba(255, 255, 255, 0.1)',
								},
								label: {
									color: 'rgba(255, 255, 255, 0.7)',
								},
							}}
						/>
					)}

					{/* Desktop: Grid Layout / Mobile: Tab Content */}
					{isMobile ? (
						<MobileLayout
							mobileTab={mobileTab}
							players={players}
							playerId={playerId}
							currentTurnPlayerId={currentTurnPlayerId}
							currentPlayer={currentPlayer}
							currentTurnPlayer={currentTurnPlayer}
							canLaunch={canLaunch}
							isMyTurn={isMyTurn}
							gameState={gameState}
							handleSendMessage={handleSendMessage}
							pendingAction={pendingAction}
						/>
					) : (
						<DesktopLayout
							players={players}
							playerId={playerId}
							currentTurnPlayerId={currentTurnPlayerId}
							currentPlayer={currentPlayer}
							currentTurnPlayer={currentTurnPlayer}
							canLaunch={canLaunch}
							isMyTurn={isMyTurn}
							gameState={gameState}
							handleSendMessage={handleSendMessage}
							pendingAction={pendingAction}
						/>
					)}

					{/* Your Hand */}
					{currentPlayer && currentPlayer.hand && currentPlayer.hand.length > 0 && (
						<Card
							padding={isMobile ? 'sm' : 'lg'}
							radius="lg"
							style={{
								background: 'rgba(0, 0, 0, 0.3)',
								backdropFilter: 'blur(10px)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
								marginTop: isMobile ? 8 : 16,
							}}
						>
							<Stack gap={isMobile ? 'xs' : 'md'}>
								<Group justify="space-between" wrap="wrap" gap="xs">
									<Title order={isMobile ? 6 : 5} c="white">
										Your Hand ({currentPlayer.hand.length})
									</Title>
									{selectedCardId && isMyTurn && gameState.currentPhase === 'action' && (
										<Group gap="xs">
											<Button
												size={isMobile ? 'xs' : 'sm'}
												variant="gradient"
												gradient={{ from: 'violet', to: 'pink' }}
												onClick={() => {
													handleSendMessage('play_card', { cardId: selectedCardId });
													setSelectedCardId(null);
												}}
												disabled={pendingAction === 'play_card'}
												loading={pendingAction === 'play_card'}
											>
												Play
											</Button>
											<Button
												size={isMobile ? 'xs' : 'sm'}
												variant="subtle"
												color="gray"
												onClick={() => setSelectedCardId(null)}
											>
												Cancel
											</Button>
										</Group>
									)}
								</Group>
								<CardHand
									cards={currentPlayer.hand.map((card) => ({
										id: card.id,
										name: card.name,
										type: card.type,
										effect: card.effect,
										description: card.description || 'No description available',
										strength: card.strength,
										tier: card.tier,
										isCovert: card.isCovert,
										isRevealed: card.isRevealed,
									}))}
									selectedCardId={selectedCardId}
									onCardClick={(cardId) => {
										if (isMyTurn && gameState.currentPhase === 'action') {
											setSelectedCardId(selectedCardId === cardId ? null : cardId);
										}
									}}
									isPlayable={isMyTurn && gameState.currentPhase === 'action'}
								/>
							</Stack>
						</Card>
					)}
				</Stack>
			</Box>
		</Box>
	);
}

// Mobile Layout Component
interface LayoutProps {
	players: PlayerData[];
	playerId: string | null;
	currentTurnPlayerId: string | undefined;
	currentPlayer: PlayerData | undefined;
	currentTurnPlayer: PlayerData | undefined;
	canLaunch: boolean;
	isMyTurn: boolean;
	gameState: GameStateData;
	handleSendMessage: (type: string, data?: Record<string, unknown>) => void;
	pendingAction?: string | null;
}

interface MobileLayoutProps extends LayoutProps {
	mobileTab: string;
}

function MobileLayout({
	mobileTab,
	players,
	playerId,
	currentTurnPlayerId,
	currentPlayer,
	currentTurnPlayer,
	canLaunch,
	isMyTurn,
	gameState,
	handleSendMessage,
	pendingAction,
}: MobileLayoutProps) {
	return (
		<Box>
			{mobileTab === 'players' && (
				<Stack gap="md">
					<Title order={5} c="white">
						Astronauts ({players.length})
					</Title>
					{players.map((player) => (
						<PlayerCard
							key={player.sessionId}
							player={player}
							isYou={player.sessionId === playerId}
							isCurrentTurn={player.sessionId === currentTurnPlayerId}
						/>
					))}
				</Stack>
			)}

			{mobileTab === 'rocket' && (
				<Stack gap="md">
					{currentPlayer && (
						<RocketBuilder
							hasLaunchPad={currentPlayer.hasLaunchPad || false}
							components={currentPlayer.rocketComponents || []}
							groundFuel={currentPlayer.groundFuel || 0}
							canLaunch={canLaunch}
							isMyTurn={isMyTurn}
							currentPhase={gameState.currentPhase}
							onLaunch={() => handleSendMessage('launch_rocket')}
							pendingAction={pendingAction}
						/>
					)}

					{/* Action Buttons */}
					<ActionButtons
						isMyTurn={isMyTurn}
						gameEnded={gameState.gameEnded}
						currentPhase={gameState.currentPhase}
						currentTurnPlayerName={currentTurnPlayer?.name}
						handleSendMessage={handleSendMessage}
						pendingAction={pendingAction}
						isMobile={true}
					/>
				</Stack>
			)}

			{mobileTab === 'status' && currentPlayer && <YourStatusPanel player={currentPlayer} />}
		</Box>
	);
}

function DesktopLayout({
	players,
	playerId,
	currentTurnPlayerId,
	currentPlayer,
	currentTurnPlayer,
	canLaunch,
	isMyTurn,
	gameState,
	handleSendMessage,
	pendingAction,
}: LayoutProps) {
	return (
		<Grid gutter="lg">
			{/* Left Panel - Players */}
			<Grid.Col span={{ base: 12, md: 4 }}>
				<Stack gap="md">
					<Title order={5} c="white">
						Astronauts ({players.length})
					</Title>
					{players.map((player) => (
						<PlayerCard
							key={player.sessionId}
							player={player}
							isYou={player.sessionId === playerId}
							isCurrentTurn={player.sessionId === currentTurnPlayerId}
						/>
					))}
				</Stack>
			</Grid.Col>

			{/* Middle Panel - Rocket Builder */}
			<Grid.Col span={{ base: 12, md: 5 }}>
				<Stack gap="md">
					{currentPlayer && (
						<RocketBuilder
							hasLaunchPad={currentPlayer.hasLaunchPad || false}
							components={currentPlayer.rocketComponents || []}
							groundFuel={currentPlayer.groundFuel || 0}
							canLaunch={canLaunch}
							isMyTurn={isMyTurn}
							currentPhase={gameState.currentPhase}
							onLaunch={() => handleSendMessage('launch_rocket')}
							pendingAction={pendingAction}
						/>
					)}

					{/* Action Buttons */}
					<ActionButtons
						isMyTurn={isMyTurn}
						gameEnded={gameState.gameEnded}
						currentPhase={gameState.currentPhase}
						currentTurnPlayerName={currentTurnPlayer?.name}
						handleSendMessage={handleSendMessage}
						pendingAction={pendingAction}
						isMobile={false}
					/>
				</Stack>
			</Grid.Col>

			{/* Right Panel - Your Status */}
			<Grid.Col span={{ base: 12, md: 3 }}>
				{currentPlayer && <YourStatusPanel player={currentPlayer} />}
			</Grid.Col>
		</Grid>
	);
}

// Action Buttons Component
interface ActionButtonsProps {
	isMyTurn: boolean;
	gameEnded: boolean;
	currentPhase: GamePhase;
	currentTurnPlayerName?: string;
	handleSendMessage: (type: string, data?: Record<string, unknown>) => void;
	pendingAction?: string | null;
	isMobile: boolean;
}

function ActionButtons({
	isMyTurn,
	gameEnded,
	currentPhase,
	currentTurnPlayerName,
	handleSendMessage,
	pendingAction,
	isMobile,
}: ActionButtonsProps) {
	return (
		<Card
			padding={isMobile ? 'md' : 'lg'}
			radius="lg"
			style={{
				background: 'rgba(0, 0, 0, 0.3)',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.1)',
			}}
		>
			<Stack gap={isMobile ? 'sm' : 'md'} align="center">
				{isMyTurn && !gameEnded && (
					<Group gap={isMobile ? 'sm' : 'md'}>
						{currentPhase === 'draw' && (
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Button
									size={isMobile ? 'md' : 'lg'}
									variant="gradient"
									gradient={{ from: 'blue', to: 'cyan' }}
									leftSection={<IconCards size={isMobile ? 18 : 20} />}
									onClick={() => handleSendMessage('draw_card')}
									disabled={pendingAction === 'draw_card'}
									loading={pendingAction === 'draw_card'}
								>
									Draw Card
								</Button>
							</motion.div>
						)}

						{currentPhase === 'action' && (
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Button
									size={isMobile ? 'md' : 'lg'}
									variant="gradient"
									gradient={{ from: 'green', to: 'teal' }}
									leftSection={<IconHandStop size={isMobile ? 18 : 20} />}
									onClick={() => handleSendMessage('end_turn')}
									disabled={pendingAction === 'end_turn'}
									loading={pendingAction === 'end_turn'}
								>
									End Turn
								</Button>
							</motion.div>
						)}
					</Group>
				)}

				{!isMyTurn && !gameEnded && (
					<Badge size={isMobile ? 'md' : 'lg'} variant="light" color="gray">
						Waiting for {currentTurnPlayerName}'s turn...
					</Badge>
				)}
			</Stack>
		</Card>
	);
}
