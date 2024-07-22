import styled from 'styled-components';

export const LoaderWrapper = styled('div')({
  width: '100%',
  marginTop: '16px',
  paddingLeft: '16px',
  paddingRight: '16px',
  display: 'flex',
  columnGap: '4px',
  rowGap: '8px',
  flexWrap: 'wrap',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '27px',
  color: 'var(--color-basic-black)',

  '@media screen and (min-width: 420px)': {
    rowGap: '14px',
  },

  '@media screen and (min-width: 576px)': {
    fontSize: '20px',
    lineHeight: '28px',
  },
  '@media screen and (min-width: 768px)': {
    rowGap: '16px',
    fontSize: '22px',
    lineHeight: '30px',
  },
});
