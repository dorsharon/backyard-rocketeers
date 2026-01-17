import { useState, useEffect, useCallback } from "react";
import { Room } from "colyseus.js";
import { joinGameRoom, leaveGameRoom } from "../lib/colyseus";

/**
 * Custom hook for managing Colyseus game room connection.
 * Handles joining, state sync, and cleanup.
 */
export function useGameRoom(playerName: string) {
  const [room, setRoom] = useState<Room | null>(null);
  const [gameState, setGameState] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  // Join room
  const connect = useCallback(async () => {
    try {
      setError(null);
      const newRoom = await joinGameRoom("game_room", { name: playerName });

      setRoom(newRoom);
      setIsConnected(true);

      // Listen for welcome message to get player ID
      newRoom.onMessage("welcome", (message: any) => {
        console.log(message.message);
        setPlayerId(message.playerId);
      });

      // Listen for state changes
      newRoom.onStateChange((state: any) => {
        setGameState(state);
      });

      // Listen for errors
      newRoom.onError((code: number, message: string) => {
        console.error("Room error:", code, message);
        setError(message);
      });

      // Listen for room leave
      newRoom.onLeave((code: number) => {
        console.log("Left room with code:", code);
        setIsConnected(false);
      });

    } catch (err: any) {
      console.error("Failed to connect:", err);
      setError(err.message || "Failed to connect to server");
      setIsConnected(false);
    }
  }, [playerName]);

  // Disconnect from room
  const disconnect = useCallback(async () => {
    if (room) {
      await leaveGameRoom(room);
      setRoom(null);
      setIsConnected(false);
      setGameState(null);
      setPlayerId(null);
    }
  }, [room]);

  // Send message to room
  const sendMessage = useCallback((type: string, data: any = {}) => {
    if (room) {
      room.send(type, data);
    } else {
      console.error("Cannot send message: not connected to room");
    }
  }, [room]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (room) {
        leaveGameRoom(room);
      }
    };
  }, [room]);

  return {
    room,
    gameState,
    isConnected,
    error,
    playerId,
    connect,
    disconnect,
    sendMessage
  };
}
