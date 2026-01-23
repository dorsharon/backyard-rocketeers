import type { Room } from 'colyseus.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { joinGameRoom, leaveGameRoom } from '../lib/colyseus';

interface GameMessage {
  type: string;
  data: any;
  timestamp: number;
}

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
  const [lastMessage, setLastMessage] = useState<GameMessage | null>(null);

  // Track if we've set up listeners to avoid duplicates
  const listenersSetUp = useRef(false);

  // Join room
  const connect = useCallback(async () => {
    try {
      setError(null);
      const newRoom = await joinGameRoom('game_room', { name: playerName });

      setRoom(newRoom);
      setIsConnected(true);

      // Only set up listeners once
      if (!listenersSetUp.current) {
        listenersSetUp.current = true;

        // Listen for welcome message to get player ID
        newRoom.onMessage('welcome', (message: any) => {
          console.log('[Game] Welcome:', message.message);
          setPlayerId(message.playerId);
          setLastMessage({ type: 'welcome', data: message, timestamp: Date.now() });
        });

        // Listen for error messages from server
        newRoom.onMessage('error', (message: any) => {
          console.error('[Game] Server error:', message);
          setError(message.message || 'An error occurred');
          setLastMessage({ type: 'error', data: message, timestamp: Date.now() });
        });

        // Listen for player ready
        newRoom.onMessage('player_ready', (message: any) => {
          console.log('[Game] Player ready:', message);
          setLastMessage({ type: 'player_ready', data: message, timestamp: Date.now() });
        });

        // Listen for all players ready
        newRoom.onMessage('all_players_ready', (message: any) => {
          console.log('[Game] All players ready!', message);
          setLastMessage({ type: 'all_players_ready', data: message, timestamp: Date.now() });
        });

        // Listen for game started
        newRoom.onMessage('game_started', (message: any) => {
          console.log('[Game] Game started:', message);
          setLastMessage({ type: 'game_started', data: message, timestamp: Date.now() });
        });

        // Listen for player joined
        newRoom.onMessage('player_joined', (message: any) => {
          console.log('[Game] Player joined:', message);
          setLastMessage({ type: 'player_joined', data: message, timestamp: Date.now() });
        });

        // Listen for player left
        newRoom.onMessage('player_left', (message: any) => {
          console.log('[Game] Player left:', message);
          setLastMessage({ type: 'player_left', data: message, timestamp: Date.now() });
        });

        // Listen for cards drawn
        newRoom.onMessage('cards_drawn', (message: any) => {
          console.log('[Game] Cards drawn:', message);
          setLastMessage({ type: 'cards_drawn', data: message, timestamp: Date.now() });
        });

        // Listen for card played
        newRoom.onMessage('card_played', (message: any) => {
          console.log('[Game] Card played:', message);
          setLastMessage({ type: 'card_played', data: message, timestamp: Date.now() });
        });

        // Listen for turn ended
        newRoom.onMessage('turn_ended', (message: any) => {
          console.log('[Game] Turn ended:', message);
          setLastMessage({ type: 'turn_ended', data: message, timestamp: Date.now() });
        });

        // Listen for phase change
        newRoom.onMessage('phase_change', (message: any) => {
          console.log('[Game] Phase changed:', message);
          setLastMessage({ type: 'phase_change', data: message, timestamp: Date.now() });
        });

        // Listen for dice rolls
        newRoom.onMessage('dice_roll', (message: any) => {
          console.log('[Game] Dice roll:', message);
          setLastMessage({ type: 'dice_roll', data: message, timestamp: Date.now() });
        });

        // Listen for game ended
        newRoom.onMessage('game_ended', (message: any) => {
          console.log('[Game] Game ended:', message);
          setLastMessage({ type: 'game_ended', data: message, timestamp: Date.now() });
        });

        // Listen for state changes
        newRoom.onStateChange((state: any) => {
          console.log('[Game] State changed');
          setGameState(state);
        });

        // Listen for room errors
        newRoom.onError((code: number, message?: string) => {
          console.error('[Game] Room error:', code, message);
          setError(message || `Connection error (code: ${code})`);
        });

        // Listen for room leave
        newRoom.onLeave((code: number) => {
          console.log('[Game] Left room with code:', code);
          setIsConnected(false);
          listenersSetUp.current = false;

          // Handle unexpected disconnection
          if (code !== 1000) {
            setError('Disconnected from server');
          }
        });
      }
    } catch (err: any) {
      console.error('[Game] Failed to connect:', err);
      setError(err.message || 'Failed to connect to server');
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
      setError(null);
      listenersSetUp.current = false;
    }
  }, [room]);

  // Send message to room
  const sendMessage = useCallback(
    (type: string, data: any = {}) => {
      if (room) {
        console.log('[Game] Sending message:', type, data);
        room.send(type, data);
      } else {
        console.error('[Game] Cannot send message: not connected to room');
        setError('Not connected to server');
      }
    },
    [room],
  );

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (room) {
        leaveGameRoom(room);
      }
    };
  }, [room]);

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [error]);

  return {
    room,
    gameState,
    isConnected,
    error,
    playerId,
    lastMessage,
    connect,
    disconnect,
    sendMessage,
    clearError,
  };
}
