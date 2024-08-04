import styled from 'styled-components';

export const WarningWrapper = styled('div')({
  paddingLeft: '1.25em',
  paddingRight: '1.25em',
  opacity: '0',
  overflow: 'hidden',
  lineHeight: 1.25,
  color: 'var(--color-accent-red-dark)',
  borderLeft: '8px solid var(--color-accent-red-dark)',
  backgroundColor: 'var(--color-accent-red-light)',
  transition:
    'max-height 480ms ease-in-out, padding 280ms ease-in-out, opacity 280ms ease-in-out',

  '&:not(.show-warning)': {
    maxHeight: 0,
  },

  '&.show-warning': {
    maxHeight: '700px',
    opacity: '1',
    paddingTop: '1em',
    paddingBottom: '1em',
  },

  '& p:not(:first-child)': {
    marginTop: '8px',
  },

  '& em': {
    fontWeight: 600,
  },
});

export const Title = styled('p')({
  marginBottom: '6px',
  fontWeight: 700,
  color: 'var(--color-accent-red-darkest)',
  textAlign: 'left',

  '& .warning-title-icon': {
    width: '1.1em',
    height: '1.1em',
    marginRight: '0.3em',
    fill: 'var(--color-accent-red-darkest)',
    stroke: 'var(--color-accent-red-light)',
  },

  '& ~ *': {
    marginTop: '4px',
    fontSize: '0.9em',
    textAlign: 'left',
  },
});
