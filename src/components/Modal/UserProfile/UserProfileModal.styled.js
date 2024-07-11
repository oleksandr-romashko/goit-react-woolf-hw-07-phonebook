import { styled } from 'styled-components';
import Icon from 'components/Icon/Icon';

export const CloseBtn = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Icon name="close" className="close-icon" />
    </Button>
  );
};

const Button = styled('button')({
  boxSizing: 'content-box',
  position: 'absolute',
  top: '12px',
  right: '12px',
  padding: '6px',
  width: '22px',
  height: '22px',
  borderRadius: '50%',
  borderColor: 'transparent',
  backgroundColor: 'transparent',
  transition: 'transform 120ms ease-in-out',

  '&:hover, &:focus': {
    transform: 'scale(1.2)',
  },

  '& .close-icon': {
    width: '100%',
    height: '100%',
    stroke: 'currentcolor',
  },
});
