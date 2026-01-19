import { ComponentCard } from "../ComponentCard";

/**
 * Launch Pad - Required foundation for building rocket.
 * Must be placed before any other components.
 *
 * See CARDS_CATALOG.md - "Launch Pad"
 */
export class LaunchPadCard extends ComponentCard {
  readonly id = "launch_pad";
  readonly name = "Launch Pad";
  readonly componentType = "launch_pad" as const;
  readonly description = "Required foundation. Holds up to 6 components.";
  readonly levels = [1];
  readonly isCovert = false;
  readonly strength = 0;
  readonly tier = 0;
}
