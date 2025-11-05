import styled from 'styled-components';
import { motion } from 'framer-motion';
import { breakpoints } from '../../UI/Breakpoints/breakpoints';

export const ContainerStyled = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.875rem;
  width: 28.125rem;
  height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #1b1b1b, #292929);
  border-radius: 0 0 0 1rem;
  box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: 100vh;
    padding: 1.5rem;
  }
`;

export const CloseButtonContainerStyled = styled.div`
  height: 2rem;
`;

export const CloseButtonStyled = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: linear-gradient(90deg, #ff0054, #5500ff);
  color: #ffffff;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 0, 84, 0.7);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(255, 0, 84, 0.9);
  }
`;

export const TitleStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  color: #ffffff;
  margin: 0 0 1rem;

  & h1 {
    margin: 0;
    font-size: 1.8rem;
    text-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.7);
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.3rem;

    & h1 {
      font-size: 1.5rem;
    }
  }
`;

export const MainContainerStyled = styled.div`
  height: 80%;
  overflow-y: auto;

  @media (max-height: 800px) {
    height: 70%;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #5500ff;
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: #1b1b1b;
  }
`;

export const ProductsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  padding: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff0054;
    border-radius: 0.25rem;
  }
`;

export const ProductContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 98%;
  background: #2e2e2e;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 15px rgba(255, 0, 84, 0.7);
  }

  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    object-fit: cover;
  }
`;

export const TextContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 15rem;
  color: #ffffff;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const CardTitleStyled = styled.h3`
  margin: 0;
  font-weight: 600;
  font-size: 1.2rem;
  color: #ffffff;
  text-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.7);

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const PriceStyled = styled.span`
  font-weight: 800;
  font-size: 1.5rem;
  background: linear-gradient(90deg, #ff0054, #5500ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

export const PriceContainerStyled = styled.div`
  height: 50%;
  background-color: #1b1b1b;
  margin-top: 1rem;
  color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;

  & p {
    text-align: center;
    margin: 0;
    font-weight: bold;
  }
`;

export const SubtotalStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const EnvioStyled = styled(SubtotalStyled)``;

export const TotalStyled = styled(SubtotalStyled)`
  font-weight: bold;
  font-size: 1.2rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const ButtonContainerStyled = styled(SubtotalStyled)`
  justify-content: center;
  margin-top: 2rem;

  & button {
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    color: #ffffff;
    background: linear-gradient(90deg, #ff0054, #5500ff);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 15px rgba(255, 0, 84, 0.9);
    }
  }
`;

export const QuantityContainerStyled = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;
