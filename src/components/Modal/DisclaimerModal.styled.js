import styled from 'styled-components';

export const ImportantNotes = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '12px',
  padding: '24px 40px',
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: '300',
  '@media screen and (min-width: 576px)': {
    rowGap: '16px',
    fontSize: '18px',
    lineHeight: '24px',
  },
  '@media screen and (min-width: 1200px)': {
    rowGap: '18px',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '400',
  },
});

export const Title = styled('h2')({
  marginTop: '8px',
  marginBottom: '6px',
  textAlign: 'center',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '18px',
  '@media screen and (min-width: 576px)': {
    marginTop: '16px',
    marginBottom: '10px',
    fontSize: '22px',
    lineHeight: '22px',
  },
  '@media screen and (min-width: 1200px)': {
    marginTop: '18px',
    fontSize: '24px',
    lineHeight: '24px',
  },
});

export const Info = styled('article')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '6px',
  paddingLeft: '20px',
  '@media screen and (min-width: 576px)': {
    rowGap: '10px',
    paddingLeft: '28px',
  },
  '@media screen and (min-width: 1200px)': {
    paddingLeft: '30px',
  },

  '& h3': {
    position: 'relative',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '600',
    '@media screen and (min-width: 576px)': {
      fontSize: '18px',
      lineHeight: '20px',
    },
    '@media screen and (min-width: 1200px)': {
      fontSize: '20px',
      lineHeight: '24px',
    },

    '& .disclaimer-icon': {
      position: 'absolute',
      top: '1px',
      left: '-20px',
      width: '14px',
      height: '14px',
      fill: 'none',

      '@media screen and (min-width: 576px)': {
        left: '-25px',
        width: '18px',
        height: '18px',
      },
      '@media screen and (min-width: 1200px)': {
        left: '-28px',
        width: '20px',
        height: '20px',
      },
    },
  },

  '& a': {
    color: 'var(--color-accent-blue-dark)',
    outlineOffset: '4px',
    border: '1px solid transparent',
    whiteSpace: 'nowrap',
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
  },
});

export const ShowImportantInfoForm = styled('form')({
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '18px',
  '@media screen and (min-width: 576px)': {
    marginTop: '0px',
  },

  '& label': {
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center',
    columnGap: '8px',
    userSelect: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
    '@media screen and (min-width: 576px)': {
      rowGap: '10px',
      paddingLeft: '28px',
    },
    '@media screen and (min-width: 1200px)': {
      paddingLeft: '30px',
    },
  },

  '& label input[type=checkbox]': {
    width: '16px',
    height: '16px',
    '@media screen and (min-width: 576px)': {
      width: '18px',
      height: '18px',
    },

    '&:hover': {
      cursor: 'pointer',
    },
    '&:focus': {
      outline: '1px solid var(--color-accent-blue-light)',
      border: '1px solid var(--color-accent-blue-light)',
      boxShadow:
        '0px 0px 3px 6px rgba(148, 192, 249, .9), inset 0px 0px 0px 2px rgba(148, 192, 249, 0.8)',
      borderRadius: '1px',
    },
  },

  '& label input[type=checkbox]:checked': {
    background: '#0f0',
  },

  '& button': {
    width: '100%',
    fontSize: 'inherit',
    color: 'var(--color-basic-white)',
    backgroundColor: 'var(--color-accent-blue-dark)',
    '&:hover': {
      color: 'var(--color-basic-black)',
    },
    '&:active': {
      color: 'var(--color-basic-white)',
      backgroundColor: 'var(--color-accent-blue-dark)',
    },
    '@media screen and (min-width: 576px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 'fit-content',
      fontSize: 'inherit',
    },
    '@media screen and (min-width: 1200px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 'fit-content',
      fontSize: 'inherit',
    },
  },
});
