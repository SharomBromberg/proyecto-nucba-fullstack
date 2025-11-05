import styled from 'styled-components';

export const InputContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginInputStyled = styled.input`
  width: 300px;
  padding: 1.5rem 2rem;
  color: var(--dark-text, #333); /* Texto oscuro */
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semitransparente */
  border-radius: 15px;
  border: ${({ isError }) => (isError ? '1px solid #fb103d ' : 'none')};
  outline: none;
  caret-color: var(--dark-text, #333); /* Cursor oscuro */

  ::placeholder {
    opacity: 0.8;
    color: var(--dark-text, #333); /* Texto de placeholder oscuro */
  }

  -webkit-text-fill-color: var(--dark-text, #333); /* Texto de autofill oscuro */

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.8) inset; /* Fondo de autofill blanco semitransparente */
  }
`;

export const ErrorMessageStyled = styled.p`
  margin: 0;
  margin-top: 5px;
  color: #fb103d;
  font-size: 14px;
`;
