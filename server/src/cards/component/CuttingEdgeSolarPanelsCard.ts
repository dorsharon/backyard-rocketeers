import { ComponentCard } from "../ComponentCard";

/**
 * Cutting Edge Solar Panels - Advanced solar power generation.
 *
 * Effect: 30% power per turn
 * Vulnerable to Dust Storm (blocks for 3 turns)
 *
 * See CARDS_CATALOG.md - "Cutting Edge Solar Panels"
 */
export class CuttingEdgeSolarPanelsCard extends ComponentCard {
  readonly id = "3svHsYNJOY5HPZ1fAFOty";
  readonly name = "Cutting Edge Solar Panels";
  readonly componentType = "generator" as const;
  readonly description = "Those guys at MIT won't notice that I stole them, right?";
  readonly availableAtLevels = [3];
  readonly isCovert = false;
  readonly strength = 30; // 30% power/turn
}
