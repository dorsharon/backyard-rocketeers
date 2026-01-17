import { Client, Room } from "colyseus.js";

// Colyseus client configuration
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "ws://localhost:2567";

let client: Client | null = null;

/**
 * Get or create the Colyseus client instance.
 * This is a singleton to ensure we only have one connection.
 */
export function getColyseusClient(): Client {
  if (!client) {
    client = new Client(SERVER_URL);
    console.log(`Colyseus client created: ${SERVER_URL}`);
  }
  return client;
}

/**
 * Join or create a game room.
 * @param roomName The room type to join (e.g., "game_room")
 * @param options Join options (e.g., player name)
 */
export async function joinGameRoom(roomName: string, options: any = {}): Promise<Room> {
  const client = getColyseusClient();

  try {
    // Try to join an existing room
    const room = await client.joinOrCreate(roomName, options);
    console.log(`Joined room: ${room.id}`);
    return room;
  } catch (error) {
    console.error("Failed to join room:", error);
    throw error;
  }
}

/**
 * Leave a game room.
 */
export async function leaveGameRoom(room: Room): Promise<void> {
  try {
    await room.leave();
    console.log("Left room");
  } catch (error) {
    console.error("Error leaving room:", error);
  }
}
