import { Box } from '@mantine/core';
import { useState } from 'react';

interface Star {
	id: number;
	left: string;
	top: string;
	size: number;
	duration: number;
	delay: number;
}

export function StarField() {
	const [stars] = useState<Star[]>(() =>
		Array.from({ length: 50 }, (_, i) => ({
			id: i,
			left: `${Math.random() * 100}%`,
			top: `${Math.random() * 100}%`,
			size: Math.random() * 2 + 1,
			duration: Math.random() * 3 + 2,
			delay: Math.random() * 2,
		})),
	);

	return (
		<Box
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
				zIndex: 0,
			}}
		>
			{stars.map((star) => (
				<Box
					key={star.id}
					style={{
						position: 'absolute',
						left: star.left,
						top: star.top,
						width: star.size,
						height: star.size,
						background: 'white',
						borderRadius: '50%',
						animation: `twinkle ${star.duration}s ease-in-out infinite`,
						animationDelay: `${star.delay}s`,
					}}
				/>
			))}
		</Box>
	);
}
