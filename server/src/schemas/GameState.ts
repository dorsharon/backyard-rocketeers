import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { Player } from "./Player";
import { CardSchema } from "./CardSchema";

/**
 * GameState schema - the authoritative game state.
 * Synchronized to all clients via Colyseus.
 *
 * See GAME_RULES.md for complete game state requirements.
 */
export class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type("number") currentPlayerIndex: number = 0;
  @type("number") currentLevel: number = 1; // Global game level (1, 2, or 3)
  @type("number") turnCount: number = 0;
  @type("boolean") gameStarted: boolean = false;
  @type("boolean") gameEnded: boolean = false;
  @type("string") winnerId: string = "";

  // Turn phases
  @type("string") currentPhase: "draw" | "action" | "discard" | "waiting" = "waiting";

  // Deck tracking (not synced to clients - server-side only)
  level1Deck: CardSchema[] = [];
  level2Deck: CardSchema[] = [];
  level3Deck: CardSchema[] = [];

  level1Discard: CardSchema[] = [];
  level2Discard: CardSchema[] = [];
  level3Discard: CardSchema[] = [];

  // Player order (session IDs in turn order)
  @type(["string"]) playerOrder = new ArraySchema<string>();

  /**
   * Get the current player whose turn it is.
   */
  getCurrentPlayer(): Player | undefined {
    if (this.playerOrder.length === 0) {
      return undefined;
    }
    const sessionId = this.playerOrder[this.currentPlayerIndex];
    if (!sessionId) return undefined;
    return this.players.get(sessionId);
  }

  /**
   * Get the next player in turn order.
   */
  getNextPlayer(): Player | undefined {
    if (this.playerOrder.length === 0) {
      return undefined;
    }
    const nextIndex = (this.currentPlayerIndex + 1) % this.playerOrder.length;
    const sessionId = this.playerOrder[nextIndex];
    if (!sessionId) return undefined;
    return this.players.get(sessionId);
  }

  /**
   * Advance to the next player's turn.
   */
  nextTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerOrder.length;
    this.turnCount++;
    this.currentPhase = "draw";
  }

  /**
   * Get the highest level any player has reached.
   */
  getHighestLevel(): number {
    let maxLevel = 1;
    this.players.forEach(player => {
      if (player.level > maxLevel) {
        maxLevel = player.level;
      }
    });
    return maxLevel;
  }

  /**
   * Check if a player is behind the leader by 1+ levels (for comeback mechanic).
   */
  isPlayerBehind(player: Player): boolean {
    const highestLevel = this.getHighestLevel();
    return player.level < highestLevel;
  }
}
