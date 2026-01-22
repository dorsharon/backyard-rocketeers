import { ComponentCard } from "../ComponentCard";

/**
 * Improvised Stabilizer Fins - Basic stability control.
 *
 * Strength: 1
 * Tier: Improvised
 * Navigation error rate (Level 2): 70% (on roll 1-4)
 *
 * See CARDS_CATALOG.md - "Improvised Stabilizer Fins"
 */
export class ImprovisedStabilizerFinsCard extends ComponentCard {
  readonly id = "ftpIFozuUY07p1w3ocCvb";
  readonly name = "Improvised Stabilizer Fins";
  readonly componentType = "stabilizer_fins" as const;
  readonly description = "These will probably help you stabilize... hopefully...";
  readonly availableAtLevels = [1];
  readonly isCovert = false;
  readonly strength = 1;
}
