import styled from 'styled-components'
import { breakpoints } from '../../components/UI/Breakpoints/breakpoints'

export const TextStyled = styled.div`
	display: flex;
	margin: 4rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 70vh;
	width: 70%;
	margin: 5% auto;
	background: linear-gradient(135deg, #1b1b1b, #292929);
	border: 0.2rem solid #4c4c4c;
	box-shadow: 0rem 1rem 1.5rem rgba(0, 0, 0, 0.7);
	border-radius: 1rem;
	padding: 4rem;
  @media (max-width: ${breakpoints.tablet}) {
  	width: 80%;
		height: 80vh;
  }

	@media (max-width: ${breakpoints.mobile}) {
		width: 80%;
		height: 80vh;
	}
`

export const CustomImageStyled = styled.img`
	width: 12rem;
	height: auto;
	border-radius: 1rem;
	cursor: pointer;
	transition: transform 0.3s, box-shadow 0.3s;
	&:hover {
		transform: scale(1.05);
		box-shadow: 0rem 1.5rem 2rem rgba(0, 255, 255, 0.7);
	}
`

export const TitleStyled = styled.h1`
	font-family: 'Press Start 2P', cursive;
	font-size: 2.5rem;
	color: #ff0054;
	text-shadow: 0rem 0.4rem 1rem rgba(0, 0, 0, 0.5), 0rem 0.2rem 0.5rem #aa0041;
	background: linear-gradient(90deg, #ff0054, #5500ff);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`

export const ContainerInfoStyled = styled.div`
	text-align: center;

	& p {
		color: #e1e1e1;
		font-size: 1.2rem;
		margin-bottom: 5rem;
		text-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
	}
`

export const PatternStyled = styled.img`
	width: 100%;
	position: fixed;
	z-index: -1;
	bottom: -8rem;
	opacity: 0.3;
	filter: hue-rotate(200deg) saturate(1.5);
`
