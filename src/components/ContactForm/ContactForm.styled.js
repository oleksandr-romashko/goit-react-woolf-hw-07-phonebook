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
    padding: '28px 18px 16px 18px',
    alignItems: 'flex-start',
    rowGap: '40px',
    border: '2px solid #212121',

    '& button': {
      width: 'fit-content',
      height: 'fit-content',
      minWidth: '165px',
      minHeight: '38px',
    }
  };
});

/**
 * Label for input element.
 */
export const Label = styled('label')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '14px',
  fontSize: '32px',
  fontWeight: 500,
  lineHeight: '32px',
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
    alignItems: 'baseline',
  },
});

/**
 * Informational text about contact add operation results.
 */
export const InfoText = styled('span')({
  marginTop: '12px',
  maxHeight: '0',
  opacity: '0',
  fontSize: '18px',
  fontWeight: '400',
  lineHeight: '18px',
  transition: 'opacity 480ms ease-in-out, max-height 480ms ease-in-out',

  '&[data-info-show="true"]': {
    maxHeight: '300px',
    opacity: '1',
  },

  '@media screen and (min-width: 576px)': {
    marginLeft: '16px',
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
  ['&.success[data-info-show="true"] .success-text, ' 
    + '&.failure[data-info-show="true"] .failure-text']: {
      display: 'block',
      maxHeight: '300px',
  },
});
