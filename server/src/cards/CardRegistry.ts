import { Card } from "./Card";
import { CardSchema } from "../schemas/CardSchema";

// Component Cards
import { LaunchPadCard } from "./component/LaunchPadCard";
import { ImprovisedFuselageCard } from "./component/ImprovisedFuselageCard";
import { SecondHandFuselageCard } from "./component/SecondHandFuselageCard";
import { CuttingEdgeFuselageCard } from "./component/CuttingEdgeFuselageCard";
import { ImprovisedNoseConeCard } from "./component/ImprovisedNoseConeCard";
import { SecondHandNoseConeCard } from "./component/SecondHandNoseConeCard";
import { CuttingEdgeNoseConeCard } from "./component/CuttingEdgeNoseConeCard";
import { ImprovisedStabilizerFinsCard } from "./component/ImprovisedStabilizerFinsCard";
import { SecondHandStabilizerFinsCard } from "./component/SecondHandStabilizerFinsCard";
import { CuttingEdgeStabilizerFinsCard } from "./component/CuttingEdgeStabilizerFinsCard";
import { ImprovisedThrusterCard } from "./component/ImprovisedThrusterCard";
import { SecondHandThrusterCard } from "./component/SecondHandThrusterCard";
import { CuttingEdgeThrusterCard } from "./component/CuttingEdgeThrusterCard";
import { SmallFuelTankCard } from "./component/SmallFuelTankCard";
import { LargeFuelTankCard } from "./component/LargeFuelTankCard";
import { ExtraLargeFuelTankCard } from "./component/ExtraLargeFuelTankCard";
import { ImprovisedBoostersCard } from "./component/ImprovisedBoostersCard";
import { SolidRocketBoostersCard } from "./component/SolidRocketBoostersCard";
import { HypergolicBoostersCard } from "./component/HypergolicBoostersCard";
import { StagingCard } from "./component/StagingCard";
import { AntiMissilesSystemCard } from "./component/AntiMissilesSystemCard";
import { AntiAsteroidsSystemCard } from "./component/AntiAsteroidsSystemCard";
import { ImprovisedMarsRoverCard } from "./component/ImprovisedMarsRoverCard";
import { SecondHandMarsRoverCard } from "./component/SecondHandMarsRoverCard";
import { CuttingEdgeMarsRoverCard } from "./component/CuttingEdgeMarsRoverCard";
import { WindmillGeneratorCard } from "./component/WindmillGeneratorCard";
import { ImprovisedSolarPanelsCard } from "./component/ImprovisedSolarPanelsCard";
import { SecondHandSolarPanelsCard } from "./component/SecondHandSolarPanelsCard";
import { CuttingEdgeSolarPanelsCard } from "./component/CuttingEdgeSolarPanelsCard";
import { GeothermalPowerPlantCard } from "./component/GeothermalPowerPlantCard";
import { BasicAntennaCard } from "./component/BasicAntennaCard";
import { SatelliteDishCard } from "./component/SatelliteDishCard";
import { DeepSpaceArrayCard } from "./component/DeepSpaceArrayCard";

// Sabotage Cards
import { PlantBombCard } from "./sabotage/PlantBombCard";
import { ShootRPGCard } from "./sabotage/ShootRPGCard";
import { IndustrialEspionageCard } from "./sabotage/IndustrialEspionageCard";
import { SwitchPartsCard } from "./sabotage/SwitchPartsCard";
import { ResourceRaidCard } from "./sabotage/ResourceRaidCard";
import { InspectionDelayCard } from "./sabotage/InspectionDelayCard";
import { HostileTakeoverCard } from "./sabotage/HostileTakeoverCard";
import { DustStormCard } from "./sabotage/DustStormCard";
import { AlienInterferenceCard } from "./sabotage/AlienInterferenceCard";
import { SignalJammerCard } from "./sabotage/SignalJammerCard";
import { RoverSabotageCard } from "./sabotage/RoverSabotageCard";

// Ability Cards - will be imported from generated files
// Enhancement Cards - will be imported from generated files

/**
 * CardRegistry - Creates and manages all card instances.
 * Generates decks with proper quantities per CARDS_CATALOG.md.
 *
 * See CARDS_CATALOG.md for complete card list and quantities.
 */
export class CardRegistry {
  /**
   * Level 1 deck composition (all quantities from CARDS_CATALOG.md)
   */
  private static level1Cards: Array<{ card: Card; quantity: number }> = [
    // Launch Pad (6 copies) - REQUIRED
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

    // Boosters (8 total: 3 improvised, 3 solid, 2 hypergolic)
    { card: new ImprovisedBoostersCard(), quantity: 3 },
    { card: new SolidRocketBoostersCard(), quantity: 3 },
    { card: new HypergolicBoostersCard(), quantity: 2 },

    // Fuel Tanks (12 total: 5 small, 4 large, 3 XL)
    { card: new SmallFuelTankCard(), quantity: 5 },
    { card: new LargeFuelTankCard(), quantity: 4 },
    { card: new ExtraLargeFuelTankCard(), quantity: 3 },

    // Covert Components (7 total: 3 staging, 2 anti-missile, 2 anti-asteroid)
    { card: new StagingCard(), quantity: 3 },
    { card: new AntiMissilesSystemCard(), quantity: 2 },
    { card: new AntiAsteroidsSystemCard(), quantity: 2 },

    // Level 1 Sabotage (22 total)
    { card: new PlantBombCard(), quantity: 2 },
    { card: new ShootRPGCard(), quantity: 3 },
    { card: new IndustrialEspionageCard(), quantity: 2 },
    { card: new SwitchPartsCard(), quantity: 3 },
    { card: new ResourceRaidCard(), quantity: 3 },
    { card: new InspectionDelayCard(), quantity: 2 },
    { card: new HostileTakeoverCard(), quantity: 2 },

    // TODO: Add Level 1 Abilities (7 cards)
    // TODO: Add Level 1 Enhancements (2 cards)
  ];

  /**
   * Level 2 deck composition
   */
  private static level2Cards: Array<{ card: Card; quantity: number }> = [
    // Fuel Tanks (cross-level)
    { card: new SmallFuelTankCard(), quantity: 4 },
    { card: new LargeFuelTankCard(), quantity: 4 },
    { card: new ExtraLargeFuelTankCard(), quantity: 4 },

    // TODO: Add Level 2 Sabotage (11 cards)
    // TODO: Add Level 2 Abilities (6 cards)
    // TODO: Add Level 2 Enhancements (8 cards)
  ];

  /**
   * Level 3 deck composition
   */
  private static level3Cards: Array<{ card: Card; quantity: number }> = [
    // Mars Rovers (11 total: 4 improvised, 4 second-hand, 3 cutting edge)
    { card: new ImprovisedMarsRoverCard(), quantity: 4 },
    { card: new SecondHandMarsRoverCard(), quantity: 4 },
    { card: new CuttingEdgeMarsRoverCard(), quantity: 3 },

    // Power Generators (15 total)
    { card: new WindmillGeneratorCard(), quantity: 3 },
    { card: new ImprovisedSolarPanelsCard(), quantity: 4 },
    { card: new SecondHandSolarPanelsCard(), quantity: 3 },
    { card: new CuttingEdgeSolarPanelsCard(), quantity: 3 },
    { card: new GeothermalPowerPlantCard(), quantity: 2 },

    // Communication Antennas (11 total: 4 basic, 5 satellite, 2 deep space)
    { card: new BasicAntennaCard(), quantity: 4 },
    { card: new SatelliteDishCard(), quantity: 5 },
    { card: new DeepSpaceArrayCard(), quantity: 2 },

    // Fuel Tanks (cross-level: 4 total: 2 small, 2 large)
    { card: new SmallFuelTankCard(), quantity: 2 },
    { card: new LargeFuelTankCard(), quantity: 2 },

    // Level 3 Sabotage (10 total)
    { card: new DustStormCard(), quantity: 3 },
    { card: new AlienInterferenceCard(), quantity: 3 },
    { card: new SignalJammerCard(), quantity: 2 },
    { card: new RoverSabotageCard(), quantity: 2 },

    // TODO: Add Level 3 Abilities (5 cards)
    // TODO: Add Level 3 Enhancements (4 cards)
  ];

  /**
   * All cards registry for ID lookup
   */
  private static allCards: Map<string, Card> = new Map();

  /**
   * Initialize the registry (called once at startup)
   */
  static initialize(): void {
    // Register all Level 1 cards
    for (const entry of this.level1Cards) {
      this.allCards.set(entry.card.id, entry.card);
    }

    // Register all Level 2 cards
    for (const entry of this.level2Cards) {
      this.allCards.set(entry.card.id, entry.card);
    }

    // Register all Level 3 cards
    for (const entry of this.level3Cards) {
      this.allCards.set(entry.card.id, entry.card);
    }
  }

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

    return this.shuffleDeck(deck);
  }

  /**
   * Generate a Level 2 deck.
   */
  static generateLevel2Deck(): CardSchema[] {
    const deck: CardSchema[] = [];

    for (const entry of this.level2Cards) {
      for (let i = 0; i < entry.quantity; i++) {
        deck.push(entry.card.toSchema());
      }
    }

    return this.shuffleDeck(deck);
  }

  /**
   * Generate a Level 3 deck.
   */
  static generateLevel3Deck(): CardSchema[] {
    const deck: CardSchema[] = [];

    for (const entry of this.level3Cards) {
      for (let i = 0; i < entry.quantity; i++) {
        deck.push(entry.card.toSchema());
      }
    }

    return this.shuffleDeck(deck);
  }

  /**
   * Get a card instance by ID for executing card logic.
   */
  static getCardById(cardId: string): Card | undefined {
    // Initialize if not done yet
    if (this.allCards.size === 0) {
      this.initialize();
    }

    return this.allCards.get(cardId);
  }

  /**
   * Shuffle a deck using Fisher-Yates algorithm.
   */
  private static shuffleDeck(deck: CardSchema[]): CardSchema[] {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
