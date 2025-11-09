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
    font-size: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #000;
  }

  @media (max-width: ${breakpoints.largeDesktop}) {
    h1 {
      font-size: 1.8rem;
    }
  }

  @media (max-width: ${breakpoints.desktop}) {
    h1 {
      font-size: 1.6rem;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    h1 {
      font-size: 1.4rem;
      white-space: normal;
      width: 90%;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin: 0 auto;
    h1 {
      font-size: 1rem;
      text-align: center;
      white-space: normal;
    }
  }
`;
