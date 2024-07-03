import styled, { keyframes } from "styled-components";

export const LoaderWrapper = styled('div')({
  width: '100%',
  marginTop: '16px',
  paddingLeft: '16px',
  paddingRight: '16px',
  display: 'flex',
  gap: '4px',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '24px',
  color: 'var(--color-basic-black)',
});

export const DotWrapper = styled('div')({
  width: 'fit-content',
  height: '24px',
  display: 'flex',
  alignItems: 'flex-end',
});

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

export const Dot = styled('div')`
  background-color: var(--color-basic-black);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props['data-delay']};
`;