import styled from 'styled-components';
import { breakpoints } from "../../components/UI/Breakpoints/breakpoints.js";
export const ContainerCheckoutStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2rem 5rem;
  @media (max-width: ${breakpoints.mobile}) {
   width: 100%;
    gap: 1rem;
    padding: none;
  }
`;
