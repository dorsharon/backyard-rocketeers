import { ComponentCard } from "../ComponentCard";

/**
 * Cutting Edge Stabilizer Fins - Perfect stability control.
 *
 * Strength: 3
 * Tier: Cutting Edge
 * Navigation error rate (Level 2): 0% (never fails)
 *
 * See CARDS_CATALOG.md - "Cutting Edge Stabilizer Fins"
 */
export class CuttingEdgeStabilizerFinsCard extends ComponentCard {
  readonly id = "w27hCs8vzXW6tjfjyZmYa";
  readonly name = "Cutting Edge Stabilizer Fins";
  readonly componentType = "stabilizer_fins" as const;
  readonly description = "You'll be as steady as a rock... et.";
  readonly availableAtLevels = [1];
  readonly isCovert = false;
  readonly strength = 3;
}
