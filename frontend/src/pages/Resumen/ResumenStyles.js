import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../components/UI/Breakpoints/breakpoints';


export const ResumenContainerStyled = styled.div`
  padding: 3rem;
  background: linear-gradient(135deg, #1b1b1b, #292929);
  border-radius: 1rem;
  box-shadow: 0rem 1rem 1.5rem rgba(0, 0, 0, 0.8);
  max-width: 90rem;
  margin: 8rem auto;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem;
    max-width: 50rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
    max-width: 90%;
  }
`;

export const ResumenTitleStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #ff0054;
    text-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.7), 0rem 0.1rem 0.3rem #5500ff;

    @media (max-width: ${breakpoints.desktop}) {
      font-size: 2rem;
    }

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.8rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.5rem;
    }
  }
`;

export const StyledLink = styled(Link)`
  padding: 1rem 2rem;
  border: none;
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  background: linear-gradient(90deg, #ff0054, #5500ff);
  font-weight: 600;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0rem 0.5rem 1rem rgba(255, 0, 84, 0.7);
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
  }
`;

export const ProductsContainerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
  }
`;

export const HrStyled = styled.hr`
  margin: 3rem 0;
  border: none;
  height: 0.1rem;
  background: rgba(255, 255, 255, 0.2);

  @media (max-width: ${breakpoints.tablet}) {
    margin: 2rem 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 1.5rem 0;
  }
`;

export const ResumenContainerInfoStyled = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    margin-bottom: 1.5rem;

    @media (max-width: ${breakpoints.desktop}) {
      font-size: 1.3rem;
    }

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1.2rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1rem;
    }
  }
`;

export const CostoProductoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #e1e1e1;

  p {
    margin: 0;
  }

  span {
    font-weight: 600;
    color: #ffffff;
    text-shadow: 0rem 0.1rem 0.2rem rgba(0, 0, 0, 0.5);
  }

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

export const CostoEnvioStyled = styled(CostoProductoStyled)`
  color: #ff9300;

  span {
    color: #ff9300;
  }
`;

export const CostoTotalStyled = styled(CostoProductoStyled)`
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff0054;

  span {
    color: #ff0054;
    text-shadow: 0rem 0.2rem 0.4rem rgba(0, 0, 0, 0.7);
  }

  @media (max-width: ${breakpoints.desktop}) {
    font-size: 1.3rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;
