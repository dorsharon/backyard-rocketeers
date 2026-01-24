import { ThemeIcon } from '@mantine/core';
import { IconRocket } from '@tabler/icons-react';
import { motion } from 'motion/react';
import type { RocketLiftoffProps } from './LaunchSequence.types';

export function RocketLiftoff({ success }: RocketLiftoffProps) {
	return (
		<motion.div
			initial={{ y: 0 }}
			animate={
				success
					? {
							y: [-20, -400],
							scale: [1, 0.5],
							opacity: [1, 0],
						}
					: {
							y: [0, -30, 0],
							rotate: [0, -5, 5, -10, 10, 0],
							scale: [1, 1.1, 0.9, 1],
						}
			}
			transition={
				success
					? { duration: 2, ease: 'easeIn' }
					: { duration: 1.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
			}
			style={{ position: 'relative' }}
		>
			<ThemeIcon
				size={120}
				radius="xl"
				variant="gradient"
				gradient={success ? { from: 'orange', to: 'yellow' } : { from: 'red', to: 'orange' }}
			>
				<IconRocket size={60} />
			</ThemeIcon>

			{/* Flame trail */}
			<motion.div
				animate={{
					scaleY: success ? [1, 2, 3] : [1, 1.5, 1],
					opacity: success ? [1, 1, 0] : [0.8, 1, 0.8],
				}}
				transition={{
					duration: success ? 2 : 0.5,
					repeat: success ? 0 : Infinity,
				}}
				style={{
					position: 'absolute',
					bottom: -40,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 40,
					height: 60,
					background: 'linear-gradient(180deg, #ff6b00 0%, #ff0000 50%, transparent 100%)',
					borderRadius: '50% 50% 50% 50% / 0% 0% 100% 100%',
					filter: 'blur(4px)',
				}}
			/>
		</motion.div>
	);
}
