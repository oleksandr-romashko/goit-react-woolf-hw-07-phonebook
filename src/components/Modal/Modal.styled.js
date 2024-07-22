import styled from 'styled-components';

/**
 * Styled modal window backdrop component.
 */
export const Backdrop = styled('div')({
  position: 'fixed',
  zIndex: 1000,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  width: '100vw',
  height: '100vh',

  backgroundColor: 'rgba(0, 0, 0, .7)',
  backdropFilter: 'blur(10px)',
});

/**
 * Modal window container styled component.
 */
export const ModalContainer = styled('div')({
  position: 'fixed',
  zIndex: 1000,
  top: 'calc(50% + 8px)',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'auto',
  paddingBottom: '24px',

  width: '100vw',
  '&.confirm-dialogue-box-modal': {
    width: 'fit-content',
  },
  maxWidth: '100vw',
  height: 'fit-content',
  maxHeight: 'min(calc(90vh - 32px), 900px)',

  borderRadius: '3px',
  backgroundColor: 'var(--color-basic-white)',

  '@media screen and (min-width: 420px)': {
    maxWidth: '388px',
  },
  '@media screen and (min-width: 576px)': {
    maxWidth: '540px',
  },
  '@media screen and (min-width: 1200px)': {
    maxWidth: '560px',
  },

  '& .close-modal-btn': {
    position: 'absolute',
    top: '12px',
    right: '12px',
    padding: 0,
    minWidth: 'unset',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    transition: 'transform 120ms ease-in-out',

    '@media screen and (min-width: 420px)': {
      right: '14px',
      width: '24px',
      height: '24px',
    },
    '@media screen and (min-width: 576px)': {
      top: '14px',
      right: '16px',
      width: '26px',
      height: '26px',
    },

    '&:hover, &:focus': {
      transform: 'scale(1.2)',
    },

    '&:active': {
      border: 'unset',
      background: 'unset',
      outline: 'unset',
    },

    '& .close-icon': {
      width: '100%',
      height: '100%',
      stroke: 'currentcolor',
    },
  },

  '& + .confirm-dialog-box-modal .confirm-container': {
    rowGap: '4px',
  },
});

/**
 * Content wrapper styled component.
 */
export const ModalContentWrapper = styled('div')({
  marginTop: '24px',
  '.closable > &': {
    marginTop: '32px',

    '@media screen and (min-width: 420px)': {
      marginTop: '36px',
    },
    '@media screen and (min-width: 576px)': {
      marginTop: '40px',
    },
  },
  marginLeft: '12px',
  marginRight: '12px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '12px',
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: '300',

  '@media screen and (min-width: 420px)': {
    marginLeft: '16px',
    marginRight: '16px',
  },
  '@media screen and (min-width: 576px)': {
    marginLeft: '24px',
    marginRight: '24px',
    rowGap: '16px',
    fontSize: '18px',
    lineHeight: '24px',
  },
  '@media screen and (min-width: 1200px)': {
    marginLeft: '32px',
    marginRight: '32px',
    rowGap: '18px',
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '400',
  },

  '.confirm-dialogue-box-modal.closable > &': {
    marginTop: '36px',
    marginLeft: '36px',
    marginRight: '36px',

    '@media screen and (min-width: 420px)': {
      marginTop: '38px',

      marginLeft: '38px',
      marginRight: '38px',
    },
    '@media screen and (min-width: 576px)': {
      marginTop: '40px',
      marginLeft: '52px',
      marginRight: '52px',
    },
    '@media screen and (min-width: 1200px)': {
      marginLeft: '58px',
      marginRight: '58px',
    },
  },
});

/**
 * Modal title styled component.
 */
export const ModalTitle = styled('h2')({
  marginTop: '6px',
  marginBottom: '4px',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '18px',
  '@media screen and (min-width: 576px)': {
    marginBottom: '8px',
    fontSize: '22px',
    lineHeight: '22px',
  },
  '@media screen and (min-width: 1200px)': {
    fontSize: '24px',
    lineHeight: '24px',
  },
});
