import styled, { keyframes } from 'styled-components';

export const DotWrapper = styled('div')({
  width: 'fit-content',
  height: '22px',
  display: 'inline-flex',
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
  width: 5px;
  height: 5px;
  margin: 0 3px;
  /* Animation */
  animation: ${BounceAnimation} 0.44s linear infinite;
  animation-delay: ${props => props['data-delay']};

  @media screen and (min-width: 420px) {
    width: 6px;
    height: 6px;
    animation: ${BounceAnimation} 0.42s linear infinite;
    animation-delay: ${props => props['data-delay']};
  }

  @media screen and (min-width: 576px) {
    width: 7px;
    height: 7px;
    margin: 0 4px;
  }

  @media screen and (min-width: 768px) {
    width: 8px;
    height: 8px;
    margin: 0 5px;
    animation: ${BounceAnimation} 0.4s linear infinite;
    animation-delay: ${props => props['data-delay']};
  }
`;
