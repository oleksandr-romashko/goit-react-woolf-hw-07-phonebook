import styled from 'styled-components';

/**
 * Styled list to display contacts.
 */
export const List = styled('ul')({
  display: 'list-item',
  boxSizing: 'border-box',
  maxWidth: '625px',
  marginLeft: '32px',
  marginRight: '12px',
  listStyleType: 'disc',

  '@media screen and (min-width: 576px)': {
    marginLeft: '40px',
  },
});

/**
 * Styled list item to display specific contact.
 */
export const Item = styled('li')({
  width: '100%',
  '&:not(:last-child) ': {
    marginBottom: '6px',
  },
  '@media screen and (min-width: 420px)': {
    '&:not(:last-child) ': {
      marginBottom: '8px',
    },
  },
  '@media screen and (min-width: 576px)': {
    '&:not(:last-child) ': {
      marginBottom: '10px',
    },
  },

  '& > div': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    '@media screen and (min-width: 576px)': {
      columnGap: '24px',
    },
  },
  '& > div > p': {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap: '4px',
    flexWrap: 'wrap',
    fontSize: '16px',
    lineHeight: '16px',

    '@media screen and (min-width: 420px)': {
      flexDirection: 'row',
      fontSize: '15px',
      lineHeight: '15px',
    },
    '@media screen and (min-width: 576px)': {
      fontSize: '18px',
      lineHeight: '18px',
    },
    '@media screen and (min-width: 768px)': {
      fontSize: '20px',
      lineHeight: '20px',
    },

    '& > a': {
      minWidth: '106px',
      color: 'var(--color-accent-blue-dark)',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      outlineOffset: '4px',
      border: '1px solid transparent',
      '@media screen and (min-width: 420px)': {
        minWidth: '138px',
      },
      '@media screen and (min-width: 576px)': {
        marginRight: '24px',
        minWidth: '150px',
      },
      '@media screen and (min-width: 768px)': {
        minWidth: '168px',
      },

      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    },
  },
});

/**
 * Informational text about delete operation results.
 */
export const InfoText = styled('p')({
  maxHeight: '0',
  opacity: '0',
  marginTop: '8px',
  textAlign: 'right',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '14px',
  color: 'red',
  transition: 'opacity 280ms ease-in-out, max-height 480ms ease-in-out',

  '@media screen and (min-width: 420px)': {
    fontSize: '16px',
    lineHeight: '16px',
  },
  '@media screen and (min-width: 576px)': {
    marginLeft: '18px',
  },

  '&[data-info-show="true"]': {
    maxHeight: '300px',
    opacity: '1',
  },
});
