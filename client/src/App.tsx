import { useState } from "react";
import { useGameRoom } from "./hooks/useGameRoom";
import { GameBoard } from "./components/Game/GameBoard";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  const { gameState, isConnected, error, playerId, connect, sendMessage } = useGameRoom(playerName);

  const handleJoin = async () => {
    if (playerName.trim()) {
      await connect();
      setHasJoined(true);
    }
  };

  // Show join screen if not connected
  if (!hasJoined || !isConnected) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            background: "white",
            color: "#333",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <h1 style={{ marginBottom: "10px", fontSize: "2em" }}>🚀 Backyard Rocketeers</h1>
          <p style={{ marginBottom: "30px", color: "#666" }}>
            A multiplayer card game - race to Mars!
          </p>

          {error && (
            <div
              style={{
                padding: "10px",
                background: "#ffebee",
                color: "#c62828",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
              Player Name:
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              onKeyPress={(e) => e.key === "Enter" && handleJoin()}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "1em",
                border: "2px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={handleJoin}
            disabled={!playerName.trim()}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "1.1em",
              background: playerName.trim() ? "#667eea" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: playerName.trim() ? "pointer" : "not-allowed",
              fontWeight: "bold",
            }}
          >
            {isConnected ? "Connecting..." : "Join Game"}
          </button>

          <div style={{ marginTop: "20px", fontSize: "0.9em", color: "#999", textAlign: "center" }}>
            {isConnected ? "✓ Connected" : "Ready to play"}
          </div>
        </div>
      </div>
    );
  }

  // Show game board when connected
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <GameBoard gameState={gameState} playerId={playerId} onSendMessage={sendMessage} />
    </div>
  );
}

export default App;
