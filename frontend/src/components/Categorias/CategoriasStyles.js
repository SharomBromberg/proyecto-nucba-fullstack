import styled from "styled-components";
import { motion } from "framer-motion";
import { breakpoints } from "../UI/Breakpoints/breakpoints.js";

export const CategoriasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  user-select: none;
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const CardCategoria = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 14rem;
  height: 12rem;
  padding: 2rem 0.5rem;
  background-color: ${({ selected }) =>
    selected ? "#3a3a3a" : "rgba(255, 255, 255, 0.5)"};
  border-radius: 0.9375rem;
  place-content: center;
  cursor: pointer;
  box-shadow: ${({ selected }) =>
    selected
      ? "0 0.5rem 1rem rgba(0, 0, 0, 0.1)"
      : "0 0.2rem 0.5rem rgba(255, 255, 255, 0.3)"};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
  }


  h2 {
    font-size: 0.875rem;
    text-align: center;
    &:hover {
    color: #fff;
  }
  }

  img {
    max-width: 100%;
    height: 50%;
    object-fit: contain;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 14rem;
    height: 11rem;
    padding: 1.5rem 0.5rem;

    h2 {
      font-size: 0.9rem;
    }

    img {
      height: 5rem;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    
    height: 10.5rem;
    padding: 1rem 0.5rem;

    h2 {
      font-size: 0.8rem;
    }

    img {
      height: 4.5rem;
    }
  }
`;

export const BorderDecoration = styled.div`
  height: 0.3125rem;
  width: 30%;
  background: var(--btn-gradient);
  border-radius: 0.9375rem;
  transition: width 0.3s;

  @media (max-width: ${breakpoints.tablet}) {
    width: 25%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 20%;
  }
`;
