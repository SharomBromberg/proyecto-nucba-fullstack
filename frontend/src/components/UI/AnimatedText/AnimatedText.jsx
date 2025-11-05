import { motion } from 'framer-motion'
import { TextContainer } from './AnimatedTextStyled'

const AnimatedText = ({ text }) => {
	const words = text.split(' ')

	return (
		<TextContainer>
			<h1>
				{words.map((word, wordIndex) => (
					<span key={wordIndex} style={{ display: 'inline-block' }}>
						{word.split('').map((letter, letterIndex) => (
							<motion.span
								key={letterIndex}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									duration: 0.05,
									delay: wordIndex * 0.3 + letterIndex * 0.05,
								}}
							>
								{letter}
							</motion.span>
						))}
						&nbsp;
					</span>
				))}
			</h1>
		</TextContainer>
	)
}

export default AnimatedText
