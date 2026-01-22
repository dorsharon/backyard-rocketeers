import { ComponentCard } from "../ComponentCard";

/**
 * Large Fuel Tank - Add 20% to fuel capacity.
 * Available in all levels.
 *
 * See CARDS_CATALOG.md - "Large Fuel Tank"
 */
export class LargeFuelTankCard extends ComponentCard {
  readonly id = "TXr86tNEPDXxv94w2qH31";
  readonly name = "Large Fuel Tank";
  readonly componentType = "fuel_tank" as const;
  readonly description = "Hey, it was in a discount!";
  readonly availableAtLevels = [1, 2, 3];
  readonly isCovert = false;
  readonly strength = 20; // 20% fuel
}
