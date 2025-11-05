import styled from "styled-components";
import { breakpoints } from "../Breakpoints/breakpoints.js";

export const TextContainer = styled.div`
  display: inline-block;
  text-align: center;
  max-width: 100%;
  line-height: 1.5;

  h1 {
    width: 100%;
    margin: 0 auto;
    font-size: 2rem; /* Desktop size */
    white-space: nowrap; /* Texto en una línea para desktop */
    overflow: hidden;
    text-overflow: ellipsis; /* Manejar texto muy largo */
    color: #000;
  }

  /* Estilo para grandes desktops */
  @media (max-width: ${breakpoints.largeDesktop}) {
    h1 {
      font-size: 1.8rem; /* Reducir ligeramente el tamaño */
    }
  }

  /* Estilo para desktops y tablets */
  @media (max-width: ${breakpoints.desktop}) {
    h1 {
      font-size: 1.6rem;
    }
  }

  /* Estilo para tablets */
  @media (max-width: ${breakpoints.tablet}) {
    h1 {
      font-size: 1.4rem;
      white-space: normal; /* Permitir texto en varias líneas */
      width: 90%;
    }
  }

  /* Estilo para móviles */
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin: 0 auto;
    h1 {
      font-size: 1rem; /* Tamaño más pequeño */
      text-align: center;
      white-space: normal; /* Texto en múltiples líneas */
    }
  }
`;
