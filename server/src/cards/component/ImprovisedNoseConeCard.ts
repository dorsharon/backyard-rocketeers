import { ComponentCard } from "../ComponentCard";

/**
 * Improvised Nose Cone - Basic pointy tip.
 *
 * Strength: 1
 * Tier: Improvised
 * Landing failure rate: 33% (fails on roll 1-2)
 *
 * See CARDS_CATALOG.md - "Improvised Nose Cone"
 */
export class ImprovisedNoseConeCard extends ComponentCard {
  readonly id = "sWWBoAPdWvkYeBVdzsxIY";
  readonly name = "Improvised Nose Cone";
  readonly componentType = "nose_cone" as const;
  readonly description = "Hey, it's pointy. That's all the matters, right?";
  readonly availableAtLevels = [1];
  readonly isCovert = false;
  readonly strength = 1;
}
