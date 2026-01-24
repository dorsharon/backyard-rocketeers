import { Text } from '@mantine/core';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { CountdownProps } from './LaunchSequence.types';

export function Countdown({ onComplete }: CountdownProps) {
	const [count, setCount] = useState(3);

	useEffect(() => {
		if (count > 0) {
			const timer = setTimeout(() => setCount(count - 1), 800);
			return () => clearTimeout(timer);
		}
		onComplete();
		return undefined;
	}, [count, onComplete]);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={count}
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 1.5, opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				<Text
					size="6rem"
					fw={900}
					ta="center"
					style={{
						background: 'linear-gradient(180deg, #fff 0%, #ffa500 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						textShadow: '0 0 40px rgba(255, 165, 0, 0.5)',
					}}
				>
					{count === 0 ? 'LAUNCH!' : count}
				</Text>
			</motion.div>
		</AnimatePresence>
	);
}
