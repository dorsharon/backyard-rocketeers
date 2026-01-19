import { useState } from "react";
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Stack,
  Alert,
  Box,
  Center,
} from "@mantine/core";
import { IconRocket, IconAlertCircle } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useGameRoom } from "./hooks/useGameRoom";
import { GameBoard } from "./components/Game/GameBoard";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  const { gameState, isConnected, error, playerId, connect, sendMessage } =
    useGameRoom(playerName);

  const handleJoin = async () => {
    if (playerName.trim()) {
      await connect();
      setHasJoined(true);
    }
  };

  // Show join screen if not connected
  if (!hasJoined || !isConnected) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            shadow="xl"
            p="xl"
            radius="lg"
            style={{ maxWidth: 450, width: "100%" }}
          >
            <Stack gap="lg">
              <Center>
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 5, 0],
                    scale: [1, 1.05, 1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <IconRocket size={64} stroke={1.5} color="#7950f2" />
                </motion.div>
              </Center>

              <div>
                <Title order={1} ta="center" mb="xs">
                  Backyard Rocketeers
                </Title>
                <Text c="dimmed" size="sm" ta="center">
                  Race to Mars in this multiplayer card game
                </Text>
              </div>

              {error && (
                <Alert
                  icon={<IconAlertCircle size={16} />}
                  title="Connection Error"
                  color="red"
                >
                  {error}
                </Alert>
              )}

              <TextInput
                label="Player Name"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                size="md"
                required
              />

              <Button
                onClick={handleJoin}
                disabled={!playerName.trim() || isConnected}
                size="lg"
                fullWidth
                loading={isConnected && !hasJoined}
              >
                {isConnected && !hasJoined ? "Joining..." : "Launch Game"}
              </Button>

              <Text size="xs" c="dimmed" ta="center">
                {isConnected ? "✓ Connected to server" : "Ready to connect"}
              </Text>
            </Stack>
          </Paper>
        </motion.div>
      </Box>
    );
  }

  // Show game board when connected
  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
      }}
    >
      <GameBoard
        gameState={gameState}
        playerId={playerId}
        onSendMessage={sendMessage}
      />
    </Box>
  );
}

export default App;
