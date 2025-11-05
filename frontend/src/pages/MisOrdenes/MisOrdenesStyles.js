import styled from 'styled-components';
import { breakpoints } from '../../components/UI/Breakpoints/breakpoints';

export const MisOrdenesContainerStyled = styled.div`
  max-width: 90rem;
  height: 90vh;
  margin: 5% auto;
  padding: 3rem;
  background: linear-gradient(135deg, #1c1c1c, #2b2b2b);
  border-radius: 1rem;
  box-shadow: 0rem 1rem 2rem rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 80%;
    height: auto;
    padding: 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 90%;
    padding: 1.5rem;
  }
`;

export const MisOrdenesTitleStyled = styled.h2`
  font-weight: 800;
  font-size: 3rem;
  text-align: center;
  color: #ff0054;
  text-shadow: 0rem 0.3rem 0.6rem rgba(0, 0, 0, 0.8), 0rem 0.2rem 0.4rem #5500ff;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const MisOrdenesPatternStyled = styled.img`
  width: 100%;
  position: fixed;
  z-index: -1;
  bottom: -10rem;
  opacity: 0.3;
  filter: hue-rotate(180deg) saturate(1.5);

  @media (max-width: ${breakpoints.tablet}) {
    bottom: -8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    bottom: -6rem;
  }
`;

export const MisOrdenesBtnContainerStyled = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  button {
    padding: 1.2rem 2.5rem;
    font-size: 1.4rem;
    font-weight: bold;
    color: #ffffff;
    background: linear-gradient(90deg, #ff0054, #5500ff);
    border: none;
    border-radius: 0.7rem;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0rem 0.6rem 1.2rem rgba(255, 0, 84, 0.8);
    }

    @media (max-width: ${breakpoints.tablet}) {
      padding: 1rem 2rem;
      font-size: 1.2rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
    }
  }
`;
