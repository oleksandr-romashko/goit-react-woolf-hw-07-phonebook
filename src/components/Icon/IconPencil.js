import styled from 'styled-components';
import { ICON_DEFAULTS } from './Icon';

const IconPencil = ({ className, width, height, stroke, fill }) => {
  return (
    <SVG
      className={className}
      width={width || ICON_DEFAULTS.WIDTH}
      height={height || ICON_DEFAULTS.HEIGHT}
      viewBox="0 0 14 14"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.30905 11.4381L1.5 12.5047L2.56653 8.69561L9.54132 1.75468C9.62015 1.67406 9.7143 1.61 9.81823 1.56626C9.92216 1.52253 10.0338 1.5 10.1465 1.5C10.2593 1.5 10.3709 1.52253 10.4748 1.56626C10.5788 1.61 10.6729 1.67406 10.7517 1.75468L12.25 3.26137C12.3292 3.34011 12.3921 3.43375 12.435 3.53689C12.4779 3.64003 12.5 3.75064 12.5 3.86235C12.5 3.97406 12.4779 4.08467 12.435 4.18781C12.3921 4.29095 12.3292 4.38459 12.25 4.46333L5.30905 11.4381Z"
        stroke={stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SVG>
  );
};

const SVG = styled('svg')({
  fill: 'none',
  stroke: 'currentcolor',
});

export { IconPencil };
