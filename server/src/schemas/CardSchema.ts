import { Schema, type } from "@colyseus/schema";

/**
 * CardSchema represents a card in a player's hand or on the board.
 * Synchronized across all clients via Colyseus.
 */
export class CardSchema extends Schema {
  @type("string") id: string = "";
  @type("string") name: string = "";
  @type("string") type: "component" | "sabotage" | "ability" | "enhancement" = "component";
  @type("string") description: string = "";
  @type("boolean") isCovert: boolean = false;
  @type("boolean") isRevealed: boolean = false;

  // For components: strength value (0-3)
  @type("number") strength: number = 0;

  // For components: tier (improvised=1, second-hand=2, cutting-edge=3)
  @type("number") tier: number = 0;

  constructor(
    id: string,
    name: string,
    cardType: "component" | "sabotage" | "ability" | "enhancement",
    description: string = "",
    isCovert: boolean = false,
    strength: number = 0,
    tier: number = 0
  ) {
    super();
    this.id = id;
    this.name = name;
    this.type = cardType;
    this.description = description;
    this.isCovert = isCovert;
    this.isRevealed = !isCovert; // Non-covert cards are always revealed
    this.strength = strength;
    this.tier = tier;
  }
}
