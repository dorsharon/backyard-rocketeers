import { motion } from 'motion/react';

export function Explosion() {
	return (
		<motion.div
			initial={{ scale: 0, opacity: 1 }}
			animate={{ scale: [0, 2, 3], opacity: [1, 1, 0] }}
			transition={{ duration: 1 }}
			style={{
				position: 'absolute',
				width: 200,
				height: 200,
				borderRadius: '50%',
				background: 'radial-gradient(circle, #ff6b00 0%, #ff0000 40%, transparent 70%)',
				filter: 'blur(10px)',
			}}
		/>
	);
}
