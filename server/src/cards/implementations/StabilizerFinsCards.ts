import { ComponentCard } from "../ComponentCard";

/**
 * Stabilizer Fins cards - Navigation and stability control.
 * Required component for launch.
 *
 * Navigation error rates (Level 2):
 * - Improvised: 70% error (on 1-4)
 * - Second-hand: 33% error (on 1-2)
 * - Cutting Edge: 0% error (never fails)
 *
 * See CARDS_CATALOG.md - "Stabilizer Fins" section
 */

export class ImprovisedStabilizerFinsCard extends ComponentCard {
  readonly id = "stabilizer_fins_improvised";
  readonly name = "Improvised Stabilizer Fins";
  readonly componentType = "stabilizer_fins" as const;
  readonly description = "Basic fins. 70% navigation error rate in Level 2.";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 1;
  readonly tier = 1;
}

export class SecondHandStabilizerFinsCard extends ComponentCard {
  readonly id = "stabilizer_fins_second_hand";
  readonly name = "Second-hand Stabilizer Fins";
  readonly componentType = "stabilizer_fins" as const;
  readonly description = "Reliable fins. 33% navigation error rate in Level 2.";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 2;
  readonly tier = 2;
}

export class CuttingEdgeStabilizerFinsCard extends ComponentCard {
  readonly id = "stabilizer_fins_cutting_edge";
  readonly name = "Cutting Edge Stabilizer Fins";
  readonly componentType = "stabilizer_fins" as const;
  readonly description = "Perfect fins. Never causes navigation errors in Level 2.";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 3;
  readonly tier = 3;
}
