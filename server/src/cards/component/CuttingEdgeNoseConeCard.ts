import { ComponentCard } from "../ComponentCard";

/**
 * Cutting Edge Nose Cone - Premium aerodynamic tip with +20% landing bonus.
 *
 * Strength: 3
 * Tier: Cutting Edge
 * Landing success bonus: +20%
 *
 * See CARDS_CATALOG.md - "Cutting Edge Nose Cone"
 */
export class CuttingEdgeNoseConeCard extends ComponentCard {
  readonly id = "o7WU8EH9JB6h2Yue5mXuJ";
  readonly name = "Cutting Edge Nose Cone";
  readonly componentType = "nose_cone" as const;
  readonly description = "It really is a cutting edge.";
  readonly availableAtLevels = [1];
  readonly isCovert = false;
  readonly strength = 3;
}
