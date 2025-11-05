import { createGlobalStyle } from "styled-components";
import { breakpoints } from "../components/UI/Breakpoints/breakpoints.js";

export const GlobalStyles = createGlobalStyle`

  :root {
    --orange-bg: #2f2618;
    --orange: #ff9d01;
    --magenta: #FF005C;
    --btn-gradient: linear-gradient(90deg, #1f1f7a, #7d1fff);
  }

  @font-face {
    font-family: 'Press_Start_2P';
      src: url('/assets/fonts/Press_Start_2P/PressStart2P-Regular.ttf') format('truetype');
    font-weight: 200;
    font-style: normal;
  }

  html {
    scroll-behavior: smooth;
    font-size: 100%; /* Default font size (16px) */

    @media (max-width: ${breakpoints.desktop}) {
      font-size: 90%; /* Reduce to 14.4px for desktops below 1024px */
    }

    @media (max-width: ${breakpoints.tablet}) {
      font-size: 85%; /* Reduce to 13.6px for tablets */
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 75%; /* Reduce to 12px for small mobile screens */
    }
  }

  body {
    margin: 0;
    padding: 0;
    background: #1b1b1b; /* Dark background for gamer aesthetic */
    /* Use Inter for UI text and fallbacks for broad support */
    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif;
    color: white;
    -webkit-tap-highlight-color: transparent;
    overflow-x: hidden;

    @media (max-width: ${breakpoints.mobile}) {
      line-height: 1.4; /* Adjust line-height for readability */
    }
  }

  /* Headings use a more classic serif for a professional tone */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', 'Georgia', 'Times New Roman', serif;
    font-weight: 700;
    line-height: 1.2;
    color: inherit;
    margin: 0 0 0.5rem 0;
  }

  a {
    text-decoration: none;
    color: inherit;

    &:visited {
      color: white;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;

    &:hover {
      opacity: 0.8;
    }
  }

  /* Utility Classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (max-width: ${breakpoints.tablet}) {
      padding: 0 0.5rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      padding: 0 0.25rem;
    }
  }

  .text-center {
    text-align: center;
  }

  .hidden {
    display: none !important;
  }

  /* Prevent overflow for all elements */
  * {
    box-sizing: border-box;
    overflow-wrap: break-word;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--btn-gradient);
    border-radius: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;
