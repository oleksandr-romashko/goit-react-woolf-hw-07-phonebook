import styled from 'styled-components';

export const ProfileButton = styled('button')({
  padding: 0,
  lineHeight: 0,
  border: 'none',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  color: 'currentcolor',
  outlineColor: 'var(--color-accent-blue-light)',
  transition: 'backgroundColor 200ms ease-in-out, transform 120ms ease-in-out',

  '&:hover, &:focus': {
    transform: 'scale(1.2)',
  },

  '&:focus': {
    outline: '1px solid var(--color-accent-blue-light)',
    border: '1px solid var(--color-accent-blue-light)',
    boxShadow:
      '0px 0px 3px 6px rgba(148, 192, 249, .9), inset 0px 0px 0px 2px rgba(148, 192, 249, 0.8)',
  },

  '&:hover .user-profile-icon .background': {
    fill: 'var(--color-accent-blue-light)',
    stroke: 'var(--color-accent-blue-light)',
  },

  '&:active .user-profile-icon .background': {
    fill: 'var(--color-accent-blue-dark)',
    stroke: 'var(--color-accent-blue-dark)',
  },

  '& .user-profile-icon': {
    fill: 'currentcolor',
    width: '40px',
    height: '40px',

    '& .background': {
      fill: 'none',
      stroke: 'currentcolor',
    },

    '& .inner-silhouette': {
      fill: 'currentcolor',
    },
  },
});
