import styled from "styled-components";
import { breakpoints } from "../../components/UI/Breakpoints/breakpoints";

export const DetailWrapper = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 3rem;
  border-radius: 32px;
  background: linear-gradient(
    135deg,
    rgba(15, 15, 30, 0.95),
    rgba(40, 10, 56, 0.9)
  );
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);

  @media (max-width: ${breakpoints.tablet}) {
    padding: 2rem;
    margin: 2rem;
  }
`;

export const DetailContent = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Gallery = styled.div`
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  min-height: 35rem;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #0b0b16;
  }
`;

export const GalleryControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 1rem;

  button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 1.2rem;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Thumbnails = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
  overflow-x: auto;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
    opacity: 0.6;
    border: 2px solid transparent;

    &.active {
      opacity: 1;
      border-color: #c020ff;
    }
  }
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #fff;

  h1 {
    margin: 0;
    font-size: 2.8rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

export const DetailPrice = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
  background: linear-gradient(90deg, #ff006e, #8338ec);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const DetailButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  button {
    flex: 1;
    min-width: 160px;
  }
`;
