import styled from 'styled-components';

/**
 * Styled wrapper to align elements
 */
export const Wrapper = styled('main')({
  marginTop: '24px',
  paddingLeft: '8px',
  paddingRight: '8px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '48px',

  color: 'var(--color-basic-black)',
  fontStyle: 'normal',
});

/**
 * Main title text.
 */
export const Title = styled('h1')({
  fontSize: '56px',
  fontWeight: 700,
  lineHeight: '56px',
});

/**
 * Secondary text for main parts separation.
 */
export const Subtitle = styled('h1')({
  fontSize: '42px',
  fontWeight: 600,
  lineHeight: '44px',
});
