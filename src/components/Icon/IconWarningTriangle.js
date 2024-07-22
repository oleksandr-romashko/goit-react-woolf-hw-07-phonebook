import styled from 'styled-components';
import { ICON_DEFAULTS } from './Icon';

const WarningTriangle = ({ className, width, height, stroke, fill }) => {
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
        d="M7 5.00001V8.25001M7.89 1.05001C7.80608 0.886204 7.67858 0.748739 7.52155 0.652749C7.36452 0.556758 7.18404 0.505966 7 0.505966C6.81595 0.505966 6.63547 0.556758 6.47844 0.652749C6.32141 0.748739 6.19391 0.886204 6.11 1.05001L0.609995 12.05C0.533285 12.2022 0.496763 12.3715 0.503898 12.5419C0.511032 12.7122 0.561586 12.8778 0.650758 13.0231C0.739931 13.1684 0.864761 13.2885 1.01339 13.3719C1.16203 13.4554 1.32953 13.4995 1.5 13.5H12.5C12.6705 13.4995 12.838 13.4554 12.9866 13.3719C13.1352 13.2885 13.2601 13.1684 13.3492 13.0231C13.4384 12.8778 13.489 12.7122 13.4961 12.5419C13.5032 12.3715 13.4667 12.2022 13.39 12.05L7.89 1.05001Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11C6.9337 11 6.87011 10.9737 6.82322 10.9268C6.77634 10.8799 6.75 10.8163 6.75 10.75C6.75 10.6837 6.77634 10.6201 6.82322 10.5732C6.87011 10.5263 6.9337 10.5 7 10.5M7 11C7.0663 11 7.12989 10.9737 7.17678 10.9268C7.22366 10.8799 7.25 10.8163 7.25 10.75C7.25 10.6837 7.22366 10.6201 7.17678 10.5732C7.12989 10.5263 7.0663 10.5 7 10.5"
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

export { WarningTriangle };
