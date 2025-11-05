import styled from 'styled-components';
import { breakpoints } from '../Breakpoints/breakpoints';
export const InputBoxStyled = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100% !important;
    margin: none;
  }
`;

export const InputLabelStyled = styled.label`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100% !important;
  }
`;

export const InputStyled = styled.input`
 background-color: #1a1a1d;
  outline: none;
  border: ${({ isError }) => (isError ? '2px solid #fb103d' : '2px solid #4caf50')}; /* Bordes dinámicos */
  border-radius: 0.5rem;
  height: 2.75rem;
  padding: 0.5rem 1rem;
  color: #e0e0e0;
  font-family: 'Press_Start_2P';
	src: url('/src/assets/fonts/Press_Start_2P/PressStart2P-Regular.ttf') format('truetype');
  font-size: 0.75rem;
  font-weight: 100;
  letter-spacing: 0.25rem;
  width: 85%;
  margin-top: 1rem;


  ::placeholder {
    color: #888888;
    opacity: 80%;
  }
  &:hover {
    border-color: #4caf50;
    box-shadow: 0 0 8px #4caf50;
  }
  -webkit-text-fill-color: white;
  &:focus {
    border-color: #fb103d;
    box-shadow: 0 0 12px #fb103d;
    background-color: #222227;
  }
  
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px #1a1a1d inset; 
  }
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.5rem;
    width: 100%;
  }

`;

export const ErrorMessageStyled = styled.p`
  margin: 0;
  margin-top: 5px;
  color: #fb103d;
  font-size: 14px;
`;
