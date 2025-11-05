import styled from "styled-components";
import { breakpoints } from "../UI/Breakpoints/breakpoints.js";

export const CardContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 90%;
  background: linear-gradient(145deg, #b3c7ff, #5a6eeb);
  padding: 1rem;
  border-radius: 0.5rem;

  & img {
    width: 5rem; /* 80px */
    height: 5rem;
    border-radius: 1rem; /* 16px */
    object-fit: cover;
  }

  @media (max-width: ${breakpoints.desktop}) {
    padding: 0.75rem;
    gap: 0.75rem;
    & img {
      width: 4.375rem; /* 70px */
      height: 4.375rem;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    & img {
      width: 3.75rem; /* 60px */
      height: 3.75rem;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.5rem;
    & img {
      width: 3.125rem; /* 50px */
      height: 3.125rem;
    }
  }
`;

export const CardInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 15rem; /* 240px */

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

export const ProductTitleStyled = styled.h3`
  margin: 0;
  margin-bottom: 0.125rem; /* 2px */
  font-weight: 500;
  font-size: 1.2rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const TextStyled = styled.h3`
  margin: 0;
  color: #666;
  font-size: 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
  }
`;

export const PriceStyled = styled.span`
  font-weight: 700;
  font-size: 1rem;
  line-height: 2rem;
  background: var(--btn-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9rem;
    line-height: 1.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
    line-height: 1.6rem;
  }
`;

export const QuantityContainerStyled = styled.span`
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.tablet}) {
    justify-content: space-between;
    width: 100%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
