import { CardSchema } from '../schemas/CardSchema';
import { Card } from './Card';

/**
 * Base class for all enhancement cards.
 * Enhancements provide permanent passive effects while active.
 *
 * See GAME_RULES.md - "Enhancement Cards" section.
 */
export abstract class EnhancementCard extends Card {
	readonly type = 'enhancement' as const;

	toSchema(): CardSchema {
		return new CardSchema(
			this.generateInstanceId(),
			this.name,
			this.type,
			this.description,
			this.isCovert,
			0,
		);
	}
}
