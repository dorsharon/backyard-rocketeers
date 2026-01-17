import { randomInt } from 'crypto';

/**
 * Roll dice using cryptographically secure random number generation.
 * See GAME_RULES.md - "Dice Rolling Rules" section.
 *
 * IMPORTANT: All dice rolls MUST be done server-side for security.
 * Use crypto.randomInt() for true randomness, not Math.random().
 */

/**
 * Roll a specified number of six-sided dice.
 * @param count Number of dice to roll (1-6 typically)
 * @returns Array of dice results, each 1-6
 */
export function rollDice(count: number): number[] {
  if (count < 1 || count > 10) {
    throw new Error(`Invalid dice count: ${count}. Must be between 1 and 10.`);
  }

  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    // randomInt is exclusive of upper bound, so use (1, 7) for 1-6
    results.push(randomInt(1, 7));
  }

  return results;
}

/**
 * Roll a single die.
 * @returns Number between 1 and 6
 */
export function roll1d6(): number {
  return randomInt(1, 7);
}

/**
 * Roll two dice and return the higher value (advantage roll).
 * Used for improved odds (e.g., Cutting Edge Nose Cone landing).
 */
export function rollWithAdvantage(): number {
  const roll1 = randomInt(1, 7);
  const roll2 = randomInt(1, 7);
  return Math.max(roll1, roll2);
}

/**
 * Roll two dice and return the lower value (disadvantage roll).
 */
export function rollWithDisadvantage(): number {
  const roll1 = randomInt(1, 7);
  const roll2 = randomInt(1, 7);
  return Math.min(roll1, roll2);
}

/**
 * Sum an array of dice rolls.
 */
export function sumDice(rolls: number[]): number {
  return rolls.reduce((sum, roll) => sum + roll, 0);
}
