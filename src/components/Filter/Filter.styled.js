import styled from 'styled-components';
import Input from 'components/Input/Input.styled'

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
  paddingRight: '40px',
  backgroundColor: 'var(--color-pure-white)',
  '&::placeholder': {
    color: 'transparent',
  },
});

export const ClearButton = styled('button')({
  boxSizing: 'content-box',
  position: 'absolute',
  top: '50%',
  right: '6px',
  transform: 'translateY(-50%)',
  width: '12px',
  height: '12px',
  padding: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  lineHeight: 0,
  color: 'var(--color-basic-grey)',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  transition: 'color 200ms ease-in-out, transform 120ms ease-in-out',
  '&:hover, &:focus': {
    transform: 'translateY(-50%) scale(1.1)',
    color: 'var(--color-basic-black)',
  },
  ':placeholder-shown + &': {
    display: 'none',
    color: 'transparent',
  },
});
