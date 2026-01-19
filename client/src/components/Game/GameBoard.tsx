interface GameBoardProps {
  gameState: any;
  playerId: string | null;
  onSendMessage: (type: string, data?: any) => void;
}

/**
 * Main game board component.
 * Displays the current game state and handles player actions.
 */
export function GameBoard({ gameState, playerId, onSendMessage }: GameBoardProps) {
  if (!gameState) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading game state...</p>
      </div>
    );
  }

  const players = Array.from(gameState.players?.values() || []);
  const currentPlayer = players.find((p: any) => p.sessionId === playerId);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Backyard Rocketeers</h1>

      {/* Game Status */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f0f0f0", borderRadius: "8px" }}>
        <h3>Game Status</h3>
        <p>Game Started: {gameState.gameStarted ? "Yes" : "No"}</p>
        <p>Game Ended: {gameState.gameEnded ? "Yes" : "No"}</p>
        <p>Current Phase: {gameState.currentPhase}</p>
        <p>Turn Count: {gameState.turnCount}</p>
        {gameState.gameEnded && gameState.winnerId && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Winner: {players.find((p: any) => p.sessionId === gameState.winnerId)?.name}
          </p>
        )}
      </div>

      {/* Player List */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Players ({players.length})</h3>
        <div style={{ display: "grid", gap: "10px" }}>
          {players.map((player: any) => (
            <div
              key={player.sessionId}
              style={{
                padding: "10px",
                background: player.sessionId === playerId ? "#e3f2fd" : "#f5f5f5",
                borderRadius: "4px",
                border: player.sessionId === playerId ? "2px solid #2196f3" : "1px solid #ddd",
              }}
            >
              <strong>{player.name}</strong>
              {player.sessionId === playerId && <span> (You)</span>}
              <div style={{ fontSize: "0.9em", color: "#666", marginTop: "5px" }}>
                Level: {player.level} |
                Ready: {player.isReady ? "✓" : "✗"} |
                Hand: {player.hand?.length || 0} cards
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Player Info */}
      {currentPlayer && (
        <div style={{ marginBottom: "20px", padding: "15px", background: "#e8f5e9", borderRadius: "8px" }}>
          <h3>Your Info</h3>
          <p>Level: {currentPlayer.level}</p>
          <p>Ground Fuel: {currentPlayer.groundFuel}%</p>
          <p>Has Launch Pad: {currentPlayer.hasLaunchPad ? "Yes" : "No"}</p>
          <p>Rocket Components: {currentPlayer.rocketComponents?.length || 0}</p>
          <p>Hand: {currentPlayer.hand?.length || 0} cards</p>
        </div>
      )}

      {/* Game Controls */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {!gameState.gameStarted && (
          <>
            <button
              onClick={() => onSendMessage("ready")}
              style={{
                padding: "10px 20px",
                background: currentPlayer?.isReady ? "#4caf50" : "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              disabled={currentPlayer?.isReady}
            >
              {currentPlayer?.isReady ? "Ready ✓" : "Mark Ready"}
            </button>

            <button
              onClick={() => onSendMessage("start_game")}
              style={{
                padding: "10px 20px",
                background: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Start Game
            </button>
          </>
        )}

        {gameState.gameStarted && !gameState.gameEnded && (
          <>
            {gameState.currentPhase === "draw" && (
              <button
                onClick={() => onSendMessage("draw_card")}
                style={{
                  padding: "10px 20px",
                  background: "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Draw Card
              </button>
            )}

            {gameState.currentPhase === "action" && (
              <button
                onClick={() => onSendMessage("end_turn")}
                style={{
                  padding: "10px 20px",
                  background: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                End Turn
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
