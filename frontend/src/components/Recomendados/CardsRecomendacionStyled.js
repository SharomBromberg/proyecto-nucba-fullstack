import styled from 'styled-components'
import { breakpoints } from '../UI/Breakpoints/breakpoints'
export const CardsContainer = styled.div`
	display: flex;
	gap: 1.25rem;
	padding: 1.5rem;
	overflow: scroll;
	margin: 0;

	&::-webkit-scrollbar {
		height: 0.375rem;
		width: 45%;
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(85, 8, 60, 1);
		border-radius: 0.3125rem;
	}

	&::-webkit-scrollbar:vertical {
		display: none;
	}
`

export const Card = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 25rem;
	gap: 1.25rem;
	height: 16rem;
	padding: 1rem 1.0625rem;
	background: linear-gradient(145deg, #0a0a23, #001f3f);
	border-radius: 0.9375rem;
	@media (max-width: ${breakpoints.tablet}) {
		flex-direction: column;
		min-width:100%;
		height: 35rem;
		gap: 1.3rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		width: 35%;
	}
`
export const cardContent = styled.div`
	display: flex;
	height: 100%;
	button{
		margin: auto 0
	}
	@media (max-width: ${breakpoints.tablet}) {
		flex-direction: column;
		display: flex;
		width: 100%;
	
	}

	@media (max-width: ${breakpoints.mobile}) {
		display: flex;
		width: 100%;
		place-content: center;
	}
	`

export const CardImg = styled.img`
	width: 45%;
	height: auto;
	border-radius: 1rem;
	object-fit: cover;
	@media (max-width: ${breakpoints.tablet}) {
		width: 35%;
		height: 30%;
		}

	@media (max-width: ${breakpoints.mobile}) {
		width: 35%;
		height: 30%;
	}
`

export const CardText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.8rem;
	height: 12rem;
	text-align: center;
	justify-content: center;
	place-content: center;
	padding: 0.3125rem;
	text-align: left;
	align-items: flex-start;
	@media (max-width: ${breakpoints.tablet}) {
		width: 100%;
	}

	@media (max-width: ${breakpoints.mobile}) {
		width:100%;
		height: 13rem;
	}
`

export const CardTitle = styled.h3`
	margin: 0;
	margin-bottom: 0.3125rem;
	font-weight: 500;
	font-size: 1rem;
	letter-spacing: 0.05rem;
	padding: 0;
  background: linear-gradient(145deg, #b3c7ff, #5a6eeb);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@media (max-width: ${breakpoints.tablet}) {
		font-size: 1.5rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		font-size: 0.8rem;

	}
`

export const InfoCard = styled.p`
	margin: 0;
	color: #fff;
	font-size: 0.8rem;
	padding: 0;
	@media (max-width: ${breakpoints.tablet}) {
		font-size: 1.5rem;
	}
	@media (max-width: ${breakpoints.mobile}) {
		font-size: 0.8rem;

	}
`

export const CardPrice = styled.span`
	font-weight: 800;
	font-size: 0.8rem;
	background: linear-gradient(83deg, rgba(85, 8, 60, 1), rgba(63, 218, 241, 1));
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@media (max-width: ${breakpoints.tablet}) {
		font-size: 1.5rem;
	}
	@media (max-width: ${breakpoints.mobile}) {
		font-size: 0.8rem;

	}
`
