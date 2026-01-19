import { Card } from "./Card";
import { CardSchema } from "../schemas/CardSchema";

// Import all card implementations
import { LaunchPadCard } from "./implementations/LaunchPadCard";
import {
  ImprovisedFuselageCard,
  SecondHandFuselageCard,
  CuttingEdgeFuselageCard,
} from "./implementations/FuselageCards";
import {
  ImprovisedNoseConeCard,
  SecondHandNoseConeCard,
  CuttingEdgeNoseConeCard,
} from "./implementations/NoseConeCards";
import {
  ImprovisedStabilizerFinsCard,
  SecondHandStabilizerFinsCard,
  CuttingEdgeStabilizerFinsCard,
} from "./implementations/StabilizerFinsCards";
import {
  ImprovisedThrusterCard,
  SecondHandThrusterCard,
  CuttingEdgeThrusterCard,
} from "./implementations/ThrusterCards";
import {
  SmallFuelTankCard,
  LargeFuelTankCard,
  ExtraLargeFuelTankCard,
} from "./implementations/FuelTankCards";
import { ShootRPGCard } from "./implementations/ShootRPGCard";
import { PlantBombCard } from "./implementations/PlantBombCard";

/**
 * CardRegistry - Creates and manages all card instances.
 * Generates decks with proper quantities per CARDS_CATALOG.md.
 *
 * See CARDS_CATALOG.md for complete card list and quantities.
 */
export class CardRegistry {
  private static level1Cards: Array<{ card: Card; quantity: number }> = [
    // Launch Pad (6 copies)
    { card: new LaunchPadCard(), quantity: 6 },

    // Fuselage (13 total: 6 improvised, 4 second-hand, 3 cutting edge)
    { card: new ImprovisedFuselageCard(), quantity: 6 },
    { card: new SecondHandFuselageCard(), quantity: 4 },
    { card: new CuttingEdgeFuselageCard(), quantity: 3 },

    // Nose Cone (13 total: 6 improvised, 4 second-hand, 3 cutting edge)
    { card: new ImprovisedNoseConeCard(), quantity: 6 },
    { card: new SecondHandNoseConeCard(), quantity: 4 },
    { card: new CuttingEdgeNoseConeCard(), quantity: 3 },

    // Stabilizer Fins (11 total: 4 improvised, 4 second-hand, 3 cutting edge)
    { card: new ImprovisedStabilizerFinsCard(), quantity: 4 },
    { card: new SecondHandStabilizerFinsCard(), quantity: 4 },
    { card: new CuttingEdgeStabilizerFinsCard(), quantity: 3 },

    // Thruster (11 total: 4 improvised, 4 second-hand, 3 cutting edge)
    { card: new ImprovisedThrusterCard(), quantity: 4 },
    { card: new SecondHandThrusterCard(), quantity: 4 },
    { card: new CuttingEdgeThrusterCard(), quantity: 3 },

    // Fuel Tanks (12 total: 5 small, 4 large, 3 XL)
    { card: new SmallFuelTankCard(), quantity: 5 },
    { card: new LargeFuelTankCard(), quantity: 4 },
    { card: new ExtraLargeFuelTankCard(), quantity: 3 },

    // Sabotage cards
    { card: new ShootRPGCard(), quantity: 3 },
    { card: new PlantBombCard(), quantity: 2 },

    // TODO: Phase 2 - Add remaining Level 1 cards:
    // - Boosters (Improvised, Solid, Hypergolic)
    // - Anti-Missile System (covert)
    // - Anti-Asteroid System (covert)
    // - Staging (covert)
    // - Industrial Espionage
    // - Switch Parts
    // - Resource Raid
    // - Inspection Delay
    // - Hostile Takeover
    // - Abilities: R&D Team, Reverse Engineering, X-Ray Machine, etc.
    // - Enhancements: Intelligence Agency, Security Audit, etc.
  ];

  /**
   * Generate a Level 1 deck with proper card quantities.
   */
  static generateLevel1Deck(): CardSchema[] {
    const deck: CardSchema[] = [];

    for (const entry of this.level1Cards) {
      for (let i = 0; i < entry.quantity; i++) {
        deck.push(entry.card.toSchema());
      }
    }

    return deck;
  }

  /**
   * Generate a Level 2 deck (placeholder for Phase 3).
   */
  static generateLevel2Deck(): CardSchema[] {
    // TODO: Phase 3 - Implement Level 2 cards
    return [];
  }

  /**
   * Generate a Level 3 deck (placeholder for Phase 4).
   */
  static generateLevel3Deck(): CardSchema[] {
    // TODO: Phase 4 - Implement Level 3 cards
    return [];
  }

  /**
   * Get a card instance by ID for executing card logic.
   */
  static getCardById(cardId: string): Card | undefined {
    // Extract base card ID (remove instance suffix)
    const baseId = cardId.split("-").slice(0, -1).join("-") || cardId;

    const entry = this.level1Cards.find((e) => e.card.id === baseId);
    return entry?.card;
  }
}
