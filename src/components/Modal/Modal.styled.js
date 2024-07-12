import styled from 'styled-components';
import Button from 'components/Button/BasicButton.styled';
import Icon from 'components/Icon/Icon';

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
  top: 'calc(50% + 16px)',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  paddingTop: '32px',
  paddingBottom: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  maxHeight: 'min(90vh, 900px); ',

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

  '&.closable': {
    paddingTop: '56px',
  },

  '#modal-portal &': {
    overflowY: 'scroll',
  },

  '& .close-modal-btn': {
    position: 'absolute',
    top: '14px',
    right: '16px',
    padding: 0,
    width: '30px',
    minWidth: 'unset',
    height: '30px',
    borderRadius: '50%',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    transition: 'transform 120ms ease-in-out',

    '&:hover, &:focus': {
      transform: 'scale(1.2)',
    },

    '& .close-icon': {
      width: '24px',
      height: '24px',
      stroke: 'currentcolor',
    },
  },

  '& + .confirm-dialog-box-modal .confirm-container': {
    rowGap: '4px',
  },
});

/**
 * Styled modal close button component.
 * @param {string} props.className Button class for extra styling.
 * @param {callback} props.onClick Function for onClick action.
 * @returns {JSX.Element} Rendered button component.
 */
export const CloseModalBtn = ({ className, onClick }) => {
  return (
    <Button className={`close-modal-btn ${className ?? ''}`} onClick={onClick}>
      <Icon name="cross" className="close-icon" />
    </Button>
  );
};

/**
 * Content wrapper styled component.
 */
export const ModalContentWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '12px',
  marginLeft: '12px',
  marginRight: '12px',
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
});

/**
 * Modal title styled component.
 */
export const ModalTitle = styled('h2')({
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
