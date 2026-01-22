import { ComponentCard } from "../ComponentCard";

/**
 * Staging - Covert component that activates after 4 turns in Level 2.
 *
 * Strength: 1
 * Tier: Improvised
 * Effect: After 4 turns in Level 2, gain +15km/turn permanently
 * Covert: Yes
 *
 * See CARDS_CATALOG.md - "Staging"
 */
export class StagingCard extends ComponentCard {
  readonly id = "mN3rhWGXbkIfe59ncbDAa";
  readonly name = "Staging";
  readonly componentType = "staging" as const;
  readonly description = "If it crashes on anyone after we ditch it, we'll deny everything";
  readonly availableAtLevels = [1];
  readonly isCovert = true;
  readonly strength = 1;
}
