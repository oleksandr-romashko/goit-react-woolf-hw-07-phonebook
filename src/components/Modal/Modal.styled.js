import styled from 'styled-components';
import Button from 'components/Button/BasicButton.styled';
import Icon from 'components/Icon/Icon';

/**
 * Modal window backdrop.
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
 * Modal window with content.
 */
export const Modal = styled('div')({
  position: 'fixed',
  zIndex: 1000,
  top: 'calc(50% + 16px)',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '320px',
  width: '100%',
  minHeight: '200px',
  height: 'fit-content',
  maxHeight: 'min(90vh, 900px); ',

  borderRadius: '3px',
  backgroundColor: 'var(--color-basic-white)',
  '@media screen and (min-width: 576px)': {
    width: '90vw',
    maxWidth: '540px',
  },
  '@media screen and (min-width: 1200px)': {
    width: '90vw',
    maxWidth: '600px',
  },

  '#modal-portal &': {
    overflowY: 'scroll',
  },
});

export const ModalContainer = styled('div')({
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

export const CloseBtn = ({ className, onClick }) => {
  return (
    <Button className={className} onClick={onClick}>
      <Icon name="close" className="close-icon" />
    </Button>
  );
};
