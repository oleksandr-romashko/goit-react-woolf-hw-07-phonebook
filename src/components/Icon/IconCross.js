import styled from 'styled-components';
import { ICON_DEFAULTS } from './Icon';

const IconCross = ({ className, width, height, stroke, fill }) => {
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
        d="M12.5 1.5L1.5 12.5M1.5 1.5L12.5 12.5"
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

export { IconCross };
