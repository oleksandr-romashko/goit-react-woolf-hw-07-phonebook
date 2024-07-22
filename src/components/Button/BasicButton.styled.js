import styled from 'styled-components';

export const BUTTON_STYLE = Object.freeze({
  ACCENT_BLUE: 'accent-blue',
  BLACK: 'black',
  DANGER: 'danger',
});

const Button = styled('button')({
  position: 'relative',
  display: 'flex',
  minWidth: '80px',
  width: '80px',
  height: '28px',
  justifyContent: 'center',
  alignItems: 'center',

  fontFamily: 'inherit',
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '14px',
  color: 'currentcolor',

  borderRadius: '6px',
  border: '1px solid var(--color-basic-grey)',
  backgroundColor: 'var(--color-pure-white)',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',

  /* prevent text selection */
  '-webkit-user-select': 'none' /* Safari */,
  '-ms-user-select': 'none' /* IE 10 and IE 11 */,
  'user-select': 'none' /* Standard syntax */,

  '@media screen and (min-width: 420px)': {
    minWidth: '84px',
    width: '84px',
    height: '30px',
    paddingLeft: '8px',
    paddingRight: '8px',
    fontSize: '15px',
    lineHeight: '15px',
  },
  '@media screen and (min-width: 576px)': {
    minWidth: '96px',
    height: '32px',
    fontSize: '17px',
    lineHeight: '17px',
  },
  '@media screen and (min-width: 768px)': {
    minWidth: '104px',
    height: '34px',
    fontSize: '18px',
    lineHeight: '18px',
  },

  '&:hover': {
    backgroundColor: 'var(--color-accent-blue-light)',
  },

  '&:focus': {
    outline: '1px solid var(--color-accent-blue-light)',
    border: '1px solid var(--color-accent-blue-light)',
    boxShadow:
      '0px 0px 3px 6px rgba(148, 192, 249, .9), inset 0px 0px 0px 2px rgba(148, 192, 249, 0.8)',
    borderRadius: '1px',
  },

  '&:active': {
    border: '1px solid var(--color-accent-blue-dark)',
    background: 'linear-gradient(180deg, #4a94fc 0%, #0a67e3 100%)',
    outline: 'unset',
  },

  '&.accent-blue': {
    color: 'var(--color-basic-white)',
    backgroundColor: 'var(--color-accent-blue-dark)',
  },
  '&.black': {
    color: 'var(--color-basic-white)',
    backgroundColor: 'var(--color-basic-black)',
  },
  '&.danger': {
    color: 'var(--color-basic-white)',
    backgroundColor: 'var(--color-accent-red-normal)',
    '&:focus': {
      outline: '1px solid var(--color-accent-red-dark)',
      border: '1px solid var(--color-accent-red-dark)',
      boxShadow:
        '0px 0px 3px 6px var(--color-accent-red-normal), inset 0px 0px 0px 2px var(--color-accent-red-normal)',
    },
    '&:active': {
      background: 'var(--color-accent-red-darkest)',
      outline: '1px solid var(--color-accent-red-dark)',
      border: '1px solid var(--color-accent-red-dark)',
      boxShadow:
        '0px 0px 3px 6px var(--color-accent-red-normal), inset 0px 0px 0px 2px var(--color-accent-red-normal)',
    },
  },

  '& > .spinner': {
    position: 'absolute',
  },
});

export default Button;
