import styled from "styled-components";
import { breakpoints } from "../UI/Breakpoints/breakpoints.js";

export const CardContainerStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background: linear-gradient(145deg, rgba(30, 30, 46, 0.9), rgba(47, 9, 54, 0.9));
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ImageWrapper = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 4rem;
    height: 4rem;
  }
`;

export const CardInfoStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const ProductTitleStyled = styled.h3`
  margin: 0;
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const PriceStyled = styled.span`
  font-weight: 700;
  font-size: 1rem;
  background: var(--btn-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    flex-wrap: wrap;
  }
`;
