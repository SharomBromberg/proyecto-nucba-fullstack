import styled from 'styled-components';
import { breakpoints } from '../UI/Breakpoints/breakpoints';


export const MisOrdenesContainerStyled = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 90rem;
  margin: 0 auto;
  background: linear-gradient(135deg, #1b1b1b, #292929);
  border-radius: 1rem;
  box-shadow: 0rem 1rem 1.5rem rgba(0, 0, 0, 0.5);

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const PedidoContainerStyled = styled.div`
  background: #222222;
  width: 30rem;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.5);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0rem 0.8rem 1.5rem rgba(255, 0, 84, 0.7);
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 25rem;
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 1rem;
  }
`;

export const TextContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0.4rem;
  }
`;

export const TitleStyled = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  color: #ffffff;
  text-shadow: 0rem 0.1rem 0.2rem rgba(0, 0, 0, 0.7);

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

export const IdStyled = styled.p`
  font-size: 1rem;
  color: #aaaaaa;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const PriceStyled = styled.p`
  font-weight: 800;
  font-size: 2rem;
  background: linear-gradient(90deg, #ff0054, #5500ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const StatusStyled = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.status === 'completed' ? '#00ff00' : '#ff0054')};
  text-transform: uppercase;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;
