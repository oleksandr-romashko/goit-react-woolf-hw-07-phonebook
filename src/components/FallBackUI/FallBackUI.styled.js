import styled from 'styled-components';

export const FallbackWrapper = styled('div')({
  display: 'flex',
  padding: '40px 16px',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',

  '& > h1': {
    marginTop: '32px',
    fontSize: '28px',
  },

  '& p': {
    fontSize: '20px',
  },

  '& p:last-child': {
    fontSize: '16px',
  },

  '& a': {
    color: 'var(--color-accent-blue-dark)',
  },

  '& a:visited': {
    color: 'var(--color-accent-blue-dark)',
  },

  '& a:hover, a:focus': {
    outlineOffset: '4px',
    textDecoration: 'underline',
  },
});

export const Tips = styled('div')({
  marginTop: '40px',
  '& p:not(:first-child)': {
    marginTop: '16px',
  },
});

export const Cause = styled('details')({
  maxWidth: '100%',
  width: '800px',
  marginTop: '48px',
  fontSize: '20px',
  textAlign: 'left',
  cursor: 'pointer',

  '& > code': {
    maxWidth: '100%',
    display: 'inline-block',
    margin: '12px 24px',
    padding: '24px',
    borderRadius: '5px',
    fontSize: '14px',
    color: 'var(--color-pure-white)',
    background: '#30353b',
    boxShadow: '1px 1px 2px #bbbbbb',
  },
});
