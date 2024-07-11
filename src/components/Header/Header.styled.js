import styled from 'styled-components';

/**
 * Simple styled header to display a page title.
 */
const Header = styled('header')({
  position: 'relative',
  maxWidth: '100%',
  paddingTop: '16px',
  paddingBottom: '12px',
  paddingLeft: '108px',
  paddingRight: '108px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  fontSize: '48px',
  lineHeight: '52px',
  fontWeight: '600',
  color: 'var(--color-basic-white)',
  textAlign: 'center',
  backgroundColor: 'var(--color-basic-black)',

  '@media screen and (min-width: 576px)': {
    fontSize: '52px',
    lineHeight: '64px',
  },
});

export default Header;
