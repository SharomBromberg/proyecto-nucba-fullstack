import styled from 'styled-components'
import { breakpoints } from '../UI/Breakpoints/breakpoints.js'

export const ProductosContainer = styled.div`
	display: flex;
	place-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 2.5rem;
	width: 100%;
	padding: 1rem 0;

	@media (max-width: ${breakpoints.tablet}) {
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	}

	@media (max-width: ${breakpoints.mobile}) {
		grid-template-columns: 1fr;
	}
`

export const ProductosCard = styled.div`
	display: flex;
	flex-direction: column;
	background: linear-gradient(145deg, #2b2b2c, #1e1e1f);
	width: 22rem;
	height: 35rem;
	border-radius: 1rem;
	padding: 1.5rem;
	transition: transform 0.3s, box-shadow 0.3s;
	box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
	object-fit: cover;
	&:hover {
		transform: scale(1.05);
		box-shadow: 0 0.75rem 1.5rem rgba(100, 100, 255, 0.3);
	}
	@media (max-width: ${breakpoints.tablet}) {
		
		padding: 1rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		width: 80%;
		padding: 0.8rem;
	}
`
export const ImageContainer = styled.div`
	flex: 1;
	display: flex;
	height: 70%;
	place-content: center;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0.9375rem;
	}
`
export const TextContainer = styled.div`
	flex: 1;
	height: 15%;
	display: flex;
	flex-direction: column;
	place-content: center;
	margin: 0;
	h2 {
		font-weight: 600;
		color: #f8f9fa;
		margin: 0 0 0.5rem;
		margin: 0;
	}
	p {
		color: #b3b3b3;
		font-size: 1rem;
		line-height: 1.4;
	}
	@media (max-width: ${breakpoints.mobile}) {
    h2 {
      font-size: 1rem;
    }

    p {
      font-size: 0.85rem;
    }
  }
`

export const ContainerPrice = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 1rem;

	@media (max-width: ${breakpoints.tablet}) {
		margin-bottom: 0.8rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		margin-bottom: 0.5rem;
	}
`

export const CardPrice = styled.span`
	font-weight: 800;
	font-size: 1.75rem;
	background: linear-gradient(90deg, #ff0054, #5500ff);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	transition: transform 0.3s;

	&:hover {
		transform: scale(1.1);
	}

	@media (max-width: ${breakpoints.mobile}) {
		font-size: 1.5rem;
	}
`
