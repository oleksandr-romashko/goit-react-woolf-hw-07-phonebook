import styled from 'styled-components';

export const WarningWrapper = styled('div')({
  padding: '1em 1.25em',
  borderLeft: '8px solid var(--color-accent-red-dark)',
  lineHeight: 1.25,
  color: 'var(--color-accent-red-dark)',
  backgroundColor: 'var(--color-accent-red-light)',
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
