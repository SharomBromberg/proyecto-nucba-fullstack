import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const StyledButton = styled(motion.button)`
 background: linear-gradient(90deg, 
        rgba(85, 8, 60, 1) 0%, 
        rgba(60, 14, 84, 1) 50%, 
        rgba(56, 92, 170, 1) 100%
    );
    color: white;
    padding: 0.625rem 1.25rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    font-size: 1rem;        
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(90deg, 
        rgba(60, 14, 84, 1) 0%, 
        rgba(85, 8, 60, 1) 50%, 
        rgba(198, 93, 101, 1) 100%
    );
    transform: scale(1.05);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  ${({ secondary }) =>
    secondary &&
    css`
      background: #252525;
      & span {
        background: var(--btn-gradient);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
    `}
`;
