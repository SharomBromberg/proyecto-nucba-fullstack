import styled from "styled-components";
import { breakpoints } from "../UI/Breakpoints/breakpoints.js";

export const FooterContainerStyled = styled.footer`
  margin-top: auto;
  width: 100%;
  background: linear-gradient(
    135deg,
    rgba(56, 92, 170, 1) 10%,
    rgba(63, 218, 241, 1) 25%,
    rgba(60, 14, 84, 1) 35%,
    rgba(198, 93, 101, 1) 45%,
    rgba(62, 5, 59, 1) 55%,
    rgba(85, 8, 60, 1) 65%,
    rgba(8, 15, 32, 1) 75%,
    rgba(6, 11, 25, 1) 90%
  );
  color: #fff;
`;

export const FooterInnerStyled = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const BrandingStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    margin: 0;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    align-items: center;
  }
`;

export const ContactLinkStyled = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.5px;

  svg {
    font-size: 1.25rem;
  }
`;

export const SocialLinksStyled = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SocialLinkStyled = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  background: rgba(255, 255, 255, 0.18);
  font-size: 1.2rem;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px) scale(1.05);
  }
`;
