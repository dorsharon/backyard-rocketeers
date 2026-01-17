# Backyard Rocketeers

A turn-based multiplayer card game for 2-6 players. Race to Mars by building rockets, traveling through space, and landing on the alien base!

## Game Overview

**Backyard Rocketeers** is a competitive multiplayer card game with 3 distinct levels:

1. **Level 1: Rocket Construction** - Build your rocket on Earth with the right components and fuel
2. **Level 2: Space Travel** - Navigate through space, avoiding hazards and sabotage
3. **Level 3: Mars Surface** - Deploy rovers, generators, and communication equipment to reach the Alien Base

First player to complete all 3 levels wins!

## Tech Stack

### Backend
- **Colyseus** - Multiplayer game server with WebSocket support
- **TypeScript** - Type-safe server code
- **Express** - HTTP server

### Frontend
- **React 19** - UI framework
- **Vite** - Fast build tool
- **TypeScript** - Type-safe client code
- **Zustand** - UI state management
- **Colyseus Client** - Real-time game state synchronization

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Install backend dependencies:**
```bash
cd server
npm install
```

2. **Install frontend dependencies:**
```bash
cd client
npm install
```

### Running the Game

**Terminal 1 - Start the backend server:**
```bash
cd server
npm run start
```

The server will start on `http://localhost:2567`

**Terminal 2 - Start the frontend client:**
```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`

### Testing Multiplayer

1. Open your browser to `http://localhost:5173`
2. Enter a player name and click "Join Game"
3. Open a second browser window (or incognito window) to the same URL
4. Enter a different player name and join
5. Both players should see each other in the player list
6. Click "Mark Ready" on both clients
7. Click "Start Game" to begin!

## Project Structure

```
backyard-rocketeers/
├── docs/                     # Game rules and card catalog
│   ├── GAME_RULES.md        # Complete game mechanics
│   └── CARDS_CATALOG.md     # All 89 cards
├── server/                   # Colyseus backend
│   ├── src/
│   │   ├── index.ts         # Server entry point
│   │   ├── rooms/
│   │   │   └── GameRoom.ts  # Main game logic
│   │   ├── schemas/
│   │   │   ├── GameState.ts # Game state schema
│   │   │   ├── Player.ts    # Player schema
│   │   │   └── CardSchema.ts # Card schema
│   │   └── utils/
│   │       └── dice.ts      # Dice rolling utilities
│   └── package.json
└── client/                   # React frontend
    ├── src/
    │   ├── main.tsx         # Entry point
    │   ├── App.tsx          # Root component
    │   ├── lib/
    │   │   └── colyseus.ts  # Colyseus client setup
    │   ├── hooks/
    │   │   └── useGameRoom.ts # Game room hook
    │   ├── stores/
    │   │   └── uiStore.ts   # UI state (Zustand)
    │   └── components/
    │       └── Game/
    │           └── GameBoard.tsx # Main game board
    └── package.json
```

## Development Status

### ✅ Phase 1: Core Infrastructure (COMPLETED)
- [x] Backend server with Colyseus
- [x] Game state schemas (GameState, Player, Card)
- [x] Frontend client with React + Vite
- [x] Colyseus connection and synchronization
- [x] Basic UI for player lobby
- [x] Turn system foundation
- [x] Dice rolling utilities

### 🚧 Phase 2: Level 1 - Rocket Construction (IN PROGRESS)
- [ ] Card system foundation (base classes)
- [ ] Launch Pad and component system
- [ ] Fuel system
- [ ] Launch procedure
- [ ] Sabotage mechanics
- [ ] Covert card system
- [ ] Level 1 UI

### 📋 Phase 3: Level 2 - Space Travel (PLANNED)
### 📋 Phase 4: Level 3 - Mars Surface (PLANNED)
### 📋 Phase 5: All 89 Cards (PLANNED)
### 📋 Phase 6: Advanced Features (PLANNED)
### 📋 Phase 7: Polish & Testing (PLANNED)

## Game Rules

See [docs/GAME_RULES.md](docs/GAME_RULES.md) for complete game mechanics, rules, and win conditions.

## Card Catalog

See [docs/CARDS_CATALOG.md](docs/CARDS_CATALOG.md) for all 89 cards with detailed implementations.

## Contributing

This project follows the implementation guidelines in [CLAUDE.md](CLAUDE.md).

## License

MIT
