import { ComponentCard } from "../ComponentCard";

/**
 * Fuselage cards - Main body of the rocket.
 * Required component for launch.
 *
 * Launch failure rates:
 * - Improvised: 33% (fails on 1-2)
 * - Second-hand: 17% (fails on 1)
 * - Cutting Edge: 0% (never fails)
 *
 * See CARDS_CATALOG.md - "Fuselage" section
 */

export class ImprovisedFuselageCard extends ComponentCard {
  readonly id = "fuselage_improvised";
  readonly name = "Improvised Fuselage";
  readonly componentType = "fuselage" as const;
  readonly description = "Basic rocket body. Launch fails on roll 1-2 (33%).";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 1;
  readonly tier = 1;
}

export class SecondHandFuselageCard extends ComponentCard {
  readonly id = "fuselage_second_hand";
  readonly name = "Second-hand Fuselage";
  readonly componentType = "fuselage" as const;
  readonly description = "Sturdy rocket body. Launch fails on roll 1 (17%).";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 2;
  readonly tier = 2;
}

export class CuttingEdgeFuselageCard extends ComponentCard {
  readonly id = "fuselage_cutting_edge";
  readonly name = "Cutting Edge Fuselage";
  readonly componentType = "fuselage" as const;
  readonly description = "Premium rocket body. Never fails launch checks.";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 3;
  readonly tier = 3;
}
