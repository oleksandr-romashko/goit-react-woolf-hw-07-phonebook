import styled from 'styled-components';
import { ICON_DEFAULTS } from './Icon';

const IconCheckMark = ({ className, width, height, stroke, fill }) => {
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
        d="M0.5 8.55L3.23 12.06C3.32144 12.1786 3.43835 12.2752 3.57211 12.3426C3.70587 12.41 3.85305 12.4465 4.0028 12.4493C4.15255 12.4522 4.30103 12.4214 4.43728 12.3592C4.57353 12.297 4.69407 12.205 4.79 12.09L13.5 1.55"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

const SVG = styled('svg')({
  fill: 'none',
  stroke: 'currentcolor',
});

export { IconCheckMark };
