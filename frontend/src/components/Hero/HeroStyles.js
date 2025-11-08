import styled from "styled-components";
import { breakpoints } from "../UI/Breakpoints/breakpoints.js";

export const HeroContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  max-width: 100%;
  h1 {
    margin-bottom: 2rem;
    text-align: center;
    width: 100%;
    padding: 0 2rem;
    color: #000;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 2rem auto;
    h1 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 0.5rem auto;
    h1 {
      width: 100%;
      font-size: 1rem;
      text-align: center;
    }
  }
`;

export const ContentContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  position: relative;
  padding: 1rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 0.5rem;
  }
  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.15rem;
  }
`;

export const CustomImageStyled = styled.img`
  width: auto;
  height: 17rem;
  margin: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(48, 12, 158, 0.6);

  @media (max-width: ${breakpoints.desktop}) {
    width: 12.5rem;
    height: 12.5rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0 auto;
    width: 10rem;
    height: 10rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 0 auto;
    width: 7.5rem;
    height: 7.5rem;
    margin: 1.5rem;
  }
`;

export const HeroFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  padding: 1rem 2rem;
  background-color: rgba(248, 249, 250, 0.7);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0 auto;
    gap: 1rem;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    width: 100%;
    padding: 1.25rem;
    margin: 0 auto;
    gap: 0.75rem;
    border-radius: 0.3rem;
  }
`;

export const CategoryContainerStyled = styled.div`
  width: 22rem;
  height: 15rem;
  place-content: center;
  padding: 2rem;
  color: black;
  overflow: hidden;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(48, 12, 158, 0.6);

  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
  position: relative;
  outline: none;

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0 auto;
    width: 24rem;
    height: 18rem;
    padding: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin: 0 auto;
    width: 15rem;
    height: 10rem;
    padding: 1rem;
  }
`;

export const CategoryItemStyled = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  object-fit: cover;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.isSelected ? 1 : 0.9)};
  transform: ${(props) => (props.isSelected ? "scale(1.1)" : "scale(0.9)")};
  transition: opacity 0.8s, transform 0.8s;

  img {
    width: 3.125rem;
    height: 3.125rem;
    margin-right: 1rem;
  }

  span {
    font-size: 1.125rem;
    font-weight: bolder;
    text-align: center;
  }

  @media (max-width: ${breakpoints.tablet}) {
    img {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.75rem;
    }

    span {
      font-size: 1rem;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    img {
      width: 2rem;
      height: 2rem;
    }

    span {
      font-size: 0.9rem;
    }
  }
`;
