import { ComponentCard } from "../ComponentCard";

/**
 * Nose Cone cards - Aerodynamic tip and landing protection.
 * Required component for launch.
 *
 * Launch failure rates:
 * - Improvised: 33% (fails on 1-2)
 * - Second-hand: 17% (fails on 1)
 * - Cutting Edge: 0% (never fails) + 20% landing bonus
 *
 * See CARDS_CATALOG.md - "Nose Cone" section
 */

export class ImprovisedNoseConeCard extends ComponentCard {
  readonly id = "nose_cone_improvised";
  readonly name = "Improvised Nose Cone";
  readonly componentType = "nose_cone" as const;
  readonly description = "Basic aerodynamic tip. Launch fails on roll 1-2 (33%).";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 1;
  readonly tier = 1;
}

export class SecondHandNoseConeCard extends ComponentCard {
  readonly id = "nose_cone_second_hand";
  readonly name = "Second-hand Nose Cone";
  readonly componentType = "nose_cone" as const;
  readonly description = "Reliable nose cone. Launch fails on roll 1 (17%).";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 2;
  readonly tier = 2;
}

export class CuttingEdgeNoseConeCard extends ComponentCard {
  readonly id = "nose_cone_cutting_edge";
  readonly name = "Cutting Edge Nose Cone";
  readonly componentType = "nose_cone" as const;
  readonly description = "Advanced nose cone. Never fails launch. +20% landing safety.";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 3;
  readonly tier = 3;
}
