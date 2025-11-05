import styled from 'styled-components'
import { breakpoints } from '../../components/UI/Breakpoints/breakpoints.js'

export const HomeWrapper = styled.div`
	width: 90vw;
	max-width: 100vw;
	padding: 2rem;
	margin: 0 auto;
	h2 {
		text-align: center;
	}
	@media (max-width: ${breakpoints.tablet}) {
		width: 95%;
		gap: 1rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		width: 100%;
		padding: 1rem;
	}
`

export const CategoriasWrapper = styled.section`
	margin-top: 6rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	h2 {
		color: #ffffffff;
		text-align: center;
	}
	@media (max-width: ${breakpoints.tablet}) {
		width: 90%;
		margin: 4rem auto;
		gap: 1.5rem;
	}

	@media (max-width: ${breakpoints.mobile}) {
		width: 95%;
		gap: 1rem;
		margin: 2rem auto;
	}
`


export const ProductosWrapper = styled.section`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    padding-top: 3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 2rem;
  }
`;

export const RecomendadosWrapper = styled.section`
	display: flex;
	flex-direction: column;
	text-align: center;
	margin-top: 8rem;
	width: 100%;

	h2 {
		display: inline-block;
		font-size: 2rem;
		font-weight: bold;
		justify-content: center;
		color: #ffffffff;
		animation: wave 1.5s ease-in-out infinite;
	}

	@keyframes wave {
		0%,
		100% {
			transform: translateY(0);
		}
		25% {
			transform: translateY(-10px);
		}
		50% {
			transform: translateY(10px);
		}
		75% {
			transform: translateY(-10px);
		}
	}
`

export const ButtonContainerStyled = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
	margin-top: 3rem;
`
