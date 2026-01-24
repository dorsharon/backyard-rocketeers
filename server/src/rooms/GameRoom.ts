import { type Client, Room } from 'colyseus';
import { CardRegistry } from '../cards/CardRegistry';
import type { CardSchema } from '../schemas/CardSchema';
import { GameState } from '../schemas/GameState';
import { Player } from '../schemas/Player';
import { roll1d6, rollDice, shuffleArray, sumDice } from '../utils/dice';

/**
 * GameRoom - Main game logic for Backyard Rocketeers.
 * Handles all game state, turn management, and card execution.
 *
 * See GAME_RULES.md for complete game mechanics.
 * See CLAUDE.md for architecture principles.
 */
export class GameRoom extends Room<GameState> {
	maxClients = 6;
	minClients = 2;

	onCreate(_options: Record<string, unknown>): void {
		// Initialize game state
		this.setState(new GameState());

		console.log('GameRoom created!', _options);

		// Register message handlers
		this.onMessage('ready', this.handleReady.bind(this));
		this.onMessage('start_game', this.handleStartGame.bind(this));
		this.onMessage('draw_card', this.handleDrawCard.bind(this));
		this.onMessage('play_card', this.handlePlayCard.bind(this));
		this.onMessage('end_turn', this.handleEndTurn.bind(this));
		this.onMessage('launch_rocket', this.handleLaunchRocket.bind(this));

		// Initialize decks (will be populated later with actual cards)
		this.initializeDecks();
	}

	onJoin(client: Client, options: { name?: string }): void {
		console.log(`${client.sessionId} joined the room`);

		const playerName = options.name || `Player ${this.state.players.size + 1}`;
		const player = new Player(client.sessionId, playerName);

		this.state.players.set(client.sessionId, player);
		this.state.playerOrder.push(client.sessionId);

		// Send welcome message
		client.send('welcome', {
			message: `Welcome to Backyard Rocketeers, ${playerName}!`,
			playerId: client.sessionId,
		});

		// Notify all players of the new player
		this.broadcast('player_joined', {
			playerId: client.sessionId,
			playerName: playerName,
			playerCount: this.state.players.size,
		});
	}

	onLeave(client: Client, consented: boolean): void {
		console.log(`${client.sessionId} left the room, consented: ${consented}`);

		const player = this.state.players.get(client.sessionId);
		if (player) {
			// Remove player from game
			this.state.players.delete(client.sessionId);

			// Remove from turn order
			const index = this.state.playerOrder.findIndex(
				(id: string) => id === client.sessionId,
			);
			if (index !== -1) {
				this.state.playerOrder.splice(index, 1);
			}

			// Adjust current player index if needed
			if (this.state.currentPlayerIndex >= this.state.playerOrder.length) {
				this.state.currentPlayerIndex = 0;
			}

			this.broadcast('player_left', {
				playerId: client.sessionId,
				playerName: player.name,
				playerCount: this.state.players.size,
			});
		}

		// If game started and not enough players, end game
		if (this.state.gameStarted && this.state.players.size < this.minClients) {
			this.endGame('Not enough players');
		}
	}

	onDispose(): void {
		console.log('GameRoom disposed');
	}

	/**
	 * Initialize card decks for all levels.
	 * Uses CardRegistry to generate proper decks with correct card quantities.
	 */
	private initializeDecks(): void {
		// Generate Level 1 deck from CardRegistry
		this.state.level1Deck = CardRegistry.generateLevel1Deck();
		this.state.level2Deck = CardRegistry.generateLevel2Deck();
		this.state.level3Deck = CardRegistry.generateLevel3Deck();

		// Shuffle decks using secure random
		this.state.level1Deck = shuffleArray(this.state.level1Deck);
		this.state.level2Deck = shuffleArray(this.state.level2Deck);
		this.state.level3Deck = shuffleArray(this.state.level3Deck);

		console.log(
			`Initialized decks - Level 1: ${this.state.level1Deck.length} cards`,
		);
	}


	/**
	 * Handle player ready signal.
	 */
	private handleReady(client: Client, _message: unknown): void {
		const player = this.state.players.get(client.sessionId);
		if (!player) return;

		player.isReady = true;
		this.broadcast('player_ready', { playerId: client.sessionId });

		// Check if all players are ready
		let allReady = true;
		this.state.players.forEach((p: Player) => {
			if (!p.isReady) allReady = false;
		});

		if (allReady && this.state.players.size >= this.minClients) {
			this.broadcast('all_players_ready', {});
		}
	}

	/**
	 * Handle game start request.
	 */
	private handleStartGame(client: Client, _message: unknown): void {
		// Only allow if not started and enough players
		if (this.state.gameStarted) {
			client.send('error', { message: 'Game already started' });
			return;
		}

		if (this.state.players.size < this.minClients) {
			client.send('error', {
				message: `Need at least ${this.minClients} players`,
			});
			return;
		}

		// Start the game
		this.startGame();
	}

	/**
	 * Start the game.
	 */
	private startGame(): void {
		console.log('Starting game...');

		this.state.gameStarted = true;
		this.state.currentPhase = 'draw';

		// Determine first player by dice roll
		let highestRoll = 0;
		let firstPlayerIndex = 0;

		this.state.playerOrder.forEach((sessionId: string, index: number) => {
			const rolls = rollDice(2);
			const total = sumDice(rolls);

			this.broadcast('dice_roll', {
				playerId: sessionId,
				rolls: rolls,
				total: total,
				reason: 'Determining first player',
			});

			if (total > highestRoll) {
				highestRoll = total;
				firstPlayerIndex = index;
			}
		});

		this.state.currentPlayerIndex = firstPlayerIndex;

		// Deal starting hands (5 cards each)
		this.state.players.forEach((player: Player) => {
			this.dealCards(player, 5, 1);
		});

		this.broadcast('game_started', {
			firstPlayerId: this.state.playerOrder[firstPlayerIndex],
			currentPhase: this.state.currentPhase,
		});

		console.log('Game started!');
	}

	/**
	 * Deal cards to a player from a specific level deck.
	 */
	private dealCards(player: Player, count: number, level: number): void {
		const deck = this.getDeckForLevel(level);

		for (let i = 0; i < count; i++) {
			if (deck.length === 0) {
				// Reshuffle discard pile if deck is empty
				this.reshuffleDiscard(level);
				if (deck.length === 0) break; // Still empty, no cards left
			}

			const card = deck.pop();
			if (card) {
				player.hand.push(card);
			}
		}
	}

	/**
	 * Get deck for specific level.
	 */
	private getDeckForLevel(level: number): CardSchema[] {
		switch (level) {
			case 1:
				return this.state.level1Deck;
			case 2:
				return this.state.level2Deck;
			case 3:
				return this.state.level3Deck;
			default:
				return this.state.level1Deck;
		}
	}

	/**
	 * Reshuffle discard pile back into deck.
	 */
	private reshuffleDiscard(level: number): void {
		const deck = this.getDeckForLevel(level);
		const discard = this.getDiscardForLevel(level);

		while (discard.length > 0) {
			const card = discard.pop();
			if (card) deck.push(card);
		}

		// Shuffle in place by replacing contents with shuffled array
		const shuffled = shuffleArray(deck);
		deck.length = 0;
		deck.push(...shuffled);
	}

	/**
	 * Get discard pile for specific level.
	 */
	private getDiscardForLevel(level: number): CardSchema[] {
		switch (level) {
			case 1:
				return this.state.level1Discard;
			case 2:
				return this.state.level2Discard;
			case 3:
				return this.state.level3Discard;
			default:
				return this.state.level1Discard;
		}
	}

	/**
	 * Validate that it's the given player's turn.
	 * Returns the player if valid, null otherwise (and sends error to client).
	 */
	private validatePlayerTurn(client: Client): Player | null {
		const player = this.state.players.get(client.sessionId);
		if (!player) return null;

		if (
			this.state.playerOrder[this.state.currentPlayerIndex] !== client.sessionId
		) {
			client.send('error', { message: 'Not your turn!' });
			return null;
		}

		return player;
	}

	/**
	 * Handle draw card request.
	 */
	private handleDrawCard(client: Client, _message: unknown): void {
		const player = this.validatePlayerTurn(client);
		if (!player) return;

		// Validate phase
		if (this.state.currentPhase !== 'draw') {
			client.send('error', { message: 'Not in draw phase!' });
			return;
		}

		// Determine how many cards to draw (comeback mechanic)
		const drawCount = this.state.isPlayerBehind(player) ? 2 : 1;

		this.dealCards(player, drawCount, player.level);

		this.broadcast('cards_drawn', {
			playerId: client.sessionId,
			count: drawCount,
			handSize: player.hand.length,
		});

		// Move to action phase
		this.state.currentPhase = 'action';

		client.send('phase_change', { phase: 'action' });
	}

	/**
	 * Handle play card request.
	 * Validates and executes card logic using CardRegistry.
	 */
	private handlePlayCard(
		client: Client,
		message: { cardId: string; targetPlayerId?: string; additionalData?: unknown },
	): void {
		const player = this.validatePlayerTurn(client);
		if (!player) return;

		// Validate phase
		if (this.state.currentPhase !== 'action') {
			client.send('error', { message: 'Not in action phase!' });
			return;
		}

		const { cardId, targetPlayerId, additionalData } = message;

		// Find card in hand
		const cardIndex = player.hand.findIndex((c: CardSchema) => c.id === cardId);
		if (cardIndex === -1) {
			client.send('error', { message: 'Card not in hand!' });
			return;
		}

		const cardSchema = player.hand[cardIndex];
		if (!cardSchema) return;

		// Get card implementation from registry
		const cardImpl = CardRegistry.getCardById(cardSchema.id);
		if (!cardImpl) {
			client.send('error', { message: 'Unknown card type!' });
			return;
		}

		// Validate card can be played
		if (!cardImpl.canPlay(this.state, player, targetPlayerId)) {
			client.send('error', { message: 'Cannot play this card!' });
			return;
		}

		// Remove from hand
		player.hand.splice(cardIndex, 1);

		// Execute card effect
		try {
			cardImpl.apply(this.state, player, targetPlayerId, additionalData);

			this.broadcast('card_played', {
				playerId: client.sessionId,
				cardId: cardId,
				cardName: cardSchema.name,
				cardType: cardSchema.type,
				targetPlayerId: targetPlayerId || null,
				success: true,
			});
		} catch (error) {
			console.error('Error executing card:', error);
			client.send('error', { message: 'Failed to execute card!' });

			// Return card to hand on failure
			player.hand.push(cardSchema);
		}
	}

	/**
	 * Handle end turn request.
	 */
	private handleEndTurn(client: Client, _message: unknown): void {
		const player = this.validatePlayerTurn(client);
		if (!player) return;

		// Check hand limit (7 cards max)
		if (player.hand.length > 7) {
			client.send('error', {
				message: 'Must discard down to 7 cards before ending turn!',
			});
			return;
		}

		// Check win condition for Level 3
		if (player.hasWinCondition()) {
			this.declareWinner(player);
			return;
		}

		// Advance to next turn
		this.state.nextTurn();

		this.broadcast('turn_ended', {
			previousPlayerId: client.sessionId,
			currentPlayerId: this.state.playerOrder[this.state.currentPlayerIndex],
			turnCount: this.state.turnCount,
		});
	}

	/**
	 * Handle launch rocket request (Level 1 -> Level 2 transition).
	 */
	private handleLaunchRocket(client: Client, _message: unknown): void {
		const player = this.validatePlayerTurn(client);
		if (!player) return;

		// Validate player is in Level 1
		if (player.level !== 1) {
			client.send('error', { message: 'Can only launch from Level 1!' });
			return;
		}

		// Validate launch requirements
		if (!player.canLaunch()) {
			client.send('error', { message: 'Launch requirements not met!' });
			return;
		}

		// Launch procedure (see GAME_RULES.md - "Launch Procedure")
		this.broadcast('launch_initiated', { playerId: client.sessionId });

		// Roll for each component
		let launchSuccess = true;
		const componentRolls: Array<{
			componentName: string;
			tier: number;
			roll: number;
			success: boolean;
		}> = [];

		player.rocketComponents.forEach((component: CardSchema) => {
			// Skip non-component cards or covert cards
			if (component.type !== 'component' || !component.isRevealed) {
				return;
			}

			const roll = roll1d6();
			const result = {
				componentName: component.name,
				tier: component.tier,
				roll: roll,
				success: true,
			};

			// Check failure based on tier
			if (component.tier === 1) {
				// Improvised: fails on 1-2
				if (roll <= 2) {
					result.success = false;
					launchSuccess = false;
				}
			} else if (component.tier === 2) {
				// Second-hand: fails on 1
				if (roll === 1) {
					result.success = false;
					launchSuccess = false;
				}
			}
			// Cutting Edge (tier 3): never fails

			componentRolls.push(result);
		});

		this.broadcast('launch_rolls', {
			playerId: client.sessionId,
			rolls: componentRolls,
			success: launchSuccess,
		});

		if (launchSuccess) {
			// Launch successful - advance to Level 2
			player.level = 2;
			player.hasLaunched = true;
			player.groundFuel = 0; // Consumed during launch
			player.spaceFuel = 0; // Start with no space fuel

			// Roll starting distance (3d6 × 1000)
			const distanceRolls = rollDice(3);
			const distance = sumDice(distanceRolls) * 1000;
			player.distanceFromMars = distance;
			player.originalRocketStrength = player.getRocketStrength();

			// Deal 3 Level 2 cards, discard Level 1-only cards
			// TODO: Phase 3 - Implement cross-level card filtering
			this.dealCards(player, 3, 2);

			this.broadcast('launch_success', {
				playerId: client.sessionId,
				startingDistance: distance,
				distanceRolls: distanceRolls,
			});
		} else {
			// Launch failed - discard failed components
			const failedComponents = componentRolls.filter((r) => !r.success);

			failedComponents.forEach((failed) => {
				const index = player.rocketComponents.findIndex(
					(c: CardSchema) => c.name === failed.componentName,
				);
				if (index !== -1) {
					player.rocketComponents.splice(index, 1);
				}
			});

			this.broadcast('launch_failed', {
				playerId: client.sessionId,
				failedComponents: failedComponents.map((f) => f.componentName),
			});
		}
	}

	/**
	 * Declare a winner and end the game.
	 */
	private declareWinner(player: Player): void {
		this.state.gameEnded = true;
		this.state.winnerId = player.sessionId;

		this.broadcast('game_ended', {
			winnerId: player.sessionId,
			winnerName: player.name,
			reason: 'Reached Alien Base on Mars!',
		});

		console.log(`Game ended! Winner: ${player.name}`);
	}

	/**
	 * End the game without a winner.
	 */
	private endGame(reason: string): void {
		this.state.gameEnded = true;

		this.broadcast('game_ended', {
			winnerId: null,
			reason: reason,
		});

		console.log(`Game ended: ${reason}`);
	}
}
