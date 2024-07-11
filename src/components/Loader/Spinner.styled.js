import styled, { keyframes } from "styled-components";

export const DotWrapper = styled('div')({
  width: 'fit-content',
  height: '22px',
  display: 'flex',
  alignItems: 'flex-end',
});

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 14px }
  100% { margin-bottom: 0 }
`;

export const Dot = styled('div')`
  background-color: var(--color-basic-black);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.4s linear infinite;
  animation-delay: ${props => props['data-delay']};
`;