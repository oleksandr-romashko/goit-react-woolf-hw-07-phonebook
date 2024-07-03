import styled from "styled-components";

const HeaderIcons = styled('div')({
  display: 'none',
  position: 'absolute',
  top: '50%',
  right: '16px',
  transform: 'translateY(-50%)',
  padding: '0',
  lineHeight: '0',

  '@media only screen and (min-width: 576px)': {
    display: 'block',
  }
});

export default HeaderIcons;