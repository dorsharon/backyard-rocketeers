import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Loader,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCards,
  IconCheck,
  IconCircleCheck,
  IconCircleDashed,
  IconClock,
  IconFlame,
  IconHandStop,
  IconPlayerPlay,
  IconRocket,
  IconTrophy,
  IconUser,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface GameBoardProps {
  gameState: any;
  playerId: string | null;
  onSendMessage: (type: string, data?: any) => void;
  error?: string | null;
  onClearError?: () => void;
}

interface PlayerData {
  sessionId: string;
  name: string;
  level: number;
  isReady: boolean;
  hand?: any[];
  groundFuel?: number;
  hasLaunchPad?: boolean;
  rocketComponents?: any[];
}

// Star background component
function StarField() {
  const [stars] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })),
  );

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {stars.map((star) => (
        <Box
          key={star.id}
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            background: 'white',
            borderRadius: '50%',
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </Box>
  );
}

// Player card component
function PlayerCard({
  player,
  isYou,
  isCurrentTurn,
}: {
  player: PlayerData;
  isYou: boolean;
  isCurrentTurn: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        padding="md"
        radius="lg"
        style={{
          background: isYou
            ? 'linear-gradient(135deg, rgba(121, 80, 242, 0.2) 0%, rgba(121, 80, 242, 0.05) 100%)'
            : 'rgba(255, 255, 255, 0.03)',
          border: isCurrentTurn
            ? '2px solid #7950f2'
            : isYou
              ? '1px solid rgba(121, 80, 242, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isCurrentTurn && (
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #7950f2, #e64980, #fd7e14)',
              animation: 'shimmer 2s linear infinite',
              backgroundSize: '200% 100%',
            }}
          />
        )}

        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Avatar
              radius="xl"
              size="md"
              color={isYou ? 'violet' : 'gray'}
              variant={isYou ? 'filled' : 'light'}
            >
              <IconUser size={18} />
            </Avatar>
            <Box>
              <Group gap="xs">
                <Text fw={600} size="sm" c="white">
                  {player.name}
                </Text>
                {isYou && (
                  <Badge size="xs" variant="light" color="violet">
                    You
                  </Badge>
                )}
                {isCurrentTurn && (
                  <Badge
                    size="xs"
                    variant="filled"
                    color="orange"
                    leftSection={<IconPlayerPlay size={10} />}
                  >
                    Turn
                  </Badge>
                )}
              </Group>
              <Group gap="xs" mt={4}>
                <Badge size="xs" variant="outline" color="blue">
                  Level {player.level}
                </Badge>
                {player.isReady ? (
                  <Badge
                    size="xs"
                    variant="light"
                    color="green"
                    leftSection={<IconCheck size={10} />}
                  >
                    Ready
                  </Badge>
                ) : (
                  <Badge
                    size="xs"
                    variant="light"
                    color="yellow"
                    leftSection={<IconClock size={10} />}
                  >
                    Waiting
                  </Badge>
                )}
              </Group>
            </Box>
          </Group>

          <Tooltip label={`${player.hand?.length || 0} cards in hand`}>
            <Group gap={4}>
              <IconCards size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
              <Text size="sm" c="dimmed">
                {player.hand?.length || 0}
              </Text>
            </Group>
          </Tooltip>
        </Group>
      </Card>
    </motion.div>
  );
}

// Game status header
function GameStatusHeader({
  gameState,
  currentPlayerName,
}: {
  gameState: any;
  currentPlayerName: string;
}) {
  const getPhaseInfo = () => {
    switch (gameState.currentPhase) {
      case 'draw':
        return { label: 'Draw Phase', color: 'blue', icon: IconCards };
      case 'action':
        return { label: 'Action Phase', color: 'green', icon: IconPlayerPlay };
      default:
        return { label: 'Waiting', color: 'gray', icon: IconClock };
    }
  };

  const phase = getPhaseInfo();
  const PhaseIcon = phase.icon;

  return (
    <Paper
      p="md"
      radius="lg"
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Group justify="space-between" wrap="wrap">
        <Group gap="md">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            <ThemeIcon
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{ from: 'violet', to: 'pink' }}
            >
              <IconRocket size={20} />
            </ThemeIcon>
          </motion.div>
          <Box>
            <Title order={4} c="white">
              Backyard Rocketeers
            </Title>
            <Text size="xs" c="dimmed">
              Turn {gameState.turnCount} | {currentPlayerName}'s turn
            </Text>
          </Box>
        </Group>

        <Group gap="sm">
          <Badge
            size="lg"
            variant="light"
            color={phase.color}
            leftSection={<PhaseIcon size={14} />}
            styles={{
              root: {
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              },
            }}
          >
            {phase.label}
          </Badge>
        </Group>
      </Group>
    </Paper>
  );
}

// Your status panel
function YourStatusPanel({ player }: { player: PlayerData }) {
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

// Pre-game lobby component
function PreGameLobby({
  players,
  currentPlayer,
  playerId,
  onReady,
  onStartGame,
}: {
  players: PlayerData[];
  currentPlayer: PlayerData | undefined;
  playerId: string | null;
  onReady: () => void;
  onStartGame: () => void;
}) {
  const allReady = players.length >= 2 && players.every((p) => p.isReady);
  const readyCount = players.filter((p) => p.isReady).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        padding="xl"
        radius="xl"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: 500,
          margin: '0 auto',
        }}
      >
        <Stack gap="xl" align="center">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <ThemeIcon
              size={80}
              radius="xl"
              variant="gradient"
              gradient={{ from: 'violet', to: 'pink', deg: 135 }}
            >
              <IconRocket size={40} />
            </ThemeIcon>
          </motion.div>

          <Box ta="center">
            <Title order={2} c="white" mb="xs">
              Mission Briefing
            </Title>
            <Text c="dimmed" size="sm">
              Waiting for astronauts to report for duty
            </Text>
          </Box>

          <Box w="100%">
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">
                Ready Status
              </Text>
              <Text size="sm" c="white" fw={600}>
                {readyCount}/{players.length} Ready
              </Text>
            </Group>
            <Progress
              value={(readyCount / Math.max(players.length, 2)) * 100}
              color={allReady ? 'green' : 'violet'}
              size="lg"
              radius="xl"
              animated
            />
          </Box>

          <Stack gap="xs" w="100%">
            {players.map((player) => (
              <Paper
                key={player.sessionId}
                p="sm"
                radius="md"
                style={{
                  background:
                    player.sessionId === playerId
                      ? 'rgba(121, 80, 242, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)',
                  border:
                    player.sessionId === playerId
                      ? '1px solid rgba(121, 80, 242, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <Group justify="space-between">
                  <Group gap="sm">
                    <Avatar size="sm" color="violet" radius="xl">
                      {player.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Text size="sm" c="white" fw={500}>
                      {player.name}
                      {player.sessionId === playerId && (
                        <Text span c="dimmed" size="xs" ml={4}>
                          (You)
                        </Text>
                      )}
                    </Text>
                  </Group>
                  <AnimatePresence mode="wait">
                    {player.isReady ? (
                      <motion.div
                        key="ready"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <ThemeIcon color="green" size="sm" radius="xl">
                          <IconCircleCheck size={14} />
                        </ThemeIcon>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="waiting"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <ThemeIcon color="gray" size="sm" radius="xl" variant="light">
                          <IconCircleDashed size={14} />
                        </ThemeIcon>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Group>
              </Paper>
            ))}
          </Stack>

          {players.length < 2 && (
            <Alert
              color="yellow"
              variant="light"
              icon={<IconAlertCircle size={16} />}
              style={{ width: '100%' }}
            >
              Need at least 2 players to start the mission
            </Alert>
          )}

          <Group gap="sm" w="100%">
            <Button
              flex={1}
              size="lg"
              variant={currentPlayer?.isReady ? 'light' : 'gradient'}
              gradient={{ from: 'violet', to: 'pink' }}
              onClick={onReady}
              disabled={currentPlayer?.isReady}
              leftSection={currentPlayer?.isReady ? <IconCheck size={18} /> : undefined}
            >
              {currentPlayer?.isReady ? 'Ready!' : 'Mark Ready'}
            </Button>

            <Button
              flex={1}
              size="lg"
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
              onClick={onStartGame}
              disabled={!allReady || players.length < 2}
              leftSection={<IconRocket size={18} />}
            >
              Launch Mission
            </Button>
          </Group>
        </Stack>
      </Card>
    </motion.div>
  );
}

// Winner celebration component
function WinnerCelebration({ winnerName }: { winnerName: string }) {
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
}: GameBoardProps) {
  const [localError, setLocalError] = useState<string | null>(null);

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

  const players: PlayerData[] = Array.from(gameState.players?.values() || []);
  const currentPlayer = players.find((p) => p.sessionId === playerId);
  const currentTurnPlayerId = gameState.playerOrder?.[gameState.currentPlayerIndex];
  const currentTurnPlayer = players.find((p) => p.sessionId === currentTurnPlayerId);
  const isMyTurn = currentTurnPlayerId === playerId;

  // Wrapper for sending messages with error handling
  const handleSendMessage = (type: string, data?: any) => {
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

  // Main game UI
  return (
    <Box
      style={{
        minHeight: '100vh',
        padding: '20px',
        position: 'relative',
      }}
    >
      <StarField />

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

            {/* Middle Panel - Game Area */}
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Card
                padding="lg"
                radius="lg"
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minHeight: 400,
                }}
              >
                <Stack gap="lg" align="center" justify="center" style={{ height: '100%' }}>
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  >
                    <ThemeIcon
                      size={100}
                      radius="xl"
                      variant="gradient"
                      gradient={{ from: 'violet', to: 'pink', deg: 135 }}
                    >
                      <IconRocket size={50} />
                    </ThemeIcon>
                  </motion.div>

                  <Text c="dimmed" ta="center">
                    Build your rocket and race to Mars!
                  </Text>

                  {/* Action Buttons */}
                  {isMyTurn && !gameState.gameEnded && (
                    <Group gap="md">
                      {gameState.currentPhase === 'draw' && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="lg"
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'cyan' }}
                            leftSection={<IconCards size={20} />}
                            onClick={() => handleSendMessage('draw_card')}
                          >
                            Draw Card
                          </Button>
                        </motion.div>
                      )}

                      {gameState.currentPhase === 'action' && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="lg"
                            variant="gradient"
                            gradient={{ from: 'green', to: 'teal' }}
                            leftSection={<IconHandStop size={20} />}
                            onClick={() => handleSendMessage('end_turn')}
                          >
                            End Turn
                          </Button>
                        </motion.div>
                      )}
                    </Group>
                  )}

                  {!isMyTurn && !gameState.gameEnded && (
                    <Badge size="lg" variant="light" color="gray">
                      Waiting for {currentTurnPlayer?.name}'s turn...
                    </Badge>
                  )}
                </Stack>
              </Card>
            </Grid.Col>

            {/* Right Panel - Your Status */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              {currentPlayer && <YourStatusPanel player={currentPlayer} />}
            </Grid.Col>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}
