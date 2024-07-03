import styled from 'styled-components';

/**
 * Styled list to display contacts.
 */
export const List = styled('ul')({
  width: 'fit-content',
  marginLeft: '52px',
  listStyleType: 'disc',
});

/**
 * Styled list item to display specific contact.
 */
export const Item = styled('li')({
  width: '100%',
  alignItems: 'baseline',
  '&:not(:first-child) ': {
    marginTop: '32px',
  },
  '& > div': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '16px',
    '@media screen and (min-width: 576px)': {
      columnGap: '24px',
    },
  },
  '& > div > p': {
    display: 'flex',
    rowGap: '8px',
    flexWrap: 'wrap',
    fontSize: '22px',
    '@media screen and (min-width: 420px)': {
      fontSize: '28px',
    },
    '@media screen and (min-width: 576px)': {
      fontSize: '32px',
    },
    '& > a': {
      color: 'var(--color-accent-blue-dark)',
      outlineOffset: '4px',
      border: '1px solid transparent',
      whiteSpace: 'nowrap',
      '&:hover, &:focus': {
        textDecoration: 'underline',
      }
    }
  },
});
