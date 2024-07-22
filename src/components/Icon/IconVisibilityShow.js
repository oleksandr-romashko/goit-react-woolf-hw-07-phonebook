import styled from 'styled-components';
import { ICON_DEFAULTS } from './Icon';

const IconVisibilityShow = ({ className, width, height, stroke, fill }) => {
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
        d="M2.169 5.813L0.610001 4.252M5.135 3.898L4.5 1.843M11.831 5.813L13.39 4.253M8.865 3.898L9.5 1.843M7 3.625C2.813 3.625 1.055 7.391 1.055 7.469C1.055 7.547 2.813 11.312 7 11.312C11.187 11.312 12.945 7.547 12.945 7.469C12.945 7.391 11.187 3.625 7 3.625Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.306 7.081C5.25186 7.30459 5.24265 7.53671 5.2789 7.76388C5.31515 7.99106 5.39615 8.20878 5.51718 8.40441C5.63822 8.60005 5.79689 8.76971 5.98399 8.90355C6.1711 9.0374 6.38291 9.13277 6.60716 9.18413C6.8314 9.23549 7.06361 9.24182 7.29032 9.20276C7.51703 9.16369 7.73372 9.08001 7.92785 8.95656C8.12197 8.83311 8.28965 8.67235 8.42116 8.4836C8.55268 8.29485 8.64542 8.08187 8.694 7.857C8.74813 7.63341 8.75734 7.4013 8.72109 7.17413C8.68484 6.94695 8.60385 6.72923 8.48281 6.5336C8.36177 6.33796 8.2031 6.1683 8.016 6.03445C7.82889 5.90061 7.61708 5.80524 7.39284 5.75388C7.16859 5.70251 6.93638 5.69618 6.70967 5.73525C6.48297 5.77431 6.26627 5.858 6.07215 5.98145C5.87803 6.1049 5.71035 6.26566 5.57883 6.45441C5.44731 6.64316 5.35457 6.85614 5.306 7.081Z"
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

export { IconVisibilityShow };
