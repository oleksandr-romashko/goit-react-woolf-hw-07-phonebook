import styled from 'styled-components';

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
  backgroundColor: 'rgba(0, 0, 0, .7)',
  backdropFilter: 'blur(10px)',
});

/**
 * Modal window with content.
 */
export const ModalContent = styled('div')({
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

  '#modal-disclaimer-portal &': {
    overflowY: 'scroll',
  },
});
