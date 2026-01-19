# Backyard Rocketeers - Claude Code Instructions

## Project Overview
This is a turn-based multiplayer card game called "Backyard Rocketeers" where 2-6 players compete to be the first to reach aliens on Mars.

## Critical Documents
Before implementing ANYTHING, read these documents IN ORDER:

1. **`docs/GAME_RULES.md`** - Complete game mechanics and rules (READ FIRST)
2. **`docs/CARDS_CATALOG.md`** - All 89 cards with implementation details
3. This file (`CLAUDE.md`) - Implementation guidelines

## Tech Stack

### Frontend
- **Framework:** React 19+ with Vite
- **Language:** TypeScript (strict mode)
- **State Management:** Zustand (for global client state)
- **API/Data Fetching:** TanStack Query (React Query) if needed for HTTP requests
- **Styling:** Mantine UI components
- **Animations:** Framer Motion (motion/react)
- **Real-time:** Colyseus Client (WebSocket connection to game server)

### Backend
- **Framework:** Colyseus (multiplayer game server)
- **Language:** TypeScript (strict mode)
- **Real-time:** WebSocket (built into Colyseus)

### Deployment
- **Frontend:** Github Pages
- **Backend:** Railway.app or Render.com
- **CI/CD:** Github Actions

### Code Quality
- **Linter/Formatter:** Biome (latest version)
- **Configuration:** Recommended settings with React support for client
- **Scripts:**
  - `npm run lint` - Check for issues
  - `npm run lint:fix` - Auto-fix issues
  - `npm run format` - Format code

## Architecture Principles

### 1. Class-Based Card System
**Every card is implemented as a TypeScript class:**

```typescript
// Base class
abstract class Card {
  abstract id: string;
  abstract name: string;
  abstract type: 'component' | 'sabotage' | 'ability' | 'enhancement';
  abstract levels: number[];
  abstract apply(gameState: GameState, ...args): void;
  
  canPlay(gameState: GameState, player: Player): boolean {
    // Validation logic
  }
}

// Example implementation
class ShootRPGCard extends SabotageCard {
  id = 'shoot_rpg';
  name = 'Shoot An RPG';
  type = 'sabotage';
  levels = [1];
  
  apply(gameState: GameState, caster: Player, target: Player) {
    const roll = gameState.rollDice(1)[0];
    const count = roll >= 5 ? 2 : 1;
    target.destroyComponents(count);
  }
}
```

**DO NOT use JSON + effect registry pattern.** Each card is a class with embedded logic.

### 2. Colyseus State Management
**Use Colyseus Schema for synchronized state:**

```typescript
import { Schema, type, MapSchema } from "@colyseus/schema";

class Player extends Schema {
  @type("string") id: string;
  @type("string") name: string;
  @type("number") level: number = 1;
  @type("number") fuel: number = 0;
  // ... etc
}

class GameState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type("number") currentPlayerIndex: number = 0;
  @type("number") currentLevel: number = 1;
}
```

**State syncs automatically to all clients.** No need for TanStack Query for game state - Colyseus handles it.

### 3. When to Use What

**Use Colyseus Client for:**
- Real-time game state (players, cards, turns)
- Game actions (play card, draw card, end turn)
- Live updates during gameplay

**Use TanStack Query for (if needed):**
- User authentication/profiles (outside game)
- Game history/stats fetching
- Leaderboards
- Non-real-time data

**Use Zustand for:**
- UI state (modals open/closed, selected cards)
- Client-side preferences (sound volume, animations on/off)
- Temporary view state that doesn't need server sync

### 4. Turn-Based Validation
**ALL actions must be validated server-side:**

```typescript
onMessage("play_card", (client, message) => {
  const player = this.state.players.get(client.sessionId);
  
  // Validate it's player's turn
  if (!this.isPlayerTurn(client.sessionId)) {
    client.send("error", "Not your turn!");
    return;
  }
  
  // Validate card in hand
  const card = player.hand.find(c => c.id === message.cardId);
  if (!card) {
    client.send("error", "Card not in hand!");
    return;
  }
  
  // Validate can play
  if (!card.canPlay(this.state, player)) {
    client.send("error", "Cannot play this card!");
    return;
  }
  
  // Apply
  card.apply(this.state, player, message.target);
});
```

## File Structure

```
backyard-rocketeers/
├── docs/
│   ├── GAME_RULES.md          ← Read this first!
│   ├── CARDS_CATALOG.md       ← All card implementations
│   └── ARCHITECTURE.md        ← System design (optional)
├── client/                    ← React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Game/
│   │   │   │   ├── GameBoard.tsx
│   │   │   │   ├── PlayerHand.tsx
│   │   │   │   ├── Rocket.tsx
│   │   │   │   └── CardComponent.tsx
│   │   │   └── UI/
│   │   │       ├── Button.tsx
│   │   │       └── Modal.tsx
│   │   ├── hooks/
│   │   │   ├── useGameRoom.ts    ← Colyseus connection
│   │   │   └── useCards.ts
│   │   ├── stores/
│   │   │   └── uiStore.ts        ← Zustand (UI state only)
│   │   ├── lib/
│   │   │   └── colyseus.ts       ← Colyseus client setup
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── server/                    ← Colyseus backend
│   ├── src/
│   │   ├── rooms/
│   │   │   └── GameRoom.ts       ← Main game logic
│   │   ├── schemas/
│   │   │   ├── GameState.ts
│   │   │   ├── Player.ts
│   │   │   └── CardSchema.ts
│   │   ├── cards/
│   │   │   ├── Card.ts           ← Base card class
│   │   │   ├── SabotageCard.ts
│   │   │   ├── ComponentCard.ts
│   │   │   ├── AbilityCard.ts
│   │   │   ├── EnhancementCard.ts
│   │   │   └── implementations/
│   │   │       ├── PlantBombCard.ts
│   │   │       ├── ShootRPGCard.ts
│   │   │       └── ... (all 89 cards)
│   │   ├── utils/
│   │   │   ├── dice.ts
│   │   │   └── validation.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── CLAUDE.md                  ← This file
└── README.md
```

## Implementation Phases

### Phase 1: Core Infrastructure (Week 1)
**Goal:** Get basic multiplayer working

- [ ] Set up Colyseus server with GameRoom
- [ ] Define GameState schema (Player, Rocket, basic state)
- [ ] Implement turn system (draw card, play card, end turn)
- [ ] Create React app with Vite + Colyseus client connection
- [ ] Build basic UI: game board, player hand, rocket display
- [ ] Implement 5 test cards (1 of each type) as proof of concept

**Test Milestone:** 2 players can join, take turns, play test cards

### Phase 2: Level 1 Complete (Week 2)
**Goal:** Fully playable Level 1

- [ ] Implement Launch Pad system (6 slots)
- [ ] Implement all rocket component cards (Fuselage, Nose, Fins, Thruster)
- [ ] Implement fuel system (fuel tanks, 100% requirement)
- [ ] Implement launch procedure (roll checks, failure handling)
- [ ] Implement basic sabotage (damage calculation, component destruction)
- [ ] Implement covert card system (max 2, hidden display)
- [ ] Build rocket builder UI with Framer Motion animations
- [ ] Build launch sequence UI

**Test Milestone:** Complete Level 1 game from build to launch

### Phase 3: Level 2 Complete (Week 3)
**Goal:** Space travel working

- [ ] Implement zone system on game board
- [ ] Implement distance tracking and movement
- [ ] Implement space fuel system
- [ ] Implement navigation error system
- [ ] Implement cumulative damage tracking
- [ ] Implement landing procedure
- [ ] Build space board UI with zones
- [ ] Build position tracking UI

**Test Milestone:** Travel from Earth to Mars and land

### Phase 4: Level 3 Complete (Week 4)
**Goal:** Mars surface operations

- [ ] Implement triple resource system (power, distance, signal)
- [ ] Implement rover system with malfunction checks
- [ ] Implement generator system
- [ ] Implement communication system
- [ ] Implement win condition checking
- [ ] Build Mars surface UI
- [ ] Build resource counters UI

**Test Milestone:** Full game playable from Level 1 to victory

### Phase 5: All Cards (Week 5-6)
**Goal:** Implement all 89 cards

- [ ] Level 1 Sabotage cards (18 cards)
- [ ] Level 1 Component cards (40 cards)
- [ ] Level 1 Ability cards (6 cards)
- [ ] Level 1 Enhancement cards (6 cards)
- [ ] Level 2 cards (all types)
- [ ] Level 3 cards (all types)
- [ ] Cross-level cards
- [ ] Covert cards mechanics

**Test Milestone:** Every card works as designed

### Phase 6: Polish (Week 7)
**Goal:** Production-ready

- [ ] Animations with Framer Motion (card play, movement, explosions)
- [ ] Sound effects
- [ ] Reconnection handling
- [ ] Spectator mode
- [ ] Game history log
- [ ] Tutorial/help system
- [ ] Mobile responsive design (Tailwind breakpoints)

## Coding Standards

### TypeScript
- **Strict mode enabled**
- All functions have return types
- No `any` types (use `unknown` and type guards)
- Use discriminated unions for card types

### Naming Conventions
- **Classes:** PascalCase (ShootRPGCard, GameState)
- **Functions/Methods:** camelCase (canPlay, execute)
- **Constants:** SCREAMING_SNAKE_CASE (MAX_COVERT_CARDS)
- **Files:** kebab-case (shoot-rpg-card.ts, game-state.ts)
- **React Components:** PascalCase files (GameBoard.tsx, CardComponent.tsx)

### Comments
- JSDoc for all public methods
- Inline comments for complex game logic
- Reference rule document sections when implementing rules

```typescript
/**
 * Executes the Shoot RPG card effect.
 * See GAME_RULES.md - "Sabotage in Level 1" section.
 * 
 * @param gameState - Current game state
 * @param caster - Player playing the card
 * @param target - Target player
 */
execute(gameState: GameState, caster: Player, target: Player): void {
  // Roll 1d6 for bonus destruction chance
  const roll = gameState.rollDice(1)[0];
  
  // Rule: 5-6 destroys 2 components, otherwise 1
  const destroyCount = roll >= 5 ? 2 : 1;
  
  target.destroyComponents(destroyCount);
}
```

## Common Pitfalls to Avoid

### ❌ DON'T DO THIS:
```typescript
// Don't use string-based effects
const card = {
  effect: "destroy_component",
  params: { count: 1 }
};

// Don't mutate state directly (Colyseus handles this)
player.hand.push(newCard); // ❌ Wrong

// Don't trust client-side validation only
if (clientSaysCanPlay) { // ❌ Always validate server-side
  executeCard();
}

// Don't use TanStack Query for real-time game state
const { data: gameState } = useQuery(['game']); // ❌ Wrong - use Colyseus
```

### ✅ DO THIS:
```typescript
// Use class-based cards with embedded logic
class ShootRPGCard extends SabotageCard {
  execute(gameState, caster, target) {
    // Implementation here
  }
}

// Use Colyseus state updates
this.state.players.get(playerId).hand.push(newCard); // ✅ Correct

// Always validate server-side
onMessage("play_card", (client, message) => {
  // Validate on server
  if (!this.canPlayCard(client, message.cardId)) {
    return; // Reject
  }
  // Then execute
});

// Use Colyseus for game state
const gameState = room.state; // ✅ Real-time synced
room.send("play_card", { cardId }); // ✅ Server handles it

// Use Zustand only for UI state
const { modalOpen, setModalOpen } = useUIStore(); // ✅ Local UI state
```

## When You're Stuck

### Problem: Not sure how a rule works
**Solution:** Search `GAME_RULES.md` for the rule section, read carefully

### Problem: Card effect is complex
**Solution:** Look at `CARDS_CATALOG.md` for that card's implementation pseudocode

### Problem: State not syncing between clients
**Solution:** Check Colyseus Schema types, ensure all fields have `@type()` decorator

### Problem: Turn order getting confused
**Solution:** Review turn system in `GAME_RULES.md` - "Turn Structure" section

### Problem: Card validation failing
**Solution:** Add detailed logging, check against validation rules in base Card class

### Problem: Animations not smooth
**Solution:** Use Framer Motion's `motion` components with proper layout animations

## Key Implementation Notes

### Covert Cards
- Stored as `{ id, revealed: boolean }` in schema
- Client only shows card details if `revealed === true` OR `owner === currentPlayer`
- Server tracks all card details regardless of revealed state
- Max 2 unrevealed covert cards per player at any time

### Dice Rolling
- MUST be done server-side for security
- Results broadcast to all players
- Use `crypto.randomInt()` for true randomness, not `Math.random()`

### Cross-Level Cards
- Cards available in multiple levels stored in separate level decks
- When player advances level, check card's `levels` array
- Keep cards that include new level, discard others

### Win Condition
- Check ONLY at end of player's turn
- Must have all 3 resources simultaneously in Level 3
- Broadcast winner immediately, end game

## Security Considerations

### Never Trust the Client
- Validate all actions server-side
- Verify player owns cards they play
- Verify targets are valid
- Verify it's player's turn

### Prevent Cheating
- Card IDs should be UUIDs, not sequential
- Covert cards hidden from opponent clients
- Dice rolls happen server-side only
- Game state is authoritative source of truth

## Deployment

### Development
```bash
# Terminal 1: Start backend
cd server && npm run start

# Terminal 2: Start frontend  
cd client && npm run start
```

## Questions to Ask Yourself

Before implementing any feature:
1. ✅ Have I read the relevant section in `GAME_RULES.md`?
2. ✅ Does this card's implementation match `CARDS_CATALOG.md`?
3. ✅ Is this validated server-side?
4. ✅ Does this work in multiplayer (2-6 players)?
5. ✅ Is the state synchronized via Colyseus Schema?
6. ✅ Are edge cases handled (empty hand, destroyed rocket, etc.)?
7. ✅ Am I using the right tool? (Colyseus for game state, Zustand for UI, TanStack Query for non-realtime data)

## Final Notes

- **Read `GAME_RULES.md` first** - It contains ALL game mechanics
- **Reference `CARDS_CATALOG.md`** when implementing cards
- **Use Colyseus for all game state** - It's built for this
- **Use Zustand only for UI state** - Modal open/closed, preferences, etc.
- **Use TanStack Query only if needed** - For non-realtime HTTP requests
- **Class-based cards** - Each card is a class, not JSON + registry
- **Server is authority** - All validation and dice rolls server-side
- **Test multiplayer** - Always test with 2+ connected clients

---

**When in doubt, refer back to the docs folder. Everything you need is documented.**