import { ComponentCard } from "../ComponentCard";

/**
 * Fuel Tank cards - Add fuel for launch.
 * Required to reach 100% fuel to launch.
 *
 * Fuel over 100% is wasted (no bonus).
 *
 * See CARDS_CATALOG.md - "Fuel Tanks" section
 */

export class SmallFuelTankCard extends ComponentCard {
  readonly id = "fuel_tank_small";
  readonly name = "Small Fuel Tank";
  readonly componentType = "fuel_tank" as const;
  readonly description = "Add 10% fuel. Simple and common.";
  readonly levels = [1, 2]; // Cross-level card
  readonly isCovert = false;
  readonly strength = 10; // Represents 10% fuel
  readonly tier = 1;
}

export class LargeFuelTankCard extends ComponentCard {
  readonly id = "fuel_tank_large";
  readonly name = "Large Fuel Tank";
  readonly componentType = "fuel_tank" as const;
  readonly description = "Add 20% fuel. Efficient storage.";
  readonly levels = [1, 2]; // Cross-level card
  readonly isCovert = false;
  readonly strength = 20; // Represents 20% fuel
  readonly tier = 2;
}

export class ExtraLargeFuelTankCard extends ComponentCard {
  readonly id = "fuel_tank_extra_large";
  readonly name = "Extra Large Fuel Tank";
  readonly componentType = "fuel_tank" as const;
  readonly description = "Add 50% fuel. Massive capacity.";
  readonly levels = [1, 2]; // Cross-level card
  readonly isCovert = false;
  readonly strength = 50; // Represents 50% fuel
  readonly tier = 3;
}
