import { CardRegistry } from '../cards/CardRegistry';
import type { CardSchema } from '../schemas/CardSchema';
import type { GameState } from '../schemas/GameState';
import type { Player } from '../schemas/Player';

/**
 * Bot AI decision-making for Backyard Rocketeers.
 * Makes strategic decisions for bot players during their turns.
 */
export class BotAI {
	/**
	 * Decide which card to play (or null to skip playing).
	 * Returns the card to play and optional target player.
	 */
	static decideCardToPlay(
		gameState: GameState,
		bot: Player,
	): { cardId: string; targetPlayerId?: string } | null {
		if (bot.hand.length === 0) {
			return null;
		}

		// Priority 1: Play Launch Pad if we don't have one
		if (!bot.hasLaunchPad) {
			const launchPadCard = bot.hand.find(
				(card: CardSchema) => card.componentType === 'launch_pad',
			);
			if (launchPadCard) {
				return { cardId: launchPadCard.id };
			}
		}

		// Priority 2: Play component cards to build rocket
		if (bot.hasLaunchPad && bot.rocketComponents.length < 6) {
			const componentCard = this.findBestComponentCard(bot);
			if (componentCard) {
				const impl = CardRegistry.getCardById(componentCard.baseId);
				if (impl && impl.canPlay(gameState, bot)) {
					return { cardId: componentCard.id };
				}
			}
		}

		// Priority 3: Play fuel tanks if we need fuel
		if (bot.hasLaunchPad && bot.groundFuel < 100) {
			const fuelCard = bot.hand.find(
				(card: CardSchema) => card.componentType === 'fuel_tank',
			);
			if (fuelCard) {
				const impl = CardRegistry.getCardById(fuelCard.baseId);
				if (impl && impl.canPlay(gameState, bot)) {
					return { cardId: fuelCard.id };
				}
			}
		}

		// Priority 4: Play sabotage cards on opponents with progress
		const sabotageCard = bot.hand.find(
			(card: CardSchema) => card.type === 'sabotage',
		);
		if (sabotageCard) {
			const target = this.findBestSabotageTarget(gameState, bot);
			if (target) {
				const impl = CardRegistry.getCardById(sabotageCard.baseId);
				if (impl && impl.canPlay(gameState, bot, target.sessionId)) {
					return { cardId: sabotageCard.id, targetPlayerId: target.sessionId };
				}
			}
		}

		// Priority 5: Play ability cards if beneficial
		const abilityCard = bot.hand.find(
			(card: CardSchema) => card.type === 'ability',
		);
		if (abilityCard) {
			const impl = CardRegistry.getCardById(abilityCard.baseId);
			if (impl && impl.canPlay(gameState, bot)) {
				return { cardId: abilityCard.id };
			}
		}

		// Priority 6: Play enhancement cards
		const enhancementCard = bot.hand.find(
			(card: CardSchema) => card.type === 'enhancement',
		);
		if (enhancementCard) {
			const impl = CardRegistry.getCardById(enhancementCard.baseId);
			if (impl && impl.canPlay(gameState, bot)) {
				return { cardId: enhancementCard.id };
			}
		}

		// No good play found
		return null;
	}

	/**
	 * Find the best component card to play.
	 * Prioritizes missing components, then higher tier cards.
	 */
	private static findBestComponentCard(bot: Player): CardSchema | null {
		const existingTypes = new Set<string>();
		bot.rocketComponents.forEach((c: CardSchema) => {
			if (c.componentType) {
				existingTypes.add(c.componentType);
			}
		});

		// Required component types (excluding launch_pad and fuel_tank)
		const requiredTypes = ['fuselage', 'nose_cone', 'stabilizer_fins', 'thruster'];

		// First, look for missing required components
		for (const reqType of requiredTypes) {
			if (!existingTypes.has(reqType)) {
				// Find a card of this type, preferring higher tier
				const candidates = bot.hand.filter(
					(card: CardSchema) =>
						card.type === 'component' && card.componentType === reqType,
				);
				if (candidates.length > 0) {
					// Sort by tier descending (higher tier = better)
					candidates.sort((a, b) => (b.tier || 1) - (a.tier || 1));
					return candidates[0] || null;
				}
			}
		}

		// All required components exist - look for upgrades (higher tier replacements)
		const componentCards = bot.hand.filter(
			(card: CardSchema) =>
				card.type === 'component' &&
				card.componentType !== 'fuel_tank' &&
				card.componentType !== 'launch_pad',
		);

		if (componentCards.length === 0) {
			return null;
		}

		// Sort by tier descending
		componentCards.sort((a, b) => (b.tier || 1) - (a.tier || 1));
		return componentCards[0] || null;
	}

	/**
	 * Find the best target for a sabotage card.
	 * Targets the player closest to winning (most progress).
	 */
	private static findBestSabotageTarget(
		gameState: GameState,
		bot: Player,
	): Player | null {
		let bestTarget: Player | null = null;
		let bestScore = -1;

		gameState.players.forEach((player: Player) => {
			// Don't target self
			if (player.sessionId === bot.sessionId) {
				return;
			}

			// Don't target players with no components
			if (player.rocketComponents.length === 0) {
				return;
			}

			// Score based on progress (higher = more threatening)
			let score = 0;
			score += player.level * 100;
			score += player.rocketComponents.length * 10;
			score += player.groundFuel;
			if (player.hasLaunchPad) score += 20;

			if (score > bestScore) {
				bestScore = score;
				bestTarget = player;
			}
		});

		return bestTarget;
	}

	/**
	 * Decide if bot should try to launch.
	 */
	static shouldLaunch(bot: Player): boolean {
		return bot.canLaunch();
	}

	/**
	 * Get a random delay in milliseconds for bot actions.
	 * Makes bot behavior feel more natural.
	 */
	static getActionDelay(): number {
		return 800 + Math.random() * 1200; // 800-2000ms
	}
}
