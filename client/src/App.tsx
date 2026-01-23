import {
  Alert,
  Box,
  Button,
  Center,
  Group,
  Kbd,
  Loader,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconAlertCircle, IconPlanet, IconRocket, IconStars } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { GameBoard } from './components/Game/GameBoard';
import { useGameRoom } from './hooks/useGameRoom';

// Star field background
function StarField() {
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
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

// Floating planet decoration
function FloatingPlanet({
  delay = 0,
  size = 60,
  color = '#e64980',
  top = '20%',
  left = '10%',
}: {
  delay?: number;
  size?: number;
  color?: string;
  top?: string;
  left?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.15,
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        y: { duration: 6, repeat: Infinity, repeatType: 'reverse', delay },
        rotate: { duration: 8, repeat: Infinity, repeatType: 'reverse', delay },
      }}
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
        filter: 'blur(1px)',
        pointerEvents: 'none',
      }}
    />
  );
}

function App() {
  const [playerName, setPlayerName] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const { gameState, isConnected, error, playerId, connect, sendMessage, clearError } =
    useGameRoom(playerName);

  const handleJoin = async () => {
    if (playerName.trim() && !isJoining) {
      setIsJoining(true);
      try {
        await connect();
        setHasJoined(true);
      } catch (err) {
        console.error('Failed to join:', err);
      } finally {
        setIsJoining(false);
      }
    }
  };

  // Handle successful connection
  useEffect(() => {
    if (isConnected && hasJoined) {
      setIsJoining(false);
    }
  }, [isConnected, hasJoined]);

  // Show join screen if not connected
  if (!hasJoined || !isConnected) {
    return (
      <Box
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <StarField />

        {/* Decorative floating planets */}
        <FloatingPlanet delay={0} size={80} color="#7950f2" top="15%" left="8%" />
        <FloatingPlanet delay={0.5} size={50} color="#e64980" top="70%" left="85%" />
        <FloatingPlanet delay={1} size={120} color="#fd7e14" top="80%" left="5%" />
        <FloatingPlanet delay={1.5} size={40} color="#339af0" top="25%" left="90%" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Paper
            shadow="xl"
            p="xl"
            radius="xl"
            style={{
              maxWidth: 480,
              width: '100%',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Stack gap="xl">
              {/* Logo and title */}
              <Center>
                <Stack align="center" gap="md">
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                  >
                    <ThemeIcon
                      size={90}
                      radius="xl"
                      variant="gradient"
                      gradient={{ from: 'violet', to: 'pink', deg: 135 }}
                      style={{
                        boxShadow: '0 0 40px rgba(121, 80, 242, 0.4)',
                      }}
                    >
                      <IconRocket size={45} stroke={1.5} />
                    </ThemeIcon>
                  </motion.div>

                  <Box ta="center">
                    <Title
                      order={1}
                      size="2rem"
                      fw={800}
                      style={{
                        background: 'linear-gradient(135deg, #fff 0%, #e5dbff 50%, #d0bfff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px',
                      }}
                    >
                      Backyard Rocketeers
                    </Title>
                    <Group gap={6} justify="center" mt={4}>
                      <IconStars size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
                      <Text c="dimmed" size="sm">
                        Race to Mars in this multiplayer card game
                      </Text>
                      <IconPlanet size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
                    </Group>
                  </Box>
                </Stack>
              </Center>

              {/* Error alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Alert
                      icon={<IconAlertCircle size={16} />}
                      title="Connection Error"
                      color="red"
                      variant="light"
                      radius="md"
                    >
                      {error}
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name input */}
              <Box>
                <TextInput
                  label={
                    <Text size="sm" c="dimmed" mb={4}>
                      Astronaut Name
                    </Text>
                  }
                  placeholder="Enter your call sign"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                  size="lg"
                  radius="md"
                  disabled={isJoining}
                  styles={{
                    input: {
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      '&:focus': {
                        borderColor: '#7950f2',
                      },
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                  }}
                />
                <Group gap={4} mt={6}>
                  <Text size="xs" c="dimmed">
                    Press
                  </Text>
                  <Kbd size="xs">Enter</Kbd>
                  <Text size="xs" c="dimmed">
                    to launch
                  </Text>
                </Group>
              </Box>

              {/* Join button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleJoin}
                  disabled={!playerName.trim() || isJoining}
                  size="xl"
                  fullWidth
                  radius="md"
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'pink', deg: 135 }}
                  leftSection={
                    isJoining ? <Loader size="sm" color="white" /> : <IconRocket size={22} />
                  }
                  styles={{
                    root: {
                      height: 56,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 20px rgba(121, 80, 242, 0.4)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        boxShadow: '0 6px 30px rgba(121, 80, 242, 0.6)',
                      },
                    },
                  }}
                >
                  {isJoining ? 'Launching...' : 'Launch Game'}
                </Button>
              </motion.div>

              {/* Connection status */}
              <Center>
                <Group gap={6}>
                  <Box
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isConnected ? '#40c057' : '#868e96',
                      boxShadow: isConnected ? '0 0 10px #40c057' : 'none',
                    }}
                  />
                  <Text size="xs" c="dimmed">
                    {isConnected ? 'Connected to mission control' : 'Ready to connect'}
                  </Text>
                </Group>
              </Center>
            </Stack>
          </Paper>

          {/* Version tag */}
          <Text size="xs" c="dimmed" ta="center" mt="md" style={{ opacity: 0.5 }}>
            v0.1.0 Alpha
          </Text>
        </motion.div>
      </Box>
    );
  }

  // Show game board when connected
  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      }}
    >
      <GameBoard
        gameState={gameState}
        playerId={playerId}
        onSendMessage={sendMessage}
        error={error}
        onClearError={clearError}
      />
    </Box>
  );
}

export default App;
