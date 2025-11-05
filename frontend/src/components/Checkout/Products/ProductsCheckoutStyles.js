import styled from 'styled-components';
import { breakpoints } from "../../UI/Breakpoints/breakpoints.js";

export const ProductosContainerStyled = styled.div`
  margin: 4rem auto;
  color: #ffffff;
  width: 40%;
  background: linear-gradient(135deg, #1b1b1b, #292929);
  border-radius: 1rem;
  box-shadow: 0rem 0.5rem 1.5rem rgba(0, 0, 0, 0.8);
  padding: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    width: 60%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const ProductsTitleStyled = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
  color: #ff0054;
  text-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8), 0rem 0.1rem 0.3rem #5500ff;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

export const CardsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 80%;
  height: 27.5rem;
  margin: 0 auto;
  overflow-y: scroll;
  background: linear-gradient(135deg, #292929, #1b1b1b);
  border-radius: 0.5rem;
  padding: 1rem;

  &::-webkit-scrollbar {
    background: transparent;
    width: 0.375rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #5500ff;
    border-radius: 0.5rem;
  }

  &::-webkit-scrollbar:horizontal {
    display: none;
  }

  @media (max-height: 50rem) {
    height: 16.875rem;
  }

  @media (max-width: ${breakpoints.desktop}) {
    width: 100%;
  }
`;

export const PriceContainerStyled = styled.div`
  margin: 2rem auto 0;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(135deg, #1b1b1b, #292929);
  border-radius: 1rem;
  box-shadow: 0rem 0.5rem 1.5rem rgba(0, 0, 0, 0.8);
  padding: 1rem 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 1rem;
  }
`;

export const SubtotalStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #cccccc;
  font-size: 1.2rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const EnvioStyled = styled(SubtotalStyled)`
  color: #ff9300;
`;

export const TotalStyled = styled(SubtotalStyled)`
  font-weight: bold;
  color: #ff0054;
`;

export const PriceTotalStyled = styled.span`
  background: linear-gradient(90deg, #ff0054, #5500ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  font-size: 1.3rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

export const HrStyled = styled.hr`
  margin: 1rem 0;
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
`;
