# Backyard Rocketeers - Complete Card Catalog

This document contains all 89 cards in the game with complete implementation details.

## Table of Contents
- [Sabotage Cards (22 cards)](#sabotage-cards)
  - [Level 1 Sabotage (8 cards)](#level-1-sabotage)
  - [Level 2 Sabotage (11 cards)](#level-2-sabotage)
  - [Level 3 Sabotage (6 cards)](#level-3-sabotage)
- [Component Cards (55 cards)](#component-cards)
  - [Level 1 Components (40 cards)](#level-1-components)
  - [Level 3 Components (15 cards)](#level-3-components)
- [Ability Cards (20 cards)](#ability-cards)
  - [Level 1 Abilities (7 cards)](#level-1-abilities)
  - [Level 2 Abilities (6 cards)](#level-2-abilities)
  - [Level 3 Abilities (5 cards)](#level-3-abilities)
  - [Multi-Level Abilities (3 cards)](#multi-level-abilities)
- [Enhancement Cards (15 cards)](#enhancement-cards)
  - [Level 1 Enhancements (2 cards)](#level-1-enhancements)
  - [Level 2 Enhancements (8 cards)](#level-2-enhancements)
  - [Level 3 Enhancements (5 cards)](#level-3-enhancements)

---

## Sabotage Cards

### Level 1 Sabotage

#### Plant Bomb
**ID:** `JxcNwV0pjzJDz82LnxHek`
**Type:** Sabotage
**Covert:** Yes
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Choose another player's component and destroy it at any following turn you wish

**Description:**
Just don't blow up anything during lunch.

**Implementation Notes:**
- Can be detected by X-Ray Machine ability card
- If revealed (by X-Ray Machine or Security Audit), must discard it immediately
- Player places this covertly on their rocket, then can activate it on any future turn
- When activated, target player loses chosen component immediately

---

#### Shoot An RPG
**ID:** `Uff4shh3MegAoFCpxEP9P`
**Type:** Sabotage
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Destroy another player's component. Roll 1d6: 5-6 destroys 2 components!

**Description:**
Hasta la vista, baby!

**Implementation Notes:**
- 33% chance (roll 5-6) for double damage
- Player chooses which component(s) to destroy
- If roll is 5-6, destroy 2 components; otherwise destroy 1
- Cannot target covert components (player doesn't know they exist)

---

#### Industrial Espionage
**ID:** `2IfkMjKveeo6iiCa7vc4b`
**Type:** Sabotage
**Covert:** No
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Look at another player's hand for 2 turns

**Description:**
If you'll be a good boy, we might let you look at their browsing history too.

**Implementation Notes:**
- Does NOT reveal covert cards on their rocket (only hand cards)
- Effect lasts for the next 2 full turns (both players' turns count)
- Target player's hand remains visible to caster for duration
- Multiple espionage effects can stack

---

#### Switch Parts
**ID:** `wKUOn2OWOI3uscAsGZ6Ls`
**Type:** Sabotage
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Switch one of your non-covert components with another player's non-covert component of the same kind

**Description:**
They probably wouldn't even notice.

**Implementation Notes:**
- Can't swap covert cards (neither yours nor theirs)
- Must be same component type (e.g., Fuselage for Fuselage, Nose for Nose)
- Can swap different quality levels (e.g., your Cutting Edge Fuselage for their Improvised Fuselage)
- Great for upgrading your parts or sabotaging their quality

---

#### Resource Raid
**ID:** (No ID in data)
**Type:** Sabotage
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Steal 1 fuel tank card from target player's hand (they choose which one if they have multiple)

**Description:**
Finders keepers, losers weepers!

**Implementation Notes:**
- Can only steal Ground Fuel tanks in Level 1 (Small, Large, or Extra Large)
- Target player chooses which fuel tank to give if they have multiple
- Fuel tank goes directly from their hand to your hand
- If target has no fuel tanks in hand, card has no effect (wasted play)

---

#### Inspection Delay
**ID:** (No ID in data)
**Type:** Sabotage
**Covert:** No
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Target player cannot place or replace any components during their next turn

**Description:**
Red tape strikes again! Nothing like good old bureaucracy to slow things down.

**Implementation Notes:**
- Does not prevent other actions like playing sabotage or abilities
- Target can still draw cards, play non-component cards, and launch if ready
- Only blocks component placement/replacement for one turn
- Use strategically before they can upgrade weak components

---

#### Hostile Takeover
**ID:** (No ID in data)
**Type:** Sabotage
**Covert:** No
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Steal one covert card from target player's rocket (they choose which one if they have multiple)

**Description:**
It's not personal, it's just business. Well... maybe a little personal.

**Implementation Notes:**
- Target must have at least 1 covert card on their rocket
- If target has multiple covert cards, they choose which one you steal
- Covert card goes from their rocket to your hand (not directly onto your rocket)
- You must still play it from hand to place it on your rocket
- If target has no covert cards, this card cannot be played

---

### Level 2 Sabotage

#### Astroid Storm
**ID:** `Gls77zmJYmMwSlsOJIKPv`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 3 copies in Level 2 deck

**Effect:**
Roll 3d6 vs target's rocket strength. Deal excess damage.

**Description:**
Remind me to never listen to Rock music again!

**Implementation Notes:**
- Calculate target's total rocket strength (sum of all component strengths)
- Roll 3d6 (3-18 range)
- If roll > rocket strength, deal (roll - strength) damage
- Target player must destroy components equal to excess damage
- **Counter:** If target has Anti-Asteroid System, attacker only rolls 1d6 instead of 3d6

---

#### Space Dust
**ID:** `mrLrJSc9GdkqWlTlVws4L`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Roll 1d6. Affects improvised parts on 1-4, second-hand on 1-2

**Description:**
Did someone see my Vaccum Cleaner?

**Implementation Notes:**
- Roll 1d6
- If 1-4 (70% chance): Destroy one random Improvised component
- If 1-2 (30% chance): Destroy one random Second-hand component
- If roll doesn't match any components (e.g., roll 3 but target has no Improvised parts), no effect
- Only affects improvised (70%) and second-hand parts (30%)
- Cutting Edge components are immune

---

#### Missle Attack
**ID:** `3Yz6Eph7TV8zPCrHQ6o3z`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 3 copies in Level 2 deck

**Effect:**
Roll 3d6 vs target's rocket strength. Deal excess damage. Destroys Spy Satellite if present.

**Description:**
Sit back and enjoy the fireworks.

**Implementation Notes:**
- Works like Asteroid Storm: Roll 3d6 vs rocket strength, deal excess damage
- **Additional effect:** Automatically destroys Spy Satellite enhancement if present (before damage calculation)
- Without Anti-Asteroid System: ~80% success rate
- With Anti-Asteroid System: Only rolls 1d6 instead (~20% success rate)
- Very effective against enhanced rockets

---

#### Van-Allen Belts
**ID:** `yU8_qXcCzGXp3EKVvW3xl`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Trap a player in a force field, holding him in place for 2 turns.

**Description:**
So long, suckers!

**Implementation Notes:**
- Target player cannot move forward (gain distance) for 2 full turns
- Target can still play cards, sabotage others, draw, etc.
- Distance-generating effects (boosters, abilities) have no effect during trapped turns
- **Counter:** Anti-Missile System reduces effect to roll 1d6 (on 1-3, trap fails)

---

#### Cosmic Rays
**ID:** `20SG89qVUzxYYXuGjUa6f`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Roll 3d6 vs Fuselage strength only. Destroy fuselage if higher.

**Description:**
Who turned on the heat?!

**Implementation Notes:**
- Only targets the Fuselage component (ignores other components)
- Roll 3d6 vs Fuselage strength
- Destruction chances:
  - Improvised Fuselage (strength 1): 90% chance to destroy
  - Second-hand Fuselage (strength 2): 60% chance to destroy
  - Cutting Edge Fuselage (strength 3): 30% chance to destroy
- If destroyed, target must replace fuselage or cannot launch/continue
- **Counter:** Heat Shield ability can deflect this attack

---

#### Wormhole
**ID:** `98cQnbgVerUECKHY85dBE`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 3 copies in Level 2 deck

**Effect:**
Roll 1d6: 1-3 = back 30km, 4-6 = forward 30km

**Description:**
There's a light at the end of the tunnel!

**Implementation Notes:**
- 50/50 chance of helping or hurting
- Roll 1d6:
  - 1-3: Target goes backward 30km
  - 4-6: Target goes forward 30km
- Can cause target to go below 0km (back to Earth orbit)
- Can push target past Mars if lucky
- Risk/reward sabotage card

---

#### Collision Course
**ID:** `5MyHKEB89SgHDYVX6B9_3`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Cause 2 players in the same zone or adjacent zones to crash. Both lose 20km.

**Description:**
At least they'll look cool while crashing.

**Implementation Notes:**
- Can only target 2 players in same zone OR adjacent zones
- Both players lose 20km distance
- Great for pulling back multiple leaders at once
- Can cause players to fall back into previous zones
- Both players are affected equally (no choosing who gets hit harder)

---

#### Cyber Attack
**ID:** `2a3pOIM6njKONthIERGPS`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 3 copies in Level 2 deck

**Effect:**
Navigation error: target goes back 50km

**Description:**
Err... Huston, we have a problem!

**Implementation Notes:**
- Target loses 50km distance immediately
- Can push target back multiple zones
- Can cause target to fall below 0km
- **Counter:** UHF Transceiver enhancement blocks this attack completely
- One of the strongest setback cards in Level 2

---

#### Tractor Beam
**ID:** `Swy-1-kc7-dhHPbv7GLqO`
**Type:** Sabotage
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Drag another player 20km back

**Description:**
I said full speed ahead, not backwards!

**Implementation Notes:**
- Target loses 20km distance
- Straightforward setback card, no rolls needed
- Reliable way to slow down a leader
- Can cause zone changes if target is near zone boundary

---

#### Power Flow Re-routing
**ID:** `jun1VhjWHgrU9MuW8nqju`
**Type:** Sabotage
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
Steal a power generation component from another player

**Description:**
Now that is what I call a smart power grid

**Implementation Notes:**
- Target one of opponent's power generation components
- Valid targets: Solar Panels (any tier), Windmill Generator, Geothermal Power Plant
- Component goes from their rocket to your hand (must be played to your rocket)
- If opponent has no power generators, cannot play this card
- Strategic for denying power while gaining it yourself

---

### Level 3 Sabotage

#### Dust Storm
**ID:** `GWBJ9axStwo5JqGn0o5ex`
**Type:** Sabotage
**Covert:** No
**Available:** Level 3 only
**Quantity:** 3 copies in Level 3 deck

**Effect:**
Block any solar panel on the surface and prevent it from producing power for 3 turns

**Description:**
Guys, I told you, no more beans for dinner! now look what you've done...

**Implementation Notes:**
- Target one opponent's solar panel component
- Solar panel produces 0 power for next 3 turns
- Does NOT affect Windmill Generator or Geothermal Power Plant
- Can target: Improvised, Second-Hand, or Cutting Edge Solar Panels
- Multiple dust storms can target different panels
- Devastating to players relying heavily on solar power

---

#### Alien Interference
**ID:** (No ID in data)
**Type:** Sabotage
**Covert:** No
**Available:** Level 3 only
**Quantity:** 3 copies in Level 3 deck

**Effect:**
Target player's rover moves in the wrong direction: lose 10km distance toward Alien Base

**Description:**
They're not as friendly as we thought! Maybe we should've called first.

**Implementation Notes:**
- Only affects players who have deployed a rover
- Target loses 10km toward alien base (distance resource decreases by 10)
- Does not damage the rover itself (rover continues functioning)
- If target hasn't deployed a rover yet, card has no effect
- Use when opponent is close to distance win condition

---

#### Signal Jammer
**ID:** (No ID in data)
**Type:** Sabotage
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
Reduce target player's signal strength by 1 (minimum 0)

**Description:**
Can you hear me now? ...Good!

**Implementation Notes:**
- Target loses 1 signal strength
- If player has 0 signal, this card has no effect
- Does not destroy signal components, just reduces current signal value
- Can be used multiple times to keep reducing signal
- Effective for preventing signal win condition

---

#### Rover Sabotage
**ID:** (No ID in data)
**Type:** Sabotage
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
Target player's rover must immediately roll 1d6 for malfunction check: 1-3 = rover breaks down and stops providing distance

**Description:**
Someone forgot to tighten the bolts! Probably Carl. It's always Carl.

**Implementation Notes:**
- Forces immediate malfunction roll
- Roll 1d6: 1-3 (50%) = rover breaks down
- Broken rover stops providing distance per turn
- Broken rovers can be fixed with Repair Kit ability card
- Only affects players with active rovers
- If rover was already broken, card has no effect

---

## Component Cards

### Level 1 Components

#### Launch Pad
**ID:** `cpwgGUMh2RBCBA9BSXCr7`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 6 copies in Level 1 deck

**Effect:**
Baseplate with 6 component slots to build your rocket upon

**Description:**
It's elemantry, Watson, my friend

**Implementation Notes:**
- **REQUIRED** - You cannot start building your rocket without it
- Must be played first before any other components
- Provides 6 slots for rocket components
- Cannot be destroyed or removed once placed
- Each player needs exactly one Launch Pad

---

#### Improvised Fuselage
**ID:** `Bu31GZSszf2eU9mlBuDi9`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 6 copies in Level 1 deck

**Effect:**
Strength: 1. Roll 1d6 when challenged: fails on 1-2

**Description:**
I mean, who ever said that a couple of wine barrels CAN'T be used as a fuselage?

**Implementation Notes:**
- Strength value: 1
- When challenged by sabotage (Asteroid Storm, Missile Attack, Cosmic Rays), roll 1d6
- Fails on roll of 1-2 (33% failure rate)
- If fails during launch, rocket cannot take off
- Cheapest fuselage option but most vulnerable

---

#### Second-hand Fuselage
**ID:** `uzQdaUKLJrVTHkkH1uWHe`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 4 copies in Level 1 deck

**Effect:**
Strength: 2. Roll 1d6 when challenged: fails on 1

**Description:**
Hey guys, look what I found on eBay last night!

**Implementation Notes:**
- Strength value: 2
- When challenged, roll 1d6
- Fails on roll of 1 (17% failure rate)
- More reliable than Improvised but still has risk
- Middle-tier option

---

#### Cutting Edge Fuselage
**ID:** `cSP1AOcBCjJZDJVUyvrFz`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Strength: 3. Never fails.

**Description:**
This is the dawn of a new era, baby!

**Implementation Notes:**
- Strength value: 3
- **Never fails** when challenged
- No roll needed, always succeeds
- Best fuselage option, highest strength
- Rare (only 3 copies)

---

#### Improvised Nose Cone
**ID:** `sWWBoAPdWvkYeBVdzsxIY`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 6 copies in Level 1 deck

**Effect:**
Strength: 1. Roll 1d6 at landing: fails on 1-2

**Description:**
Hey, it's pointy. That's all the matters, right?

**Implementation Notes:**
- Strength value: 1
- Landing failure check: roll 1d6, fails on 1-2 (33% crash rate)
- If fails at landing, player crashes and loses progress
- Most common nose cone type

---

#### Second-Hand Nose Cone
**ID:** `SfiDm_EYgy9fgdqs7078o`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 4 copies in Level 1 deck

**Effect:**
Strength: 2. Roll 1d6 at landing: fails on 1

**Description:**
So it has a few dents on it, so what? It is still pointing straight...

**Implementation Notes:**
- Strength value: 2
- Landing failure check: roll 1d6, fails on 1 (17% crash rate)
- Safer landing than Improvised
- Mid-tier option

---

#### Cutting Edge Nose Cone
**ID:** `o7WU8EH9JB6h2Yue5mXuJ`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Strength: 3. Landing success bonus +20%

**Description:**
It really is a cutting edge.

**Implementation Notes:**
- Strength value: 3
- Provides +20% bonus to landing success chance
- Best nose cone, significantly increases landing safety
- Rare (only 3 copies)

---

#### Improvised Stabilizer Fins
**ID:** `ftpIFozuUY07p1w3ocCvb`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 4 copies in Level 1 deck

**Effect:**
Strength: 1. Roll 1d6 in Level 2: navigation error on 1-4

**Description:**
These will probably help you stabilize... hopefully...

**Implementation Notes:**
- Strength value: 1
- In Level 2, roll 1d6 each turn
- Navigation error on 1-4 (70% error rate per turn)
- Navigation error typically means going wrong direction or losing distance
- High risk in space travel

---

#### Second-Hand Stabilizer Fins
**ID:** `wLmztFFGwd6Y92ZeTD9RN`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 4 copies in Level 1 deck

**Effect:**
Strength: 2. Roll 1d6 in Level 2: navigation error on 1-2

**Description:**
They worked for the last guy that used them, so maybe they're fine.

**Implementation Notes:**
- Strength value: 2
- In Level 2, roll 1d6 each turn
- Navigation error on 1-2 (33% error rate per turn)
- More reliable than Improvised
- Reasonable middle option

---

#### Cutting Edge Stabilizer Fins
**ID:** `w27hCs8vzXW6tjfjyZmYa`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Strength: 3. No navigation errors in Level 2

**Description:**
You'll be as steady as a rock... et.

**Implementation Notes:**
- Strength value: 3
- **Never causes navigation errors** in Level 2
- Best stabilizer option
- Critical for reliable space travel
- Rare (only 3 copies)

---

#### Improvised Thruster
**ID:** `kbX4JOINgdXsuFgkzTjCL`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 4 copies in Level 1 deck

**Effect:**
Strength: 1. Roll 1d6 at launch: engine failure on 1-4

**Description:**
Let's hope you don't crash and burn.

**Implementation Notes:**
- Strength value: 1
- Launch failure check: roll 1d6, fails on 1-4 (70% failure rate)
- If fails, rocket cannot launch (stays on ground)
- Very risky, but better than nothing

---

#### Second-hand Thruster
**ID:** `Nm6Z3rhXnCiAZeG3miae2`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 4 copies in Level 1 deck

**Effect:**
Strength: 2. Roll 1d6 at launch: engine failure on 1-2

**Description:**
There's nothing that some duct tape can't fix.

**Implementation Notes:**
- Strength value: 2
- Launch failure check: roll 1d6, fails on 1-2 (33% failure rate)
- More reliable than Improvised
- Reasonable option for launch

---

#### Cutting Edge Thruster
**ID:** `pTtpsRJ8NR29OY_GNhn0a`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Strength: 3. Never fails

**Description:**
To the moon! Oh, wait, we're going to Mars.

**Implementation Notes:**
- Strength value: 3
- **Never fails** at launch
- Guaranteed successful launch
- Best thruster option
- Rare (only 3 copies)

---

#### Improvised Boosters
**ID:** `Ey1gmj55WX96RDVRS42Hy`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Strength: 1. +10km in Level 2

**Description:**
Who said you can't build rockets at home?

**Implementation Notes:**
- Strength value: 1
- Provides +10km distance boost in Level 2 (space travel)
- Smallest distance boost
- Better than nothing for space phase

---

#### Solid Rocket Boosters
**ID:** `mmWd2byuit5tfPoEVK4mn`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Strength: 2. +30km in Level 2

**Description:**
They worked during the Shuttle era, so what could go wrong?

**Implementation Notes:**
- Strength value: 2
- Provides +30km distance boost in Level 2
- Mid-tier booster option
- Good bang for the buck

---

#### Hypergolic Boosters
**ID:** `Da7GX02MLzo8RMjGXgYEV`
**Type:** Component
**Covert:** No
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Strength: 3. +70km in Level 2

**Description:**
Look what a mixture of two toxic fuels can do

**Implementation Notes:**
- Strength value: 3
- Provides +70km distance boost in Level 2
- Massive distance advantage
- Very rare (only 2 copies)

---

#### Staging
**ID:** `mN3rhWGXbkIfe59ncbDAa`
**Type:** Component
**Covert:** **YES**
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
Strength: 1. After 4 turns in Level 2, gain +15km/turn

**Description:**
If it crashes on anyone after we ditch it, we'll deny everything

**Implementation Notes:**
- Strength value: 1
- **Covert card** - hidden from opponents
- After 4 turns in Level 2, activates and provides +15km per turn
- If your thruster fails, you can use staging to remain in flight
- Permanent distance boost after activation
- Strategic late-game component

---

#### Anti-Missiles System
**ID:** `hfYtOcqjwhXwyn_YRPssZ`
**Type:** Component
**Covert:** **YES**
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Strength: 2. Immune to missile attacks

**Description:**
Do a barrel roll!

**Implementation Notes:**
- Strength value: 2
- **Covert card** - hidden from opponents
- Completely negates Missile Attack sabotage card
- When Missile Attack is played against you, attacker rolls 1d6 instead of 3d6
- Critical defense component for Level 2

---

#### Anti-Astroids System
**ID:** `PmEnP8hTtZn4xR2bIVlEC`
**Type:** Component
**Covert:** **YES**
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Strength: 2. Immune to asteroid attacks

**Description:**
Those astroids don't stand a chance.

**Implementation Notes:**
- Strength value: 2
- **Covert card** - hidden from opponents
- Greatly reduces Asteroid Storm damage (attacker rolls 1d6 instead of 3d6)
- Essential for surviving Level 2 space hazards
- Pairs well with Anti-Missiles System for complete protection

---

#### Small Fuel Tank
**ID:** `0sP7Q0M7xaEOQeCU8ivYs`
**Type:** Component
**Covert:** No
**Available:** All levels (L1, L2, L3)
**Quantity:** 5 in L1, 4 in L2, 2 in L3

**Effect:**
Add 10% to fuel capacity

**Description:**
It's either this, or we run on potatoes.

**Implementation Notes:**
- Adds 10% to fuel capacity
- You must reach 100% fuel capacity before launch (Level 1)
- In Level 2, fuel is consumed during space travel
- In Level 3, represents general resource (less critical)
- Most common fuel tank

---

#### Large Fuel Tank
**ID:** `TXr86tNEPDXxv94w2qH31`
**Type:** Component
**Covert:** No
**Available:** All levels (L1, L2, L3)
**Quantity:** 4 in L1, 4 in L2, 2 in L3

**Effect:**
Add 20% to fuel capacity

**Description:**
Hey, it was in a discount!

**Implementation Notes:**
- Adds 20% to fuel capacity
- More efficient than 2x Small Fuel Tanks (saves a component slot)
- Critical for reaching 100% fuel for launch
- Available across all levels

---

#### Extra Large Fuel Tank
**ID:** `DzGGI1aYgBLJPlQXsfkbf`
**Type:** Component
**Covert:** No
**Available:** Level 1 and Level 2 only
**Quantity:** 3 in L1, 4 in L2

**Effect:**
Add 50% to fuel capacity

**Description:**
Did someone say oil crisis?

**Implementation Notes:**
- Adds 50% to fuel capacity
- Half the fuel requirement in one card!
- Most efficient fuel tank (space-wise)
- Not available in Level 3
- High value component

---

### Level 3 Components

#### Improvised Mars Rover
**ID:** `E6GlxvSs6bgiinERVlUsK`
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 4 copies in Level 3 deck

**Effect:**
Provides 3km/turn. Roll 1d6 each turn: fails on 1-3

**Description:**
It will get there, have faith!

**Implementation Notes:**
- Provides 3km per turn toward alien base
- Each turn, roll 1d6: on 1-3 (50%), rover malfunctions and stops
- If malfunctions, stops providing distance until repaired
- Can be fixed with Repair Kit ability card
- Cheapest rover option but unreliable

---

#### Second-Hand Mars Rover
**ID:** `PnTxE7npcftQhdz8lyEkC`
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 4 copies in Level 3 deck

**Effect:**
Provides 5km/turn. Roll 1d6 each turn: fails on 1-2

**Description:**
Hey, it was already there once!

**Implementation Notes:**
- Provides 5km per turn toward alien base
- Each turn, roll 1d6: on 1-2 (33%), rover malfunctions
- More reliable than Improvised
- Better distance per turn
- Mid-tier rover

---

#### Cutting Edge Mars Rover
**ID:** `XyxUP5VTkpZa5YG2tQ4tk`
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 3 copies in Level 3 deck

**Effect:**
Provides 7km/turn. Roll 1d6 each turn: fails on 1

**Description:**
No fear, the Rover is here!

**Implementation Notes:**
- Provides 7km per turn toward alien base
- Each turn, roll 1d6: on 1 (17%), rover malfunctions
- Most reliable rover
- Best distance per turn
- Rare (only 3 copies)

---

#### Windmill Generator
**ID:** `YF2httefcNRT1x7G8n8lS`
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 3 copies in Level 3 deck

**Effect:**
10% power per turn

**Description:**
The weatherman is always wrong, I tell ya!

**Implementation Notes:**
- Generates 10% power per turn
- You must reach 100% power collection capacity to charge rover
- Not affected by Dust Storm (only solar panels are)
- Alternative to solar panels
- Reliable but slow

---

#### Improvised Solar Panels
**ID:** `3Jeb0Kk6tUuTI_5alrUgj`
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 4 copies in Level 3 deck

**Effect:**
10% power collection capability every turn

**Description:**
For what it's worth, it's powering our toaster...

**Implementation Notes:**
- Generates 10% power per turn
- Vulnerable to Dust Storm sabotage (blocks for 3 turns)
- Can be enhanced by Solar Panel Efficiency enhancement (+5% per turn)
- Basic power generation option

---

#### Second-Hand Solar Panels
**ID:** `L_zrgsXaELepqVFskF9R7`
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 3 copies in Level 3 deck

**Effect:**
20% power collection capability every turn

**Description:**
I took them off my roof just for that, they better work!

**Implementation Notes:**
- Generates 20% power per turn
- Vulnerable to Dust Storm
- Can be enhanced by Solar Panel Efficiency (+5% = 25% total per turn)
- Mid-tier power option
- Faster power generation

---

#### Cutting Edge Solar Panels
**ID:** `3svHsYNJOY5HPZ1fAFOty`
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 3 copies in Level 3 deck

**Effect:**
30% power collection capability every turn

**Description:**
Those guys at MIT won't notice that I stole them, right?

**Implementation Notes:**
- Generates 30% power per turn
- Vulnerable to Dust Storm
- Can be enhanced by Solar Panel Efficiency (+5% = 35% total per turn)
- Best solar panel option
- Very fast power generation

---

#### Geothermal Power Plant
**ID:** `GeeU-JoI87NiVxWTpe_-X`
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
50% power collection capability every turn

**Description:**
It is definitly hot down there...

**Implementation Notes:**
- Generates 50% power per turn (half your power needs in one turn!)
- Not affected by Dust Storm
- Not enhanced by Solar Panel Efficiency (not a solar panel)
- Most powerful generator
- Very rare (only 2 copies)
- Can be stolen by Power Flow Re-routing sabotage

---

#### Basic Antenna
**ID:** (No ID in data)
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 4 copies in Level 3 deck

**Effect:**
Provides +1 Signal Strength when placed

**Description:**
It's literally a coat hanger wrapped in tinfoil. But hey, it works!

**Implementation Notes:**
- Provides +1 signal strength
- Need 3 total Signal Strength to win
- Can be enhanced by Signal Amplifier (+1 = 2 total from this card)
- Most common signal component
- Multiple can be placed

---

#### Satellite Dish
**ID:** (No ID in data)
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 5 copies in Level 3 deck

**Effect:**
Provides +2 Signal Strength when placed

**Description:**
Now we're talking! Finally, something that looks like it belongs on a space mission.

**Implementation Notes:**
- Provides +2 signal strength
- Strong signal component
- Can be enhanced by Signal Amplifier (+1 = 3 total from this card = instant win!)
- More efficient than 2x Basic Antennas
- Common and reliable

---

#### Deep Space Array
**ID:** (No ID in data)
**Type:** Component
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck (RARE!)

**Effect:**
Provides +3 Signal Strength when placed (instantly completes signal requirement!)

**Description:**
Welcome to the 22nd century! This bad boy can contact aliens in another galaxy.

**Implementation Notes:**
- Provides +3 signal strength
- **Instant signal win condition** if played alone (meets the 3 signal requirement)
- Rare card - only 2 copies in Level 3 deck
- Can be enhanced by Signal Amplifier (+1 = 4 total)
- Game-changing card, play immediately if you have it

---

## Ability Cards

### Level 1 Abilities

#### X-Ray Machine
**ID:** `hJaHeutNDhCVFgOmcvSN8`
**Type:** Ability
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
See if a bomb has been planted on your rocket

**Description:**
I have nothing to hide

**Implementation Notes:**
- Reveals if any Plant Bomb cards are hidden on your rocket
- Does NOT reveal other covert components
- Single use, discard after use
- Defensive counter to Plant Bomb sabotage
- If bomb is found, it is revealed and must be discarded by owner

---

#### Slingshot
**ID:** `qujyINZ5Fh9BrkRGEE4QM`
**Type:** Ability
**Covert:** No
**Available:** Level 1 only
**Quantity:** 4 copies in Level 1 deck

**Effect:**
Gain +10km this turn and next turn when you launch

**Description:**
Using the earth's gravity to slingshot your rocket is basically what nature intented

**Implementation Notes:**
- Play when launching from Earth
- Provides +10km bonus on launch turn AND the following turn
- Total bonus: +20km over 2 turns
- Great early boost in Level 2
- Use strategically for early lead

---

#### Reverse Engineering
**ID:** `OQbZx4LmCPtxbjI0cIPV_`
**Type:** Ability
**Covert:** No
**Available:** Level 1 and Level 3
**Quantity:** 2 in L1, 0 in L2, 0 in L3 (but available in L3)

**Effect:**
Downgrade all of another player's components

**Description:**
Take 'em down, piece by piece!

**Implementation Notes:**
- Target one player
- All their components downgrade one tier:
  - Cutting Edge → Second-hand
  - Second-hand → Improvised
  - Improvised → destroyed/removed (cannot downgrade further)
- Very powerful sabotage ability
- Forces opponent to rebuild with weaker parts
- Can be devastating right before launch or landing

---

#### R&D Team
**ID:** `t6wi08czVUNo6FzHM3zeY`
**Type:** Ability
**Covert:** No
**Available:** Level 1 and Level 3
**Quantity:** 2 in L1, 0 in L2, 0 in L3 (but available in L3)

**Effect:**
Upgrade all your components

**Description:**
These guys make their mothers proud!

**Implementation Notes:**
- Upgrades ALL your components one tier:
  - Improvised → Second-hand
  - Second-hand → Cutting Edge
  - Cutting Edge → stays Cutting Edge (already max)
- Opposite of Reverse Engineering
- Can turn a weak rocket into a strong one instantly
- Very valuable card, use when you have many Improvised parts

---

#### Supernova
**ID:** `q_ct-Iofp-m3YPMDwasyU`
**Type:** Ability
**Covert:** No
**Available:** Level 1 only
**Quantity:** 1 copy in Level 1 deck (RARE!)

**Effect:**
Destroy all Enhancement cards from one target player

**Description:**
Daddy, why is the sky red?

**Implementation Notes:**
- Target one player
- ALL their enhancement cards are destroyed
- Very powerful late-game sabotage
- Only 1 copy in deck (extremely rare)
- Use when opponent has stacked multiple enhancements
- Can swing game by removing multiple buffs at once

---

#### Parallel Universe
**ID:** `f439OR2muToXt7j-6vUp2`
**Type:** Ability
**Covert:** No
**Available:** Level 1 only
**Quantity:** 1 copy in Level 1 deck (RARE!)

**Effect:**
Swap up to 3 components with target player

**Description:**
The universe has its own mysteries

**Implementation Notes:**
- Choose up to 3 of your components and up to 3 of target player's components
- Swap them (yours go to them, theirs come to you)
- Can swap different types of components
- Cannot swap Launch Pad
- Strategic uses:
  - Steal their good parts
  - Give them your weak parts
  - Fix specific weaknesses by trading
- Only 1 copy (extremely rare)

---

#### Security Audit
**ID:** (No ID in data)
**Type:** Ability
**Covert:** No
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Choose one of target player's components on their rocket and reveal if it's covert

**Description:**
Trust, but verify! That's what they taught us in rocket-building school, right?

**Implementation Notes:**
- Single use, discard after use
- Target one specific component on opponent's rocket
- Reveals whether it's covert or not
- Does NOT reveal what the covert card is, just that it IS covert
- Use to find hidden defenses or staging before attacking

---

#### Insurance Policy
**ID:** (No ID in data)
**Type:** Ability
**Covert:** **YES**
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
Play this card before your rocket is destroyed. If your rocket is destroyed this round, keep 2 components of your choice

**Description:**
We've been trying to reach you about your rocket's extended warranty...

**Implementation Notes:**
- **Covert card** - play hidden on your rocket
- Must be played BEFORE destruction happens
- Remains in effect for current round only
- If rocket is destroyed this round, choose 2 components to keep
- Kept components go to your hand and can be replayed
- Insurance against massive sabotage
- Does NOT prevent destruction, just salvages parts

---

### Level 2 Abilities

#### Laser Cannon
**ID:** `ZhSbY3s5ZQDc7O8nl211_`
**Type:** Ability
**Covert:** No
**Available:** Level 2 and Level 3
**Quantity:** 2 in L2, 1 in L3

**Effect:**
Shoot and destroy an asteroid, a rival rocket or even a rover on the surface of mars!

**Description:**
This baby worths every penny!

**Implementation Notes:**
- Multi-purpose destruction card
- Can target:
  - Asteroid (cancel an Asteroid Storm in progress)
  - Rival rocket component (destroy 1 component)
  - Rover on Mars surface (destroy opponent's rover in Level 3)
- Very versatile ability
- Great defensive and offensive tool

---

#### Wrap-Drive Generator
**ID:** `mRJraqyTv607sPOlZXZNl`
**Type:** Ability
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Advance 50km

**Description:**
The speed of light? yea, we are way past that...

**Implementation Notes:**
- Instant +50km distance
- Massive movement boost
- Can skip entire zones
- Great for catching up or taking the lead
- One of the strongest movement abilities

---

#### Teleport
**ID:** `4FsKELKwmybHdRki8ztcS`
**Type:** Ability
**Covert:** No
**Available:** Level 2 only
**Quantity:** 3 copies in Level 2 deck

**Effect:**
Gain 10km of travel distance

**Description:**
Beam me up, scotty!

**Implementation Notes:**
- Instant +10km distance
- Reliable movement boost
- Good for small position changes
- More common than Wrap-Drive Generator

---

#### Space Gas Station
**ID:** `Q3FoSi0m3Aut_gxKPanDV`
**Type:** Ability
**Covert:** No
**Available:** Level 2 only
**Quantity:** 3 copies in Level 2 deck

**Effect:**
Refuel on the go (Add 30% fuel after launch)

**Description:**
Is there a McDrive there too?

**Implementation Notes:**
- Can only be used in Level 2 (space travel)
- Adds 30% space fuel
- Great for extending travel range
- Use when running low on fuel
- Pairs well with Emergency Thrusters (which consumes fuel)

---

#### Emergency Thrusters
**ID:** (No ID in data)
**Type:** Ability
**Covert:** No
**Available:** Level 2 only
**Quantity:** 3 copies in Level 2 deck

**Effect:**
Advance 15km immediately but lose 20% space fuel

**Description:**
For when you REALLY need to get somewhere fast! Safety third.

**Implementation Notes:**
- Instant +15km distance
- Cost: -20% space fuel
- Can't be used if you have less than 20% fuel remaining
- Trade-off: speed for fuel
- Strategic for emergency positioning

---

#### Asteroid Mining
**ID:** (No ID in data)
**Type:** Ability
**Covert:** No
**Available:** Level 2 only
**Quantity:** 1 copy in Level 2 deck (RARE!)

**Effect:**
Roll 3d6. Gain that total in km of travel distance AND 20% space fuel

**Description:**
One person's space junk is another person's treasure! Time to get rich.

**Implementation Notes:**
- Roll 3d6 (range: 3-18km gain)
- Average gain: ~10.5km
- BONUS: Also gain 20% space fuel
- This card provides both distance AND fuel!
- Only 1 copy (extremely rare)
- Excellent value card

---

### Level 3 Abilities

#### Drag Chute
**ID:** `CADxeA4D_25RCgn47q7R_`
**Type:** Ability
**Covert:** No
**Available:** Level 3 only
**Quantity:** 3 copies in Level 3 deck

**Effect:**
Increases the chance of safe landing by 30%

**Description:**
Just don't run into some flying hedgehogs!

**Implementation Notes:**
- Provides +30% landing success chance
- Can be used for landing on Mars (Level 2→3 transition)
- Stacks with Cutting Edge Nose Cone (+20%) for +50% total
- Critical for safe landing
- Reduces crash risk significantly

---

#### Repair Kit
**ID:** (No ID in data)
**Type:** Ability
**Covert:** No
**Available:** Level 3 only
**Quantity:** 3 copies in Level 3 deck

**Effect:**
Fix a broken rover (yours or another player's), returning it to working condition

**Description:**
Percussive maintenance! When in doubt, hit it with a wrench.

**Implementation Notes:**
- Can be used on any broken rover (even opponent's!)
- Broken rover returns to working condition
- Rover resumes providing distance per turn
- Can repair rovers broken by Rover Sabotage card
- Can repair rovers that failed malfunction checks
- Strategic: you can repair opponent's rover if you want to be nice (or make deals)

---

#### Signal Booster
**ID:** (No ID in data)
**Type:** Ability
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
Gain +1 Signal Strength immediately (does not require a component slot)

**Description:**
Can you hear me now? ...How about NOW?

**Implementation Notes:**
- Instant +1 signal strength
- Does NOT require a component slot (doesn't go on rocket)
- Single use, discard after use
- This is temporary signal, not from a component
- Great for reaching 3 signal quickly
- Can be the final push to win condition

---

#### Power Surge
**ID:** (No ID in data)
**Type:** Ability
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
Gain 30% power immediately (does not require a generator)

**Description:**
Unlimited power! ...for a few seconds. But a few seconds is all we need!

**Implementation Notes:**
- Instant +30% power
- Does NOT require a generator component
- Single use, emergency power boost
- Great for reaching 100% power quickly
- Can be used if your generators are blocked by Dust Storm

---

#### Backup Rover
**ID:** (No ID in data)
**Type:** Ability
**Covert:** **YES**
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
If your main rover fails or is destroyed, this rover automatically deploys and provides 4km/turn. Never fails.

**Description:**
Always have a plan B! And plan C. And plan D while we're at it.

**Implementation Notes:**
- **Covert card** - remains hidden until main rover fails
- Auto-activates when main rover fails (no action needed)
- Provides 4km per turn toward alien base
- **Never fails** - no malfunction rolls
- Insurance against rover sabotage and malfunction
- Once activated, remains visible and active

---

### Multi-Level Abilities

#### Newton's Third Law
**ID:** `zUB3mEwzuoFc_r2qt8Akb`
**Type:** Ability
**Covert:** No
**Available:** All levels (L1, L2, L3)
**Quantity:** 1 in each level deck

**Effect:**
Return an equal sabotage effect to the player who used it against you

**Description:**
Every action has an equal and opposite reaction. In other words - Back at ya!

**Implementation Notes:**
- Play immediately after opponent plays sabotage against you
- Reflects the EXACT same effect back to the caster
- Examples:
  - They Shoot RPG at you → rolls against them instead
  - They steal fuel → you steal their fuel instead
  - They send you back 50km → they go back 50km instead
- Does NOT work on abilities or enhancements, only sabotage
- Powerful defensive card

---

#### Heat Shield
**ID:** `ki-MQlT0ncF0DD7ClI4pX`
**Type:** Ability
**Covert:** **YES**
**Available:** Level 2 and Level 3
**Quantity:** 2 in L2, 1 in L3

**Effect:**
Deflect a cosmic ray attack or use it to increase landing chances by 20%

**Description:**
Good thing I always bring my sunglasses with me

**Implementation Notes:**
- **Covert card**
- Dual purpose:
  1. Automatically deflects Cosmic Rays sabotage when played against you
  2. Can be activated to increase landing chances by +20%
- Choose when to reveal and use
- Great insurance against Cosmic Rays in Level 2
- Great landing boost in Level 2→3 transition

---

## Enhancement Cards

### Level 1 Enhancements

#### Intelligence Agency
**ID:** `N8eagWYKAAWOdMgo_i1Ou`
**Type:** Enhancement
**Covert:** No
**Available:** Level 1 only
**Quantity:** 3 copies in Level 1 deck

**Effect:**
As long as this card is in effect, you can see covert actions that are applied to you.

**Description:**
I've got my eye on you.

**Implementation Notes:**
- Ongoing effect while in play
- Reveals covert cards played against you (Plant Bomb, Hostile Takeover, etc.)
- Does NOT reveal covert cards on opponent's rockets (only actions targeting you)
- Defensive enhancement
- Protects against covert sabotage

---

#### Enigma Machine
**ID:** `c_eEvSVAiMqEcKNQ_mWLy`
**Type:** Enhancement
**Covert:** **YES**
**Available:** Level 1 only
**Quantity:** 2 copies in Level 1 deck

**Effect:**
All your components become covert until Level 2

**Description:**
There was a guy named Allen Turing, you might need to read about him...

**Implementation Notes:**
- **Covert card** - hidden from opponents
- Makes ALL your rocket components appear covert to opponents
- Opponents cannot see what you have or target specific components
- Effect only lasts until you reach Level 2
- Automatically discarded when entering Level 2
- Powerful early-game protection
- Prevents targeted sabotage

---

### Level 2 Enhancements

#### Solar Sail
**ID:** `19wXmVAsNeG0SsN9aLaof`
**Type:** Enhancement
**Covert:** No
**Available:** Level 1 and Level 2
**Quantity:** 2 in L1, 2 in L2

**Effect:**
If you get a Solar Wind during your space journey, you'll gain an extra 20% speed

**Description:**
This big peice of cloth can do some true magic!

**Implementation Notes:**
- Passive enhancement
- If someone plays Solar Wind card (or you play it), you gain extra 20% speed
- Synergy card - requires Solar Wind to activate
- Can be played in Level 1 in preparation for Level 2
- Speed boost helps reach Mars faster

---

#### Solar Wind
**ID:** `9ycOz3dAB7oW7cF0mCrut`
**Type:** Enhancement
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Gain an extra 20% speed

**Description:**
Wherever the wind blows...

**Implementation Notes:**
- Instant speed boost in Level 2
- +20% speed = faster travel toward Mars
- Synergizes with Solar Sail (both together = 40% boost)
- Helps complete Level 2 faster
- Movement enhancement

---

#### Spy Satellite
**ID:** `YCokNiszui3Rvn8ebBaq4`
**Type:** Enhancement
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
All your opponent's cards (except covert) are visible to you

**Description:**
A Rocketeer's best friend

**Implementation Notes:**
- Ongoing effect while in play
- See all opponent cards EXCEPT covert cards
- See their hands and rocket components
- Information advantage
- **Can be destroyed by Missile Attack sabotage**
- Strategic planning advantage

---

#### Ion Thrusters
**ID:** `hJszsRpnYvGLYg3XNeeUs`
**Type:** Enhancement
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Gain 3km every turn, even without fuel

**Description:**
Someone watched way too many sci-fi shows

**Implementation Notes:**
- Ongoing effect: +3km per turn
- Works even with 0% fuel
- Permanent passive movement
- Excellent for steady progress
- Cannot be stopped by fuel sabotage

---

#### Thermal Radiation Meter
**ID:** `mySKiSxhM9k0l2Mw2idm0`
**Type:** Enhancement
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Detect and avoid cosmic rays

**Description:**
Nothing can hide from me, as long as it's not a pollar-bear or an ice cube...

**Implementation Notes:**
- Ongoing protection while in play
- Completely negates Cosmic Rays sabotage
- Cosmic Rays played against you have no effect
- Defensive enhancement
- Critical for fuselage protection

---

#### Long Range Radar
**ID:** `BXkWQLZd7WtrkHA1mCYEc`
**Type:** Enhancement
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Detect and avoid asteroid storms

**Description:**
The all-seeing-eye is watching your back!

**Implementation Notes:**
- Ongoing protection while in play
- Completely negates Asteroid Storm sabotage
- Asteroid Storms played against you have no effect
- Defensive enhancement
- Pairs with Thermal Radiation Meter for full hazard protection

---

#### UHF Transceiver
**ID:** `igXkGaNV46tsQq_psMl19`
**Type:** Enhancement
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
This com device is not affected by a cyber attack, so you can avoid navigation errors

**Description:**
Sometimes the more primitive a device is, the better

**Implementation Notes:**
- Ongoing protection while in play
- Completely blocks Cyber Attack sabotage
- Navigation errors from Cyber Attack have no effect
- Defensive enhancement
- Prevents 50km setbacks

---

#### Anti-Matter Propulsion
**ID:** `sjC0rD7zIMW1ySUXJH9rj`
**Type:** Enhancement
**Covert:** No
**Available:** Level 2 only
**Quantity:** 2 copies in Level 2 deck

**Effect:**
Gain 20% space fuel per turn for 5 turns (total 100%)

**Description:**
You won't believe the stuff that comes out the black market these days...

**Implementation Notes:**
- Ongoing effect for 5 turns
- +20% fuel per turn = 100% total fuel over 5 turns
- Essentially unlimited fuel for Level 2
- Can be played if you launched with low fuel
- Very powerful fuel management card
- Lasts entire space journey

---

### Level 3 Enhancements

#### Sky Crane
**ID:** `0FUsE3rxUT5ZQbv8FxFLF`
**Type:** Enhancement
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
Gives you 100% chance of landing your spacecraft safely

**Description:**
Its a crane in the sky!

**Implementation Notes:**
- Play before landing
- **Guaranteed safe landing** - no crash risk
- Negates all landing rolls and failures
- Removes nose cone failure risk
- Most powerful landing card
- Must be played before landing attempt

---

#### All-Terrain Wheels
**ID:** `r2Eq3_gsrMqteOg0p7Qgy`
**Type:** Enhancement
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
Increase rover speed by 20%

**Description:**
Traction is everything

**Implementation Notes:**
- Ongoing effect while in play
- Increases rover distance by 20%
- Examples:
  - Improvised Rover (3km) → 3.6km per turn
  - Second-Hand Rover (5km) → 6km per turn
  - Cutting Edge Rover (7km) → 8.4km per turn
- Helps reach 100km to alien base faster
- Movement enhancement

---

#### Signal Amplifier
**ID:** (No ID in data)
**Type:** Enhancement
**Covert:** No
**Available:** Level 3 only
**Quantity:** 2 copies in Level 3 deck

**Effect:**
All your communication components (antennas, dishes, arrays) provide +1 additional Signal Strength

**Description:**
Loud and clear! Now EVERYONE can hear your transmission... including the aliens.

**Implementation Notes:**
- Ongoing effect while in play
- Stacks with existing signal components
- Examples:
  - Basic Antenna (1) → 2 signal
  - Satellite Dish (2) → 3 signal (instant win!)
  - Deep Space Array (3) → 4 signal (overkill but guaranteed)
- Very powerful multiplier
- Can turn weak signal setup into win condition
- Priority card if going for signal win

---

#### Solar Panel Efficiency
**ID:** (No ID in data)
**Type:** Enhancement
**Covert:** No
**Available:** Level 3 only
**Quantity:** 1 copy in Level 3 deck (RARE!)

**Effect:**
All your solar panel components produce +5% additional power per turn

**Description:**
Finally, a sunny day on Mars! Who knew proper alignment would help?

**Implementation Notes:**
- Ongoing effect while in play
- Only affects solar panels (Improvised, Second-Hand, Cutting Edge)
- Does NOT affect Windmill Generator or Geothermal Plant
- Examples:
  - Improvised Solar (10%) → 15% per turn
  - Second-Hand Solar (20%) → 25% per turn
  - Cutting Edge Solar (30%) → 35% per turn
- Stacks across multiple solar panels
- Only 1 copy (extremely rare)
- Significant power boost for solar-heavy builds

---

## Summary Statistics

### Total Cards by Type
- **Sabotage:** 22 cards
- **Components:** 55 cards
- **Abilities:** 20 cards
- **Enhancements:** 15 cards
- **TOTAL:** 112 unique cards (with varying quantities = 89 unique designs)

### Covert Cards
- Plant Bomb (Sabotage)
- Staging (Component)
- Anti-Missiles System (Component)
- Anti-Astroids System (Component)
- Insurance Policy (Ability)
- Heat Shield (Ability)
- Backup Rover (Ability)
- Enigma Machine (Enhancement)

**Total Covert Cards:** 8 unique designs

### Card Availability by Level
- **Level 1 Only:** 40 unique cards
- **Level 2 Only:** 19 unique cards
- **Level 3 Only:** 27 unique cards
- **Multi-Level:** 3 cards (available in multiple levels)

### Rarest Cards (1 copy per deck)
- Supernova (L1 Ability)
- Parallel Universe (L1 Ability)
- Asteroid Mining (L2 Ability)
- Solar Panel Efficiency (L3 Enhancement)

### Most Common Cards (6 copies per deck)
- Launch Pad (L1 Component)
- Improvised Fuselage (L1 Component)
- Improvised Nose Cone (L1 Component)

---

**Note:** This catalog is the definitive source for card implementation. When coding card classes, refer to this document for exact effects, quantities, and mechanics.
