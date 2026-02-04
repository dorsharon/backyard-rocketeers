import type { CardData } from '../../../types/game';

export interface PlayerRocketCardProps {
	/** Player's session ID */
	sessionId: string;
	/** Player's display name */
	name: string;
	/** Current level (1, 2, or 3) */
	level: number;
	/** Whether the player is ready (pre-game) */
	isReady: boolean;
	/** Whether this player is a bot */
	isBot: boolean;
	/** Whether the player has a launch pad */
	hasLaunchPad: boolean;
	/** Ground fuel percentage */
	groundFuel: number;
	/** Rocket components */
	rocketComponents: CardData[];
	/** Whether this is the viewing player's card */
	isYou: boolean;
	/** Whether it's currently this player's turn */
	isCurrentTurn: boolean;
	/** Whether this is the owner viewing their own card (shows covert details) */
	isOwner?: boolean;
}
