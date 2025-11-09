import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { breakpoints } from '../UI/Breakpoints/breakpoints.js'

export const NavbarContainerStyled = styled.header`
	width: 100%;
	height: 6.25rem;
	background: linear-gradient(
		135deg,
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
	justify-content: center;
	align-items: center;
	padding: 0 2rem;
	position: relative;
	box-shadow: 0 18px 45px rgba(8, 4, 20, 0.35);

	@media (max-width: ${breakpoints.tablet}) {
		padding: 0 1.5rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		padding: 0 1.25rem;
		height: 5.5rem;
	}
`

export const NavbarContentStyled = styled.div`
	width: 100%;
	max-width: 1200px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;

	@media (max-width: ${breakpoints.mobile}) {
		gap: 1rem;
	}
`

export const MenuOverlayStyled = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(5, 4, 15, 0.6);
	backdrop-filter: blur(1px);
	z-index: 4;
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

export const BrandLinkStyled = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	text-decoration: none;
	color: #ffffff;
	font-weight: 700;

	@media (max-width: ${breakpoints.mobile}) {
		gap: 0.5rem;
	}
`

export const BrandTitleStyled = styled.span`
	font-size: 1.3rem;
	font-weight: 800;
	letter-spacing: 0.04em;
	text-transform: uppercase;

	@media (max-width: ${breakpoints.mobile}) {
		font-size: 1.1rem;
	}
`
export const HamburgerButton = styled.button`
	display: none;
	background: transparent;
	border: none;
	color: #ffffff;
	font-size: 2rem;
	cursor: pointer;
	z-index: 6;

	@media (max-width: ${breakpoints.mobile}) {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

export const LinksContainerStyled = styled.div`
	color: #f0f0ff;
	flex: 1;
	display: ${({ $isMobile, $isOpen }) =>
		$isMobile ? ($isOpen ? 'flex' : 'none') : 'flex'};
	justify-content: flex-end;
	align-items: center;
	gap: 2.5rem;
	margin-left: auto;

	a {
		padding: 1rem 1.5rem;
		color: inherit;
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	a:first-child {
		border-radius: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.3125rem;
	}

	@media (max-width: ${breakpoints.tablet}) {
		gap: 1.5rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		padding: 1.25rem;
		background: linear-gradient(
			180deg,
			rgba(24, 21, 36, 0.97),
			rgba(14, 11, 22, 0.95)
		);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0 0 1.25rem 1.25rem;
		box-shadow: 0 18px 32px rgba(6, 4, 15, 0.8);
		z-index: 7;
		margin-left: 0;
		flex: unset;

		a {
			padding: 0.5rem 1rem;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
		}

		& > * {
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}
`

export const NavLinksGroupStyled = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;

	@media (max-width: ${breakpoints.tablet}) {
		gap: 1rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		display: contents;
	}
`

export const NavActionsStyled = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
	padding-left: 1.5rem;
	border-left: 1px solid rgba(255, 255, 255, 0.2);

	@media (max-width: ${breakpoints.tablet}) {
		gap: 1rem;
		padding-left: 1rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		display: contents;
		padding-left: 0;
		border-left: none;
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
	display: flex;
	align-items: center;
	justify-content: center;

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

	@media (max-width: ${breakpoints.mobile}) {
		width: 100%;
	}
`

export const UserNavStyled = styled.div`
	gap: 0.9375rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	span {
		color: white;
		font-size: 1rem;
		margin-right: 1.25rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		width: 100%;
		justify-content: center;
		gap: 0.625rem;
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
