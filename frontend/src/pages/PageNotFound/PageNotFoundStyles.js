import styled from 'styled-components'
import { breakpoints } from '../../components/UI/Breakpoints/breakpoints'

export const FoundContainerStyled = styled.div`
	display: flex;
	place-content: center;
	width: 50%;
	height: 70vh;
	background: linear-gradient(135deg, #1b1b2f, #30336b);
	border-radius: 1rem;
	padding: 4rem;
	margin: 5% auto;

	@media (max-width: ${breakpoints.tablet}) {
		flex-direction: column;
		gap: 2rem;
		width: 80%;
	}

	@media (max-width: ${breakpoints.mobile}) {
		padding: 1rem;
		width: 80%;
		height: 80vh;
	}
`

export const FoundTextStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 2rem;
	width: 100%;

	@media (max-width: ${breakpoints.tablet}) {
		align-items: center;
		text-align: center;
	}
`

export const FoundTitleStyled = styled.h1`
	width: 35%;
	height: auto;
	margin: 0 auto;

	@media (max-width: ${breakpoints.tablet}) {
		font-size: 2.5rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		font-size: 2rem;
	}
`

export const FoundSubtitleStyled = styled.h2`
	font-weight: 400;
	font-size: 1.5rem;
	color: #ffffff;
	text-align: center;

	@media (max-width: ${breakpoints.tablet}) {
		font-size: 1.25rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		font-size: 1rem;
	}
`
export const CustomImageStyled = styled.img`
	width: 100%;
	margin: 0 auto;
	cursor: pointer;
	@media (max-width: ${breakpoints.tablet}) {
		width: 70%;
	}

	@media (max-width: ${breakpoints.mobile}) {
		width: 90%;
	}
`
