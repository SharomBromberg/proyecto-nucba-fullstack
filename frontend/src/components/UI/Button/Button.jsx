import { StyledButton } from './ButtonStyled'

const Button = ({
	children,
	radius = '32',
	secondary,
	disabled = false,
	type = 'button',
	onClick = () => {},
}) => {
	return (
		<StyledButton
			disabled={disabled}
			onClick={onClick}
			secondary={secondary}
			radius={radius}
			type={type}
			whileTap={{ scale: 0.95 }}
		>
			{children}
		</StyledButton>
	)
}

export default Button
