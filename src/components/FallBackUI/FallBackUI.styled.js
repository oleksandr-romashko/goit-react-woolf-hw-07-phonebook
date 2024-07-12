import styled from 'styled-components';

export const FallbackWrapper = styled('div')({
  display: 'flex',
  padding: '40px 16px',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',

  fontSize: '16px',
  lineHeight: '20px',

  '@media screen and (min-width: 420px)': {
    fontSize: '18px',
    lineHeight: '22px',
  },
  '@media screen and (min-width: 576px)': {
    fontSize: '20px',
    lineHeight: '24px',
  },
  '@media screen and (min-width: 768px)': {
    fontSize: '22px',
    lineHeight: '24px',
  },

  '& .notepad-icon': {
    width: '140px',
    height: '140px',
    '@media screen and (min-width: 420px)': {
      width: '160px',
      height: '160px',
    },
    '@media screen and (min-width: 576px)': {
      width: '180px',
      height: '180px',
    },
    '@media screen and (min-width: 768px)': {
      width: '200px',
      height: '200px',
    },
  },

  '& h1': {
    marginTop: '20px',
    fontSize: '18px',
    lineHeight: '24px',
    '@media screen and (min-width: 420px)': {
      marginTop: '24px',
      fontSize: '22px',
      lineHeight: '28px',
    },
    '@media screen and (min-width: 576px)': {
      marginTop: '28px',
      fontSize: '24px',
      lineHeight: '28px',
    },
    '@media screen and (min-width: 768px)': {
      marginTop: '30px',
      fontSize: '28px',
      lineHeight: '28px',
    },

    '& .no-wrap': {
      whiteSpace: 'nowrap',
    },
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
  marginTop: '24px',

  '& p:not(:first-child)': {
    marginTop: '2px',
    '@media screen and (min-width: 420px)': {
      marginTop: '8px',
    },
    '@media screen and (min-width: 576px)': {
      marginTop: '12px',
    },
    '@media screen and (min-width: 768px)': {},
  },

  '& p:last-child': {
    marginTop: '24px',
    fontSize: '14px',
    lineHeight: '16px',

    '@media screen and (min-width: 420px)': {
      fontSize: '16px',
      lineHeight: '16px',
    },
    '@media screen and (min-width: 576px)': {
      marginTop: '32px',
      fontSize: '18px',
      lineHeight: '18px',
    },
    '@media screen and (min-width: 768px)': {
      marginTop: '36px',
      fontSize: '20px',
      lineHeight: '20px',
    },
  },
});

export const Cause = styled('details')({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '640px',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer',

  marginTop: '24px',
  fontSize: '14px',
  lineHeight: '16px',

  '@media screen and (min-width: 420px)': {
    marginTop: '28px',
    fontSize: '16px',
    lineHeight: '16px',
  },
  '@media screen and (min-width: 576px)': {
    marginTop: '32px',
    fontSize: '18px',
    lineHeight: '18px',
  },
  '@media screen and (min-width: 768px)': {
    marginTop: '36px',
    fontSize: '20px',
    lineHeight: '20px',
  },

  '& > code': {
    display: 'block',
    borderRadius: '5px',
    color: 'var(--color-pure-white)',
    backgroundColor: 'var(--color-code-snippet-background)',
    boxShadow: '1px 1px 2px #bbbbbb',

    margin: '4px 16px',
    padding: '16px 14px',
    fontSize: '10px',
    lineHeight: '12px',

    '@media screen and (min-width: 420px)': {
      margin: '6px 18px',
      padding: '18px 14px',
      fontSize: '12px',
      lineHeight: '12px',
    },
    '@media screen and (min-width: 576px)': {
      margin: '8px 18px',
    },
    '@media screen and (min-width: 768px)': {
      margin: '8px 20px',
    },
  },
});
