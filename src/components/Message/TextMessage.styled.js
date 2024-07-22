import styled from 'styled-components';

/**
 * Styled informational message.
 */
export const TextMessage = styled('p')({
  marginTop: '16px',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '24px',

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
    lineHeight: '28px',
  },
});
