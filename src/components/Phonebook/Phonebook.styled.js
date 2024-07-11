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
  rowGap: '28px',

  color: 'var(--color-basic-black)',
  fontStyle: 'normal',

  '@media screen and (min-width: 576px)': {
    rowGap: '48px',
  },
});

/**
 * Main title text.
 */
export const Title = styled('h1')({
  fontSize: '40px',
  lineHeight: '40px',
  fontWeight: 700,

  '@media screen and (min-width: 576px)': {
    fontSize: '48px',
    lineHeight: '48px',
  },
});

/**
 * Secondary text for main parts separation.
 */
export const Subtitle = styled('h1')({
  fontSize: '32px',
  lineHeight: '32px',
  fontWeight: 600,

  '@media screen and (min-width: 576px)': {
    fontSize: '40px',
    lineHeight: '40px',
  },
});
