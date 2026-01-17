# BACKYARD ROCKETEERS - COMPLETE GAME RULES

**Version:** 1.0  
**Last Updated:** 2025-01-18  
**For:** Implementation by Claude Code

---

## GAME OVERVIEW

### Basic Information
- **Players:** 2-6
- **Type:** Turn-based multiplayer card game
- **Objective:** First player to reach the Alien Base on Mars wins
- **Levels:** 3 sequential levels (must complete in order)
- **Average Game Time:** 45-60 minutes

### Victory Condition
Be the first player to complete all 3 levels:
1. **Level 1:** Build a rocket with required components + 100% fuel, then successfully launch
2. **Level 2:** Travel through space from starting distance to Mars orbit (0km)
3. **Level 3:** Collect 100% power + 20km rover distance + 3 signal strength, then reach Alien Base

---

## GAME SETUP

### Initial Setup
1. **Separate card decks:** Create 3 separate piles for Level 1, 2, and 3 cards
2. **Shuffle each deck:** Shuffle all three decks separately
3. **Starting hands:** Each player draws 5 cards from the Level 1 deck
4. **Determine first player:** All players roll 2d6, highest total goes first
5. **Turn order:** Clockwise from first player

### Game Board Setup
- Place distance zone markers (for Level 2)
- Prepare dice (3x six-sided dice)
- Each player gets a player token

---

## CARD SYSTEM

### Card Types

#### 1. Component Cards
**Purpose:** Build rockets, rovers, generators, and equipment

**Subtypes:**
- **Base:** Launch Pad (required to start building)
- **Rocket Parts:** Fuselage, Nose Cone, Stabilizer Fins, Thrusters, Boosters
- **Defense Systems:** Anti-Missile System, Anti-Asteroid System
- **Fuel Tanks:** Small (+10%), Large (+20%), Extra Large (+50%)
- **Mars Equipment:** Rovers, Power Generators, Communication Gear

**Component Tiers:**
- **Improvised (Tier 1):** Strength 1, lowest quality, highest failure rate
- **Second-hand (Tier 2):** Strength 2, medium quality, moderate failure rate
- **Cutting Edge (Tier 3):** Strength 3, highest quality, minimal/no failure rate

**Component Strength:**
- Each component has a strength value (0-3)
- Rocket's total strength = sum of all component strength values
- Used to resist sabotage attacks

#### 2. Sabotage Cards
**Purpose:** Attack opponents, slow their progress, destroy components

**Single-use:** Played once, then discarded

**Examples:**
- Direct damage (Shoot RPG, Plant Bomb)
- Roll vs. strength (Asteroid Storm, Missile Attack)
- Position manipulation (Tractor Beam, Wormhole)
- Resource theft (Resource Raid, Hostile Takeover)

#### 3. Ability Cards
**Purpose:** Powerful one-time effects

**Single-use:** Discard after playing

**Examples:**
- Movement (Teleport, Warp Drive)
- Upgrades (R&D Team, Reverse Engineering)
- Utility (X-Ray Machine, Repair Kit)
- Defense (Newton's Third Law - reactive)

#### 4. Enhancement Cards
**Purpose:** Ongoing advantages that persist

**Persistent:** Remain in play until destroyed or level ends

**Examples:**
- Passive generation (Ion Thrusters +3km/turn)
- Information (Intelligence Agency, Spy Satellite)
- Protection (UHF Transceiver, Long Range Radar)
- Synergy (Solar Sail + Solar Wind)

### Covert Cards

**What are Covert Cards:**
- Certain cards can be placed face-down (hidden from opponents)
- Opponents cannot see what the card is until revealed
- Maximum 2 covert cards at any time per player

**Covert Cards List:**
- Level 1: Plant Bomb, Staging, Anti-Missile System, Anti-Asteroid System, Insurance Policy, Enigma Machine
- Level 2: Heat Shield
- Level 3: Backup Rover

**Revealing Covert Cards:**

**Voluntary Reveal:**
- When you choose to activate/use the card
- Announce what it is, flip face-up, apply effect

**Forced Reveal:**
- X-Ray Machine (ability): Target player reveals if they have Plant Bomb
- Security Audit (ability): Target player reveals one covert card (they choose which)
- Intelligence Agency (enhancement): See covert actions played on you

**After Revealing:**
- Card is now visible to all players
- No longer counts toward covert limit
- Remains in play (if enhancement) or is discarded (if ability/sabotage)

### Cross-Level Cards

**Cards Available in Multiple Levels:**

| Card Name | L1 | L2 | L3 | Notes |
|-----------|----|----|----|----|
| Small Fuel Tank | ✓ | ✓ | ✓ | Universal fuel |
| Large Fuel Tank | ✓ | ✓ | ✓ | Universal fuel |
| Extra Large Fuel Tank | ✓ | ✓ | - | Not needed in L3 |
| Newton's Third Law | ✓ | ✓ | ✓ | Reflects sabotage |
| Laser Cannon | - | ✓ | ✓ | Destroys rockets or rovers |
| Heat Shield | - | ✓ | ✓ | Blocks rays or landing bonus |
| Solar Sail | ✓ | ✓ | - | Works in space only |

---

## TURN STRUCTURE

### Standard Turn Sequence

**1. Draw Phase**
- Draw 1 card from your current level deck
- Exception: Players 1+ level behind draw 2 cards (comeback mechanic)

**2. Action Phase**
You may perform any/all of the following actions in any order:
- Place or replace 1 component card (once per turn maximum)
- Play any number of sabotage cards (must have valid targets)
- Play any number of ability cards (single-use, then discard)
- Play enhancement cards (remain in play)
- Activate covert cards

**3. Discard Phase**
- If you have more than 7 cards in hand, discard down to 7
- Choose which cards to discard

**Turn ends, next player's turn begins.**

### Hand Limit
- Maximum 7 cards in hand at end of turn
- During your turn, you can temporarily exceed 7 (from drawing/stealing)
- Must discard down to 7 before ending turn

---

## LEVEL 1: ROCKET CONSTRUCTION

### Level 1 Objective
Build a complete, flyable rocket with all required components and sufficient fuel, then successfully launch into space.

### Launch Pad System

**Required First Step:**
- Must play a Launch Pad card before placing any rocket components
- Launch Pad has 6 component slots total:
  - 4 required slots (Fuselage, Nose Cone, Stabilizer Fins, Thruster)
  - 2 optional slots (Boosters, Defense Systems, Staging, etc.)

**Component Placement Rules:**
- Cannot place duplicate component types (e.g., cannot have 2 Fuselages)
- Exception: Special cards may allow duplicates
- Can replace components (discard old, place new in same turn)

### Required Components for Flight

**Your rocket MUST have these 4 components:**

1. **Fuselage** (Body)
   - The main structure of your rocket
   - Has strength value
   - Can fail during launch based on tier

2. **Nose Cone** (For Landing)
   - Needed for safe landing on Mars
   - Affects landing success rate
   - Higher tier = better landing chance

3. **Stabilizer Fins** (Navigation)
   - Prevents navigation errors in Level 2
   - Lower tier = more frequent navigation errors
   - Higher tier = fewer/no navigation errors

4. **Thruster** (Engine)
   - Powers your rocket
   - Can fail during launch based on tier
   - Required to move in Level 2

**Optional Components (enhance performance):**
- Boosters (increase speed in Level 2)
- Staging (backup thruster)
- Defense Systems (Anti-Missile, Anti-Asteroid)

### Fuel System

**Fuel Requirements:**
- Must accumulate exactly 100% fuel capacity to launch
- Fuel over 100% is wasted (unless you have special enhancement cards)

**Fuel Tank Types:**
- Small Fuel Tank: +10% capacity
- Large Fuel Tank: +20% capacity
- Extra Large Fuel Tank: +50% capacity

**Example:** Small (10%) + Large (20%) + Small (10%) + Large (20%) + XL (50%) = 110% (only 100% counts)

**Important:** Level 1 uses "Ground Fuel" - this is different from "Space Fuel" in Level 2

### Rocket Strength Calculation

**Total Rocket Strength = Sum of all component strength values**

Example Rocket:
- Launch Pad: Strength 0
- Improvised Fuselage: Strength 1
- Second-hand Nose Cone: Strength 2
- Cutting Edge Stabilizer Fins: Strength 3
- Cutting Edge Thruster: Strength 3
- Solid Boosters: Strength 2
- **Total Strength: 11**

This strength value is used to resist sabotage attacks.

### Sabotage in Level 1

**Type 1: Damage-Based Sabotage**

Process:
1. Attacker plays sabotage card
2. Roll dice as specified on card (usually 3d6)
3. Compare roll total to defender's rocket strength
4. If roll > strength: Deal damage = (roll - strength)
5. Defender must discard components worth exactly that damage amount

Example:
- Defender has rocket with strength 10
- Attacker plays Asteroid Storm, rolls 3d6 = 15
- Damage = 15 - 10 = 5
- Defender must discard components totaling strength 5
  - Could discard: Cutting Edge Thruster (3) + Second-hand Nose Cone (2) = 5
  - Or: Improvised Fuselage (1) + Solid Boosters (2) + Second-hand Nose Cone (2) = 5

**Type 2: Targeted Sabotage**

Some cards destroy specific components directly:
- "Shoot An RPG" → Choose 1 component, it's destroyed
- "Plant Bomb" → Place hidden, detonate later to destroy chosen component
- "Switch Parts" → Swap one of your components with opponent's same type

**Type 3: Non-Destructive Sabotage**

- "Inspection Delay" → Opponent can't place components next turn
- "Resource Raid" → Steal fuel tank card from opponent's hand
- "Industrial Espionage" → See opponent's hand for 2 turns

### Defense Against Sabotage

**Covert Defense Systems:**
- Anti-Missile System (covert): When missiles attack, attacker only rolls 1d6 instead of 3d6
- Anti-Asteroid System (covert): When asteroids attack, attacker only rolls 1d6 instead of 3d6
- Surprise factor: Opponent doesn't know you have protection until they attack

**Active Defense:**
- Intelligence Agency (enhancement): See covert sabotage played on you
- X-Ray Machine (ability): Detect if bombs are planted on your rocket
- Newton's Third Law (ability): Reflect sabotage back at attacker

### Rocket Destruction

**If your rocket's strength is reduced to 0 or below:**
1. Your rocket is destroyed
2. Keep your Launch Pad (if you have one)
3. Discard all other components to discard pile
4. Start rebuilding from scratch

**Exception - Insurance Policy:**
- If you played Insurance Policy (covert) before destruction
- When rocket is destroyed, you keep 2 components of your choice
- Speeds up rebuilding

### Launch Procedure

**When you're ready to launch (all components + 100% fuel):**

**Step 1: Declare Launch**
- Announce on your turn that you're launching
- No turning back once declared

**Step 2: Component Failure Checks**
- Roll 1d6 for each component separately
- Check against component's failure rate:
  - **Improvised:** Fails on roll of 1 or 2 (33% failure rate)
  - **Second-hand:** Fails on roll of 1 (16% failure rate)
  - **Cutting Edge:** Never fails (no roll needed)

**Step 3: Launch Result**
- **If ANY component fails:**
  - Launch is scrubbed (failed)
  - Discard the failed component(s)
  - Must rebuild and try again next turn
  
- **If ALL components pass:**
  - Launch successful! 🚀
  - Advance to Level 2
  - Proceed to Level transition (see below)

### Transitioning to Level 2

**When you successfully launch:**

1. **Discard Level 1-only cards from hand:**
   - Remove all cards that are only available in Level 1
   - Keep cross-level cards (Fuel Tanks, Newton's Third Law, Solar Sail)

2. **Draw new cards:**
   - Draw 3 cards from Level 2 deck

3. **Determine starting distance:**
   - Roll 3d6 and multiply by 1,000
   - This is your distance from Mars in kilometers
   - Example: Roll 8 = 8,000km starting distance

4. **Reset fuel:**
   - Your fuel is now at 0% (consumed during launch)
   - Must refuel before you can begin traveling

5. **Place token on board:**
   - Place your player token at your starting distance on the zone board

6. **You are now in Level 2**
   - Begin playing on your next turn

---

## LEVEL 2: SPACE TRAVEL

### Level 2 Objective
Travel through space, reducing your distance from Mars to 0km to enter Mars orbit.

### Starting Level 2

**Initial State:**
- Fuel: 0% (consumed during launch)
- Distance: 3d6 × 1,000 km (random starting distance)
- Rocket: All components from Level 1 are still installed
- Hand: Any cross-level cards + 3 new Level 2 cards

**Before You Can Move:**
- Must refuel to at least some fuel percentage
- Movement cards/abilities require fuel (except Ion Thrusters enhancement)

### Zone System

**The Game Board:**
- Divided into 10km zones: 0-10km, 10-20km, 20-30km, etc.
- Each player token is placed in their respective zone

**Zone-Based Targeting:**
- You can only sabotage players in:
  - Your same zone, OR
  - Adjacent zones (±1 zone from yours)
  
Example:
- You're at 50km zone
- Can sabotage players in: 40-50km, 50-60km, 60-70km zones
- Cannot sabotage players at 80km+ (too far away)

**Strategic Positioning:**
- Can choose to rush ahead (avoid attacks but isolated)
- Can choose to stay near others (more targets but more danger)

### Fuel System in Level 2

**Space Fuel (Different from Ground Fuel):**
- Must use Space Fuel Tank cards
- Small Space Fuel Tank: +10%
- Large Space Fuel Tank: +20%
- Extra Large Space Fuel Tank: +50%

**Refueling:**
- Play fuel tank cards to add to your fuel %
- Can refuel anytime on your turn

**Running Out of Fuel:**
- If fuel reaches 0%, you cannot play movement cards
- Exception: Ion Thrusters enhancement provides +3km/turn even without fuel
- Can still play abilities like "Space Gas Station" (+30% instant fuel)

### Movement System

**Ways to Move Forward:**

1. **Movement Cards:**
   - Teleport: +10km
   - Warp Drive Generator: +50km
   
2. **Booster Components (from Level 1):**
   - Improvised Boosters: +10km per turn
   - Solid Rocket Boosters: +30km per turn
   - Hypergolic Boosters: +70km per turn
   - Boosters provide passive movement each turn

3. **Enhancement Cards:**
   - Ion Thrusters: +3km every turn (even without fuel!)
   
4. **Ability Cards:**
   - Emergency Thrusters: +15km but lose 20% fuel
   - Asteroid Mining: Roll 3d6, gain that many km + 20% fuel
   - Space Gas Station: +30% fuel (enables movement)

**Movement Resolution:**
- On your turn, calculate total movement
- Subtract from your current distance
- Update your position on the board
- Move your token to new zone

Example:
- Current distance: 100km
- Play Teleport (+10km) + Ion Thrusters enhancement (+3km) + Solid Boosters (+30km) = 43km total
- New distance: 100 - 43 = 57km

### Navigation Errors

**Based on Stabilizer Fin Quality:**

Each turn, roll 1d6 to check for navigation errors:

- **Improvised Fins:**
  - On roll of 1-4: Navigation error occurs
  - Lose 10km (go backward)
  - 66% chance of error
  
- **Second-hand Fins:**
  - On roll of 1-2: Navigation error occurs
  - Lose 10km (go backward)
  - 33% chance of error
  
- **Cutting Edge Fins:**
  - No navigation errors
  - No roll needed

**Navigation Error Resolution:**
- If error occurs: Add 10km to your current distance (sets you back)
- This happens before applying forward movement

### Rocket Damage in Level 2

**Important Change from Level 1:**
- You no longer lose individual components
- Instead, track cumulative damage points

**Damage Tracking:**
- When sabotage deals damage, track the total
- Keep sabotage cards that hit you as reminders
- When cumulative damage ≥ your rocket's original strength → Rocket explodes

Example:
- Your rocket has total strength 12
- Turn 5: Asteroid Storm deals 3 damage (cumulative: 3)
- Turn 8: Missile Attack deals 5 damage (cumulative: 8)
- Turn 12: Cosmic Rays deals 4 damage (cumulative: 12)
- Rocket is destroyed (12 ≥ 12)

**Rocket Explosion:**
- If your rocket explodes in space:
  - You are eliminated from Level 2
  - Return to Level 1
  - Start over from the beginning
  - Keep any cross-level cards in hand

### Sabotage in Level 2

**Common Sabotage Types:**

**1. Damage-Based (roll vs. strength):**
- Asteroid Storm: Roll 3d6 vs. strength
- Missile Attack: Roll 3d6 vs. strength, destroys Spy Satellite if present
- Cosmic Rays: Roll 3d6 vs. Fuselage strength only
- Space Dust: Roll 1d6, affects lower-quality components

**2. Position Manipulation:**
- Tractor Beam: Pull target back 20km
- Cyber Attack: Send target back 50km
- Wormhole: Roll 1d6 (1-3 = back 30km, 4-6 = forward 30km)
- Collision Course: Two players in same/adjacent zones both lose 20km

**3. Movement Prevention:**
- Van-Allen Belts: Trap player for 2 turns (cannot move)

**Defense Systems:**
- Anti-Missile System (covert): Missiles only roll 1d6 instead of 3d6
- Anti-Asteroid System (covert): Asteroids only roll 1d6 instead of 3d6
- UHF Transceiver (enhancement): Immune to Cyber Attack
- Thermal Radiation Meter (enhancement): Detect and avoid Cosmic Rays
- Long Range Radar (enhancement): Detect and avoid Asteroid Storms

### Reaching Mars Orbit

**When your distance reaches 0km:**
- You've reached Mars orbit
- Must attempt landing
- Proceed to Landing Procedure

### Landing Procedure

**Landing Check (based on Nose Cone quality):**

Roll 1d6:

- **Improvised Nose Cone:**
  - Fails on roll of 1-2
  - 33% crash rate
  - If fail: Eliminated from game
  
- **Second-hand Nose Cone:**
  - Fails on roll of 1
  - 16% crash rate
  - If fail: Eliminated from game
  
- **Cutting Edge Nose Cone:**
  - +20% landing bonus
  - Almost guaranteed success
  - Roll with advantage (roll 2d6, take higher)

**Landing Bonuses (stack with Nose Cone):**
- Heat Shield (if you kept it): +20% landing chance (roll 2d6, take higher)
- Drag Chute ability: +30% landing chance (roll 3d6, take highest)
- Sky Crane enhancement: 100% safe landing (no roll needed, automatic success)

**Landing Result:**
- **Success:** Advance to Level 3
- **Failure (Crash):** Eliminated from game (out of this match)

**Note:** Consider playing landing bonus cards BEFORE attempting landing roll

### Transitioning to Level 3

**When you successfully land:**

1. **Discard Level 2-only cards from hand:**
   - Remove all cards that are only available in Level 2
   - Keep cross-level cards (Fuel Tanks, Newton's Third Law, Laser Cannon, Heat Shield)

2. **Draw new cards:**
   - Draw 3 cards from Level 3 deck

3. **You are now on Mars surface**
   - Begin playing Level 3 on your next turn

---

## LEVEL 3: MARS SURFACE OPERATIONS

### Level 3 Objective
Collect ALL THREE resources simultaneously:
1. 100% Power (from generators)
2. 20km Distance (from rover travel)
3. 3 Signal Strength (from communication equipment)

When you have all three, you reach the Alien Base and WIN THE GAME.

### The Triple Resource System

**Why Three Resources:**
- Power: Charge your rover
- Distance: Rover must travel 20km across Mars surface
- Signal: Must communicate with Alien Base

All three are required simultaneously to win.

### Resource 1: Power Collection

**Goal:** Accumulate 100% power total

**How to Collect Power:**
Deploy power generator components that provide % per turn:

- **Windmill Generator:** 10% power per turn
- **Improvised Solar Panels:** 10% power per turn
- **Second-Hand Solar Panels:** 20% power per turn
- **Cutting Edge Solar Panels:** 30% power per turn
- **Geothermal Power Plant:** 50% power per turn

**Power Generation:**
- Each generator you have deployed provides power every turn automatically
- Power accumulates until you reach 100%
- Multiple generators stack (can have multiple at once)

Example:
- Turn 1: Deploy Cutting Edge Solar Panels (30%/turn)
- Turn 2: Gain 30% power (total: 30%)
- Turn 3: Deploy Windmill Generator (10%/turn), gain 30%+10%=40% (total: 70%)
- Turn 4: Gain 40% (total: 110%) ✓ Power requirement met (100%+)

**Power Sabotage:**
- Dust Storm: Blocks solar panels for 3 turns (doesn't affect windmill/geothermal)
- Power Flow Re-routing: Steals one of your generators
- Signal Jammer: Reduces signal (different resource)

**Power Enhancements:**
- Solar Panel Efficiency: All solar panels produce +5% additional power/turn

### Resource 2: Rover Distance

**Goal:** Accumulate 20km total distance

**How to Collect Distance:**
Deploy rover components that provide km per turn:

- **Improvised Mars Rover:** 3km per turn
- **Second-Hand Mars Rover:** 5km per turn
- **Cutting Edge Mars Rover:** 7km per turn

**Rover Malfunction System:**

Each turn, roll 1d6 for each rover you have:

- **Improvised Rover:**
  - Fails on roll of 1-3 (50% failure rate)
  - If fails: Rover breaks down, stops providing distance
  
- **Second-Hand Rover:**
  - Fails on roll of 1-2 (33% failure rate)
  - If fails: Rover breaks down
  
- **Cutting Edge Rover:**
  - Fails on roll of 1 (16% failure rate)
  - If fails: Rover breaks down

**Broken Rovers:**
- A broken rover provides 0km/turn until repaired
- Repair Kit ability: Fixes a broken rover (yours or opponent's)
- Can have multiple rovers (backup strategy)

**Rover Distance Accumulation:**

Example:
- Turn 1: Deploy Second-Hand Rover (5km/turn), roll 1d6=4 (success), gain 5km (total: 5km)
- Turn 2: Roll 1d6=2 (fail! rover breaks down), gain 0km (total: 5km)
- Turn 3: Play Repair Kit, rover fixed, roll 1d6=5 (success), gain 5km (total: 10km)
- Turn 4: Deploy Improvised Rover (3km/turn), roll for both: Second-hand=success, Improvised=fail, gain 5km (total: 15km)
- Turn 5: Repair Improvised, both work, gain 5+3=8km (total: 23km) ✓ Distance met (20km+)

**Rover Sabotage:**
- Rover Sabotage: Forces immediate malfunction check (1-3 = breakdown)
- Alien Interference: Rover goes wrong direction, lose 10km
- Laser Cannon: Destroys rover completely

**Rover Enhancements:**
- All-Terrain Wheels: Rover provides +2km additional distance per turn
- Backup Rover (covert): Auto-deploys providing 4km/turn if main rover fails

### Resource 3: Signal Strength

**Goal:** Accumulate 3 Signal Strength total

**How to Collect Signal:**
Deploy communication equipment components:

- **Basic Antenna:** +1 Signal Strength (permanent)
- **Satellite Dish:** +2 Signal Strength (permanent)
- **Deep Space Array:** +3 Signal Strength (permanent) ← Instant win on signal!

**Signal is Permanent:**
- Unlike power/distance, signal doesn't generate per turn
- Once deployed, you have that signal strength permanently
- Multiple components stack

Example:
- Turn 1: Deploy Basic Antenna (+1 signal) → Total: 1 signal
- Turn 3: Deploy Satellite Dish (+2 signal) → Total: 3 signal ✓ Signal requirement met
- Alternative: Turn 1: Deploy Deep Space Array (+3 signal) → Total: 3 signal ✓ Instant win!

**Signal Sabotage:**
- Signal Jammer: Reduces your signal strength by 1 (minimum 0)

**Signal Abilities:**
- Signal Booster: Gain +1 Signal Strength (doesn't require component, temporary)

**Signal Enhancements:**
- Signal Amplifier: All your communication components provide +1 additional signal
  - Basic Antenna becomes +2 instead of +1
  - Satellite Dish becomes +3 instead of +2
  - Deep Space Array becomes +4 instead of +3

### Winning the Game

**Check at end of your turn:**

If you have ALL THREE:
- ✓ 100% Power (or more)
- ✓ 20km Distance (or more)
- ✓ 3 Signal Strength (or more)

**You WIN! You've reached the Alien Base! 🎉**

**Important:** Must have all three simultaneously. If sabotage reduces any below threshold, you don't win yet.

Example Losing Scenario:
- You have: 100% power, 22km distance, 3 signal
- On opponent's turn: They play Signal Jammer, you now have 2 signal
- You don't win (missing signal requirement)
- Must rebuild signal to 3+ to win

### Sabotage in Level 3

**Resource-Specific Sabotage:**

**Power Attacks:**
- Dust Storm: Blocks solar panels for 3 turns (power generation stops)
- Power Flow Re-routing: Steals one of your generators

**Distance Attacks:**
- Rover Sabotage: Forces rover malfunction check
- Alien Interference: Lose 10km distance
- Laser Cannon: Destroys rover completely

**Signal Attacks:**
- Signal Jammer: Reduce signal strength by 1

**General:**
- Continue tracking rocket damage from Level 2
- If rocket reaches destruction threshold, start over at Level 1

---

## SPECIAL MECHANICS

### Comeback Mechanics

**Purpose:** Prevent runaway leaders, keep all players competitive

**Rule 1: Extra Draw for Trailing Players**
- Players who are 1 or more levels behind the leader draw 2 cards per turn instead of 1
- Example: Leader is in Level 3, you're in Level 1 → You draw 2 cards

**Rule 2: Cross-Level Sabotage Difficulty**
- Lower-level players can sabotage higher-level players
- But it's harder: Roll 2d6, need total of 8+ for sabotage to work
- If roll is 7 or below, sabotage fails (card is wasted)
- Same-level sabotage always works (no roll needed)

Example:
- You're Level 1, opponent is Level 2
- You play "Shoot RPG" targeting their rocket
- Roll 2d6 = 5+2 = 7 → Fails (need 8+)
- Card is discarded, no effect

### Covert Card System

**Covert Limit:**
- Maximum 2 covert cards on your rocket/equipment at once
- This limit applies only to unrevealed covert cards
- Once revealed, they don't count toward limit

**Placing Covert Cards:**
1. Play the card face-down on your rocket/equipment area
2. Announce "I'm placing a covert card" (don't say which one)
3. Card remains hidden from opponents

**Revealing Covert Cards:**

**Voluntary Reveal:**
- When you choose to activate/use the card
- Announce what it is, flip face-up, apply effect

**Forced Reveal:**
- X-Ray Machine (ability): Target player reveals if they have Plant Bomb
- Security Audit (ability): Target player reveals one covert card (they choose which)
- Intelligence Agency (enhancement): See covert actions played on you

**After Revealing:**
- Card is now visible to all players
- No longer counts toward covert limit
- Remains in play (if enhancement) or is discarded (if ability/sabotage)

### Reactive Cards

**Newton's Third Law:**
- Can be played in response to sabotage
- Not on your turn (reactive during opponent's turn)
- When opponent plays sabotage on you:
  - Declare "Newton's Third Law!"
  - Reflect the same effect back at attacker
  - Attacker suffers their own sabotage

**Timing:**
- Opponent declares sabotage
- Before resolving effect, you can play Newton's Third Law
- Effect is reflected, original sabotage doesn't affect you

### Dice Rolling Rules

**Standard Rolls:**
- Always use standard six-sided dice (d6)
- Roll specified number (1d6, 2d6, 3d6)
- Sum the results

**Advantage/Disadvantage:**
- Advantage: Roll 2d6, take the higher result
- Disadvantage: Roll 2d6, take the lower result
- Used for improved/worsened odds

**Failure Thresholds:**
- 1-2 on 1d6 = 33% failure
- 1 on 1d6 = 16% failure
- 5-6 on 1d6 = 33% success
- 4-6 on 1d6 = 50% success
- 3-6 on 1d6 = 66% success

### Hand Management Across Levels

**When Advancing to Next Level:**

1. **Identify cross-level cards in hand:**
   - Check each card's "levels" property
   - If card is available in new level, keep it
   - If card is NOT available in new level, discard it

2. **Discard level-specific cards:**
   - Place in discard pile

3. **Draw new level cards:**
   - Draw 3 cards from new level deck

4. **Continue playing:**
   - Next turn, you play at the new level

**Example - Advancing L1 to L2:**

Your hand:
- Launch Pad (L1 only) → Discard
- Small Fuel Tank (L1, L2, L3) → Keep
- Slingshot (L1 only) → Discard
- Solar Sail (L1, L2) → Keep
- Newton's Third Law (L1, L2, L3) → Keep
- Industrial Espionage (L1 only) → Discard
- Large Fuel Tank (L1, L2, L3) → Keep

After transition:
- Hand: Small Fuel Tank, Solar Sail, Newton's Third Law, Large Fuel Tank (4 cards)
- Draw 3 from L2 deck
- New hand: 7 cards total

---

## GAME END CONDITIONS

### Victory
- First player to collect 100% power + 20km distance + 3 signal strength in Level 3 wins immediately

### Elimination
- If your rocket explodes in Level 2, you restart at Level 1 (not eliminated)
- If you crash during landing (Level 2→3), you are eliminated
- Eliminated players are out of the game permanently

### Last Player Standing
- If all other players are eliminated or their rockets destroyed
- Last surviving player wins (even if not at Level 3 yet)

---

## IMPLEMENTATION NOTES FOR CLAUDE CODE

### Critical Implementation Points

**State Management:**
- Track each player's: level, position, hand, rocket/equipment, fuel%, power%, distance, signal
- Track global state: current turn, current player, decks, discard piles
- Track covert cards separately (hidden from other players)

**Validation:**
- Every card play must validate: Can player afford? Is target valid? Can card be played at this level?
- Movement must validate: Does player have fuel? Is distance calculation correct?
- Win condition must check: All three resources ≥ thresholds simultaneously?

**Turn System:**
- Enforce turn order (clockwise)
- Enforce hand limit at end of turn
- Track turn count for multi-turn effects (e.g., Dust Storm lasts 3 turns)

**Dice Rolling:**
- Implement true random rolls (crypto.randomInt, not Math.random)
- Log all rolls for transparency
- Allow roll verification

**Card Effects:**
- Each card needs executable logic
- Effects must update game state correctly
- Must handle cascading effects (e.g., rocket destruction triggers Insurance Policy)

**Multiplayer Synchronization:**
- All players must see same game state (except covert cards)
- Actions must be validated server-side
- Prevent cheating (e.g., playing cards not in hand)

**User Interface Needs:**
- Show all players' progress (levels, positions, visible cards)
- Hide covert cards from non-owners
- Show actionable cards (highlight playable cards)
- Show valid targets when playing cards
- Display resource counters clearly (fuel%, power%, distance, signal)

**Testing Scenarios:**
- Player launches with failed component
- Player's rocket destroyed by sabotage
- Cross-level sabotage with roll check
- Landing success/failure
- Win condition with all three resources
- Covert card reveal scenarios
- Newton's Third Law reflection

---

**END OF RULES DOCUMENT**

This document contains all rules needed to implement Backyard Rocketeers. Reference this document when implementing game logic, validation, and user interface.