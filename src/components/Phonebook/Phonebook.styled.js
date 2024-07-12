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
  rowGap: '16px',

  fontSize: '18px',
  lineHeight: '24px',
  color: 'var(--color-basic-black)',
  fontStyle: 'normal',

  '@media screen and (min-width: 420px)': {
    rowGap: '18px',
  },

  '@media screen and (min-width: 576px)': {
    rowGap: '22px',
    fontSize: '20px',
    lineHeight: '24px',
  },
  '@media screen and (min-width: 768px)': {
    rowGap: '24px',
    fontSize: '22px',
    lineHeight: '24px',
  },
});

/**
 * Main title text.
 */
export const Title = styled('h1')({
  marginTop: '12px',
  fontSize: '24px',
  lineHeight: '24px',
  fontWeight: 700,

  '@media screen and (min-width: 576px)': {
    fontSize: '28px',
    lineHeight: '28px',
  },
  '@media screen and (min-width: 768px)': {
    fontSize: '32px',
    lineHeight: '32px',
  },
});

/**
 * Secondary text for main parts separation.
 */
export const Subtitle = styled('h2')({
  marginTop: '10px',
  fontSize: '22px',
  lineHeight: '22px',
  fontWeight: 600,

  '@media screen and (min-width: 576px)': {
    fontSize: '24px',
    lineHeight: '24px',
  },
  '@media screen and (min-width: 768px)': {
    fontSize: '28px',
    lineHeight: '28px',
  },
});
