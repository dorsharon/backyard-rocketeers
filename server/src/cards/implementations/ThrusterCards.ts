import { ComponentCard } from "../ComponentCard";

/**
 * Thruster cards - Main propulsion engine.
 * Required component for launch.
 *
 * Launch failure rates:
 * - Improvised: 70% (fails on 1-4)
 * - Second-hand: 33% (fails on 1-2)
 * - Cutting Edge: 0% (never fails)
 *
 * See CARDS_CATALOG.md - "Thruster" section
 */

export class ImprovisedThrusterCard extends ComponentCard {
  readonly id = "thruster_improvised";
  readonly name = "Improvised Thruster";
  readonly componentType = "thruster" as const;
  readonly description = "Basic engine. Launch fails on roll 1-4 (70%).";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 1;
  readonly tier = 1;
}

export class SecondHandThrusterCard extends ComponentCard {
  readonly id = "thruster_second_hand";
  readonly name = "Second-hand Thruster";
  readonly componentType = "thruster" as const;
  readonly description = "Reliable engine. Launch fails on roll 1-2 (33%).";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 2;
  readonly tier = 2;
}

export class CuttingEdgeThrusterCard extends ComponentCard {
  readonly id = "thruster_cutting_edge";
  readonly name = "Cutting Edge Thruster";
  readonly componentType = "thruster" as const;
  readonly description = "Premium engine. Never fails launch checks.";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 3;
  readonly tier = 3;
}
