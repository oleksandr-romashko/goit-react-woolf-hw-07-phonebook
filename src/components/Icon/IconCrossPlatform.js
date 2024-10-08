import styled from 'styled-components';
import { ICON_DEFAULTS } from './Icon';

const IconCrossPlatform = ({ className, width, height, stroke, fill }) => {
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
        d="M5.65385 9.61539L4.80769 11.7308M7.34615 9.61539L8 11.7308H3.96154M9.88462 2H11.5769C11.6891 2 11.7967 2.04457 11.8761 2.12392C11.9554 2.20326 12 2.31087 12 2.42308V5.5H9C8.7 5.5 8.19231 5.6 8.19231 5.80418L8.0801 9.61539H1.42308C1.31087 9.61539 1.20326 9.57081 1.12392 9.49147C1.04457 9.41213 1 9.30452 1 9.19231V2.42308C1 2.31087 1.04457 2.20326 1.12392 2.12392C1.20326 2.04457 1.31087 2 1.42308 2H3.11538H9.88462Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2308 11.1538H10.7692M12.3846 5.5H8.61537C8.47256 5.5 8.3356 5.55673 8.23462 5.65771C8.13363 5.75869 8.0769 5.89565 8.0769 6.03846V11.9615C8.0769 12.1043 8.13363 12.2413 8.23462 12.3423C8.3356 12.4433 8.47256 12.5 8.61537 12.5H12.3846C12.5274 12.5 12.6644 12.4433 12.7653 12.3423C12.8663 12.2413 12.9231 12.1043 12.9231 11.9615V6.03846C12.9231 5.89565 12.8663 5.75869 12.7653 5.65771C12.6644 5.55673 12.5274 5.5 12.3846 5.5Z"
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

export { IconCrossPlatform };
