import { Group } from '@mantine/core';
import { IconDice6Filled } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface DiceTextProps {
	text: string;
	size?: number;
	color?: string;
}

// Dice icon component that shows a generic d6
function DiceIcon({ size = 14, color }: { size?: number; color?: string }) {
	// Use IconDice6 as a representative d6 icon
	return <IconDice6Filled size={size} style={{ color, verticalAlign: 'middle' }} />;
}

// Parse text and replace dice notation (1d6, 2d6, 3d6) with dice icons
export function DiceText({ text, size = 14, color }: DiceTextProps) {
	// Regex to match dice notation like 1d6, 2d6, 3d6 (supporting 1-9 dice)
	const diceRegex = /(\d)d6/gi;

	const parts: ReactNode[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = diceRegex.exec(text)) !== null) {
		// Add text before the match
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}

		// Get number of dice
		const numDice = parseInt(match[1], 10);

		// Add dice icons
		const diceIcons = [];
		for (let i = 0; i < numDice; i++) {
			diceIcons.push(<DiceIcon key={`${match.index}-${i}`} size={size} color={color} />);
		}

		parts.push(
			<Group
				key={match.index}
				gap={2}
				display="inline-flex"
				style={{ verticalAlign: 'middle' }}
			>
				{diceIcons}
			</Group>,
		);

		lastIndex = match.index + match[0].length;
	}

	// Add remaining text
	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	// If no matches, return original text
	if (parts.length === 0) {
		return <>{text}</>;
	}

	return <>{parts}</>;
}
