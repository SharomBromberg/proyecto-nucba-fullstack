import styled from 'styled-components'
import { breakpoints } from '../Breakpoints/breakpoints.js'

export const ImageBackgroundStyled = styled.div`
	margin-top: 6.25rem;
	position: absolute;
	inset: 0;
	pointer-events: none;
	width: 100%;
	height: auto;
	background-image: url(${(p) => p.src});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;

	@media (max-width: ${breakpoints.tablet}) {
		margin-top: 6.25rem;
		height: 48rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		margin-top: 6.25rem;
		height: 40rem;
	}
`
