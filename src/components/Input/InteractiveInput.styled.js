import styled from 'styled-components';
import Input from './Input.styled';

export const Label = styled('label')({});

export const InputWrapper = styled('div')({
  position: 'relative',
  width: 'min-content',
  '&.labeled': {
    marginTop: '4px',
  },
  '&.copyable': {
    paddingRight: '35px',
  },
});

/**
 * Additional styling for input element.
 */
export const StyledInput = styled(Input)({
  width: '348px',
  height: '30px',
  fontSize: '14px',
  lineHeight: '14px',
  borderColor: 'var(--color-basic-grey-darker)',
  backgroundColor: 'var(--color-pure-white)',
  '&.with-action:not([disabled])': {
    paddingRight: '32px',
  },
  '&[disabled]': {
    borderColor: 'var(--color-basic-grey)',
    backgroundColor: 'var(--color-basic-white)',
  },

  '@media screen and (min-width: 420px)': {
    height: '32px',
    fontSize: '16px',
    lineHeight: '16px',
  },
  '@media screen and (min-width: 576px)': {
    height: '34px',
    fontSize: '17px',
    lineHeight: '17px',
  },
  '@media screen and (min-width: 768px)': {
    height: '35px',
    fontSize: '18px',
    lineHeight: '18px',
  },

  '&::placeholder': {
    color: 'var(--color-basic-grey-darker)',
  },

  '&:not([disabled]):placeholder-shown + div > button.action': {
    display: 'none',
  },

  '&.with-action[disabled] + div > button.action': {
    display: 'none',
  },
});

/**
 * Wraps additional action and copy-to-clipboard buttons.
 */
export const ButtonsWrapper = styled('div')({
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'flex-end',
});
