import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { breakpoints } from "../UI/Breakpoints/breakpoints.js";

export const NavbarContainerStyled = styled.div`
	height: 6.25rem;
  background: linear-gradient(135deg, 
    rgba(56, 92, 170, 1) 10%, 
    rgba(63, 218, 241, 1) 25%, 
    rgba(60, 14, 84, 1) 35%, 
    rgba(198, 93, 101, 1) 45%, 
    rgba(62, 5, 59, 1) 55%, 
    rgba(85, 8, 60, 1) 65%, 
    rgba(8, 15, 32, 1) 75%, 
    rgba(6, 11, 25, 1) 90%
);

	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 4rem;
	@media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`

export const ModalOverlayStyled = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 50;
	width: calc(100vw - 28.125rem);
	height: 100vh;

	${({ isHidden }) =>
		!isHidden &&
		css`
			backdrop-filter: blur(4px);
		`}
`
export const CustomImageStyled = styled.img`
	width: 3.75rem;
	height: 3.75rem;
	border-radius: 3.125rem;
	cursor: pointer;
`
export const LinksContainerStyled = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2.5rem;

	a {
		padding: 1rem 1.5rem;
	}

	a:first-child {
		border-radius: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.3125rem;
	}
`

export const LinkContainerStyled = styled.div`
	font-size: 1.2rem;
	color: ${(props) => (props.home ? '#ff9d01' : '#ff9300')};
`

export const UserContainerStyled = styled(LinkContainerStyled)`
	display: flex;
	align-items: center;
`

export const CartNavStyled = styled.div`
	position: relative;
	cursor: pointer;

	span {
		position: absolute;
		top: 0;

		height: 1.25rem;
		width: 1.25rem;
		text-align: center;

		border-radius: 1rem;
		border: 0.0625rem solid white;
		color: white;
		background-color: red;
		font-size: 0.9rem;
	}
`

export const UserNavStyled = styled.div`
	gap: 0.9375rem;
	cursor: pointer;
	span {
		color: white;
		font-size: 1rem;
		margin-right: 1.25rem;
	}
`

export const UserImageStyled = styled.img`
	width: 1.875rem;
	height: 1.875rem;
	border-radius: 6.25rem;
	cursor: pointer;
`

export const SpanStyled = styled.span`
	&:hover {
		text-decoration: underline;
	}
`
