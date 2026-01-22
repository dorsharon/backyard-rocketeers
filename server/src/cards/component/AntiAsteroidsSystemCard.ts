import { ComponentCard } from "../ComponentCard";

/**
 * Anti-Astroids System - Covert defense against asteroid attacks.
 *
 * Strength: 2
 * Tier: Second-hand
 * Effect: Reduces Asteroid Storm damage (attacker rolls 1d6 instead of 3d6)
 * Covert: Yes
 *
 * See CARDS_CATALOG.md - "Anti-Astroids System"
 */
export class AntiAsteroidsSystemCard extends ComponentCard {
  readonly id = "PmEnP8hTtZn4xR2bIVlEC";
  readonly name = "Anti-Astroids System";
  readonly componentType = "defense" as const;
  readonly description = "Those astroids don't stand a chance.";
  readonly availableAtLevels = [1];
  readonly isCovert = true;
  readonly strength = 2;
}
