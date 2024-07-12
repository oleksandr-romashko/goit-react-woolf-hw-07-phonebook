import styled from 'styled-components';

/**
 * Styled from to contain new contact information.
 */
export const Form = styled('form')(props => {
  return {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '677px',
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 18px 14px 18px',
    alignItems: 'flex-start',
    rowGap: '18px',
    border: '2px solid #212121',

    '@media screen and (min-width: 420px)': {},
    '@media screen and (min-width: 576px)': {
      padding: '24px 18px',
      rowGap: '20px',
    },
    '@media screen and (min-width: 768px)': {
      rowGap: '24px',
    },

    '& button': {
      minWidth: '120px',
      width: '120px',
      height: '28px',
      fontSize: '14px',
      lineHeight: '14px',

      '@media screen and (min-width: 420px)': {
        minWidth: '128px',
        width: '128px',
        height: '30px',
        fontSize: '16px',
        lineHeight: '16px',
      },
      '@media screen and (min-width: 576px)': {
        minWidth: '144px',
        height: '32px',
        fontSize: '17px',
        lineHeight: '17px',
      },
      '@media screen and (min-width: 768px)': {
        minWidth: '156px',
        height: '34px',
        fontSize: '18px',
        lineHeight: '18px',
      },
    },
  };
});

/**
 * Label for input element.
 */
export const Label = styled('label')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '6px',
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '18px',

  '@media screen and (min-width: 576px)': {
    rowGap: '8px',
    fontSize: '20px',
    lineHeight: '20px',
  },
  '@media screen and (min-width: 768px)': {
    fontSize: '22px',
    lineHeight: '22px',
  },

  '& input': {
    fontSize: '14px',
    lineHeight: '14px',

    '@media screen and (min-width: 420px)': {
      fontSize: '16px',
      lineHeight: '16px',
    },
    '@media screen and (min-width: 576px)': {
      fontSize: '17px',
      lineHeight: '17px',
    },
    '@media screen and (min-width: 768px)': {
      fontSize: '18px',
      lineHeight: '18px',
    },
  },
});

/**
 * Label for input element.
 */
export const AddButtonWrapper = styled('div')({
  width: '100%',
  minHeight: '68px',
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 0,

  '@media screen and (min-width: 576px)': {
    minHeight: 'unset',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

/**
 * Informational text about contact add operation results.
 */
export const InfoText = styled('span')({
  marginTop: '12px',
  maxHeight: '0',
  opacity: '0',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '14px',
  transition: 'opacity 480ms ease-in-out, max-height 480ms ease-in-out',

  '&[data-info-show="true"]': {
    maxHeight: '300px',
    opacity: '1',
  },

  '@media screen and (min-width: 420px)': {
    fontSize: '16px',
    lineHeight: '16px',
  },
  '@media screen and (min-width: 576px)': {
    marginLeft: '18px',
    marginTop: 'unset',
  },

  '& .info-text': {
    display: 'none',
    maxHeight: '0',
    transition: 'opacity 280ms ease-in-out',
  },
  '& .success-text': {
    color: 'green',
  },
  '& .failure-text': {
    color: 'red',
  },
  ['&.success[data-info-show="true"] .success-text, ' +
  '&.failure[data-info-show="true"] .failure-text']: {
    display: 'block',
    maxHeight: '300px',
  },
});
