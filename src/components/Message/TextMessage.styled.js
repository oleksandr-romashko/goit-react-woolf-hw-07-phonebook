import styled from 'styled-components';

export const TextMessageWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '677px',

  '& p': {
    marginTop: '12px',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '24px',

    '@media screen and (min-width: 420px)': {
      rowGap: '18px',
    },
    '@media screen and (min-width: 576px)': {
      rowGap: '22px',
      fontSize: '20px',
      lineHeight: '24px',
    },
    '@media screen and (min-width: 768px)': {
      rowGap: '24px',
      fontSize: '22px',
      lineHeight: '28px',
    },

    '&.secondary': {
      marginTop: '40px',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
      '&:last-child': {
        marginTop: '8px',
      },

      '@media screen and (min-width: 420px)': {},
      '@media screen and (min-width: 576px)': {
        fontSize: '18px',
        lineHeight: '24px',
      },
      '@media screen and (min-width: 768px)': {
        fontSize: '20px',
        lineHeight: '24px',
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
  },
});
