import styled from 'styled-components';
import { breakpoints } from '../UI/Breakpoints/breakpoints';

export const ProductStyled = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(135deg, #1b1b1b, #292929);
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 620px;
  box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.7);
  margin: 1rem auto;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    padding: 1.2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const ProductLeftStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  img {
    width: 100px;
    height: 100px;
    border-radius: 0.5rem;
    object-fit: cover;
    box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.5);

    @media (max-width: ${breakpoints.tablet}) {
      width: 80px;
      height: 80px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      width: 60px;
      height: 60px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      font-size: 1.2rem;
      font-weight: bold;
      color: #ffffff;

      @media (max-width: ${breakpoints.tablet}) {
        font-size: 1rem;
      }

      @media (max-width: ${breakpoints.mobile}) {
        font-size: 0.9rem;
      }
    }

    p {
      font-size: 1rem;
      color: #cccccc;

      @media (max-width: ${breakpoints.tablet}) {
        font-size: 0.9rem;
      }

      @media (max-width: ${breakpoints.mobile}) {
        font-size: 0.8rem;
      }
    }
  }
`;

export const PriceContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;

  p {
    font-size: 1rem;
    font-weight: 600;
    color: #ff9300;

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 0.9rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.8rem;
    }
  }
`;

export const ProductPriceStyled = styled.span`
  font-weight: 800;
  font-size: 1.25rem;
  background: linear-gradient(90deg, #ff0054, #5500ff);
  -webkit-background-clip: text;
  color: transparent;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;