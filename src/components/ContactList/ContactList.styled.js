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
    marginLeft: '52px',
  },
});

/**
 * Styled list item to display specific contact.
 */
export const Item = styled('li')({
  width: '100%',
  '&:not(:last-child) ': {
    marginBottom: '4px',
  },
  '@media screen and (min-width: 576px)': {
    '&:not(:last-child) ': {
      marginBottom: '16px',
    },
  },

  '& > div': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    columnGap: '12px',
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
    fontSize: '18px',
    lineHeight: '20px',
    '@media screen and (min-width: 420px)': {
      fontSize: '22px',
      lineHeight: '22px',
    },
    '@media screen and (min-width: 576px)': {
      flexDirection: 'row',
      fontSize: '24px',
      lineHeight: '26px',
    },
    '@media screen and (min-width: 768px)': {
      fontSize: '28px',
      lineHeight: '32px',
    },

    '& > a': {
      color: 'var(--color-accent-blue-dark)',
      outlineOffset: '4px',
      border: '1px solid transparent',
      whiteSpace: 'nowrap',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      },
    },
  },

  '& button': {
    minWidth: '100px',
    minHeight: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Informational text about delete operation results.
 */
export const InfoText = styled('p')({
  width: '100%',
  maxHeight: '0',
  opacity: '0',
  marginTop: '8px',
  textAlign: 'right',
  fontSize: '18px',
  fontWeight: '400',
  lineHeight: '18px',
  color: 'red',
  transition: 'opacity 280ms ease-in-out, max-height 480ms ease-in-out',
  '&[data-info-show="true"]': {
    maxHeight: '300px',
    opacity: '1',
  },
});
