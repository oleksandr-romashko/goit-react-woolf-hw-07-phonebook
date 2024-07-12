import styled from 'styled-components';

export const ButtonsWrapper = styled('div')({
  '.confirm-dialogue-box-modal:has(&)': {
    '@media screen and (min-width: 420px)': {
      maxWidth: '340px',
    },
    '@media screen and (min-width: 576px)': {
      maxWidth: '440px',
    },
    '@media screen and (min-width: 1200px)': {
      maxWidth: '460px',
    },
  },

  marginTop: '8px',
  display: 'flex',
  justifyContent: 'center',
  columnGap: '18px',

  '& button': {
    minWidth: '80px',
    fontSize: 'inherit',

    '@media screen and (min-width: 576px)': {
      minWidth: '125px',
      width: 'fit-content',
      fontSize: 'inherit',
    },
  },
});
