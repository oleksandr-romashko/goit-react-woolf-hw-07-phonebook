import styled from 'styled-components';

export const WarningWrapper = styled('div')({
  marginTop: '16px',
  marginBottom: '12px',
});

export const DialogueBoxButtonsWrapper = styled('div')({
  '.confirm-dialogue-box-modal:has(&)': {
    width: '100%',

    '@media screen and (min-width: 420px)': {
      width: 'fit-content',
      minWidth: '296px',
    },
    '@media screen and (min-width: 576px)': {
      minWidth: '384px',
    },
  },

  '.confirm-dialogue-box-modal:has(&) p': {
    '&.modal-message, &.modal-details': {
      textAlign: 'center',
    },
    '&:not(:first-child)': {
      marginTop: '4px',
    },
  },

  display: 'flex',
  justifyContent: 'center',
  columnGap: '10px',
  rowGap: '8px',
  flexWrap: 'wrap',

  '@media screen and (min-width: 420px)': {
    columnGap: '12px',
    flexWrap: 'nowrap',
  },
  '@media screen and (min-width: 576px)': {
    columnGap: '16px',
  },
  '@media screen and (min-width: 1200px)': {
    columnGap: '18px',
  },

  '& button': {
    minWidth: '96px',
    display: 'flex',
    alignItems: 'center',
    fontSize: 'inherit',
    lineHeight: 'inherit',

    '@media screen and (min-width: 576px)': {
      minWidth: '125px',
      width: 'fit-content',
      fontSize: 'inherit',
    },
  },
});
