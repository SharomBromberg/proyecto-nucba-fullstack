import styled from 'styled-components'
import { breakpoints } from '../UI/Breakpoints/breakpoints.js' // Importa el objeto breakpoints

export const FooterContainerStyled = styled.footer`
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
	place-content: center;
	justify-content: center;
	align-items: center;

	p span {
		font-weight: 800;
	}
	@media (max-width: ${breakpoints.tablet}) {
		width: 100%;
	}

	@media (max-width: ${breakpoints.mobile}) {
		width: 100%;
	}
`

export const LinksContainerStyled = styled.div``
