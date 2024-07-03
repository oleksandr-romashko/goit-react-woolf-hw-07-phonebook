import styled from 'styled-components';

const Button = styled('button')({
  display: 'inline-flex',
  padding: '6px 16px',
  justifyContent: 'center',
  alignItems: 'center',

  fontFamily: 'inherit',
  fontSize: '22px',
  fontWeight: 500,
  lineHeight: '22px',
  color: 'inherit',

  /* prevent text selection */
  '-webkit-user-select': 'none' /* Safari */,
  '-ms-user-select': 'none' /* IE 10 and IE 11 */,
  'user-select': 'none' /* Standard syntax */,

  borderRadius: '6px',
  border: '1px solid var(--color-basic-grey)',
  backgroundColor: 'var(--color-pure-white)',
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',

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
  },
});

export default Button;
