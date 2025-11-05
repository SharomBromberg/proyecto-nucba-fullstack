import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { breakpoints } from '../../UI/Breakpoints/breakpoints';

export const ModalContainerStyled = styled(motion.div)`
  position: absolute;
  background-color: #2b2b2c;
  box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.3);
  width: 450px;
  top: 100px;
  right: 0;
  z-index: 98;
  border-radius: 1rem 0 0 1rem;
  padding: 2rem;
  transition: all 0.3s ease;

  & span {
    display: flex;
    margin-top: 10px;
    cursor: pointer;
    color: #ffffff;

    &:hover {
      opacity: 90%;
      color: #ff0054; /* Destaca en hover */
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 350px;
    top: 80px;
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 90%;
    top: 50px;
    right: 5%;
    padding: 1rem;
    border-radius: 1rem;
  }
`;

export const LinkStyled = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    opacity: 90%;
    color: #5500ff; /* Color neón al hover */
  }
`;

export const UsernameStyled = styled.h2`
  font-weight: 400;
  font-size: 1.5rem;
  color: #ffffff;
  text-shadow: 0rem 0.2rem 0.4rem rgba(0, 0, 0, 0.7);

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.3rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

export const HrStyled = styled.hr`
  margin: 2rem 0;
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);

  @media (max-width: ${breakpoints.mobile}) {
    margin: 1.5rem 0;
  }
`;

