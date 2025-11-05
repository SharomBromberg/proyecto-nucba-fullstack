import styled from 'styled-components';
import { Formik as FormikContainer, Form as FormikForm } from 'formik';
import { breakpoints } from "../../UI/Breakpoints/breakpoints.js";

export const CheckoutDatosStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 4rem;
  margin: 4rem auto;
  color: #ffffff;
  background: linear-gradient(135deg, #1b1b1b, #292929);
  border-radius: 1rem;
  box-shadow: 0rem 0.5rem 1.5rem rgba(0, 0, 0, 0.8);
  text-align: center;
  gap: 3rem;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
    padding: 2.5rem;
    gap: 2rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 2rem;
    gap: 1.5rem;
  }
`;

export const Formik = styled(FormikContainer)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
  }
`;

export const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
  }
`;

export const ButtonStyled = styled.button`
  align-self: center; /* Center button horizontally */
  margin-top: auto; /* Push the button to the bottom */
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #ff0054, #5500ff);
  color: #ffffff;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0rem 0.5rem 1rem rgba(255, 0, 84, 0.7);
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }
`;
