import { ComponentCard } from "../ComponentCard";

/**
 * Second-hand Stabilizer Fins - Reliable stability control.
 *
 * Strength: 2
 * Tier: Second-hand
 * Navigation error rate (Level 2): 33% (on roll 1-2)
 *
 * See CARDS_CATALOG.md - "Second-Hand Stabilizer Fins"
 */
export class SecondHandStabilizerFinsCard extends ComponentCard {
  readonly id = "wLmztFFGwd6Y92ZeTD9RN";
  readonly name = "Second-hand Stabilizer Fins";
  readonly componentType = "stabilizer_fins" as const;
  readonly description = "They worked for the last guy that used them, so maybe they're fine.";
  readonly availableAtLevels = [1];
  readonly isCovert = false;
  readonly strength = 2;
}
