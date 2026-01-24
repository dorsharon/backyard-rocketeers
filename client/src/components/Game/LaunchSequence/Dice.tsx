import { Box, Text } from '@mantine/core';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { DiceProps } from './LaunchSequence.types';

export function Dice({ value, delay, isSuccess }: DiceProps) {
	const [isRolling, setIsRolling] = useState(true);
	const [displayValue, setDisplayValue] = useState(1);

	useEffect(() => {
		if (isRolling) {
			const rollInterval = setInterval(() => {
				setDisplayValue(Math.floor(Math.random() * 6) + 1);
			}, 50);

			const stopTimer = setTimeout(() => {
				setIsRolling(false);
				setDisplayValue(value);
				clearInterval(rollInterval);
			}, delay + 1000);

			return () => {
				clearInterval(rollInterval);
				clearTimeout(stopTimer);
			};
		}
		return undefined;
	}, [isRolling, value, delay]);

	return (
		<motion.div
			initial={{ scale: 0, rotateZ: -180 }}
			animate={{
				scale: 1,
				rotateZ: isRolling ? [0, 360] : 0,
			}}
			transition={{
				scale: { delay: delay / 1000, duration: 0.3, type: 'spring' },
				rotateZ: isRolling ? { duration: 0.3, repeat: Infinity, ease: 'linear' } : { duration: 0.2 },
			}}
		>
			<Box
				style={{
					width: 60,
					height: 60,
					background: isRolling
						? 'rgba(255, 255, 255, 0.1)'
						: isSuccess
							? 'linear-gradient(135deg, rgba(74, 222, 128, 0.3), rgba(74, 222, 128, 0.1))'
							: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.1))',
					borderRadius: 12,
					border: isRolling
						? '2px solid rgba(255, 255, 255, 0.3)'
						: isSuccess
							? '2px solid rgba(74, 222, 128, 0.6)'
							: '2px solid rgba(239, 68, 68, 0.6)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					boxShadow: isRolling
						? '0 4px 20px rgba(255, 255, 255, 0.2)'
						: isSuccess
							? '0 4px 20px rgba(74, 222, 128, 0.4)'
							: '0 4px 20px rgba(239, 68, 68, 0.4)',
				}}
			>
				<Text
					size="xl"
					fw={700}
					c={isRolling ? 'white' : isSuccess ? 'green' : 'red'}
					style={{ fontFamily: 'monospace' }}
				>
					{displayValue}
				</Text>
			</Box>
		</motion.div>
	);
}
