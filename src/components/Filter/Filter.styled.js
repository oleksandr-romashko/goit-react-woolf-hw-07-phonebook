import styled from 'styled-components';
import Input from 'components/Input/Input.styled';

export const FilterWrapper = styled('div')({
  width: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '16px',
});

export const InputWrapper = styled('div')({
  position: 'relative',
  width: 'fit-content',
});

export const FilterInput = styled(Input)({
  paddingRight: '32px',
  height: '30px',
  fontSize: '14px',
  lineHeight: '14px',
  backgroundColor: 'var(--color-pure-white)',
  '&::placeholder': {
    color: 'transparent',
  },

  '@media screen and (min-width: 420px)': {
    height: '32px',
    fontSize: '16px',
    lineHeight: '16px',
  },
  '@media screen and (min-width: 576px)': {
    height: '34px',
    fontSize: '17px',
    lineHeight: '17px',
  },
  '@media screen and (min-width: 768px)': {
    height: '35px',
    fontSize: '18px',
    lineHeight: '18px',
  },
});

export const ClearButton = styled('button')({
  boxSizing: 'border-box',
  position: 'absolute',
  top: '50%',
  right: '0px',
  transform: 'translateY(-50%)',
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

  '& .clear-btn-icon': {
    width: '14px',
    height: '14px',
    stroke: 'var(--color-basic-grey-darker)',
    transition: 'color 200ms ease-in-out, transform 120ms ease-in-out',
  },

  '&:hover > .clear-btn-icon, &:focus > .clear-btn-icon': {
    stroke: 'var(--color-basic-black)',
    transform: 'scale(1.1)',
  },
});
