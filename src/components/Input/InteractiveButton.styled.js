import { styled } from 'styled-components';

export const StyledButton = styled('button')({
  position: 'relative',
  boxSizing: 'border-box',
  width: '30px',
  height: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: 0,
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'transparent',

  '@media screen and (min-width: 420px)': {
    width: '32px',
    height: '32px',
  },
  '@media screen and (min-width: 576px)': {
    width: '34px',
    height: '34px',
  },
  '@media screen and (min-width: 768px)': {
    width: '35px',
    height: '35px',
  },

  '&:focus': {
    outline: '1px solid rgba(124, 168, 225, 0.8)',
    border: '1px solid rgba(124, 168, 225, 0.8)',
    boxShadow:
      '0px 0px 3px 6px rgba(148, 192, 249, .9), inset 0px 0px 0px 2px rgba(148, 192, 249, 0.8)',
    borderRadius: '1px',
  },
  '&:active': {
    outline: 'unset',
    border: 'unset',
    boxShadow: 'unset',
    borderRadius: 'unset',
  },

  ':placeholder-shown + &': {
    display: 'none',
    color: 'transparent',
  },

  '& svg': {},

  '& > .interactive-btn-icon': {
    transition: 'transform 120ms ease-in-out, opacity 250ms ease-out',
  },
  '&.action > .interactive-btn-icon': {
    width: '16px',
    height: '16px',
  },
  '&.copy-paste > .interactive-btn-icon': {
    width: '20px',
    height: '20px',
  },

  '&:hover > .copy-paste-icon, &:focus > .copy-paste-icon': {
    transform: 'scale(1.2)',
  },

  '& > .feedback-confirmation-icon': {
    opacity: 0,
    position: 'absolute',
    top: '8px',
    left: '8px',
    stroke: 'green',
    strokeWidth: '2px',
  },

  '&.confirmed > .copy-paste-icon': {
    opacity: 0.4,
  },

  '&.confirmed > .feedback-confirmation-icon': {
    opacity: 1,
  },
});
