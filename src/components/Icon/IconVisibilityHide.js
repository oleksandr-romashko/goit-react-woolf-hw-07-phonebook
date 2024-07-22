import styled from 'styled-components';
import { ICON_DEFAULTS } from './Icon';

const IconVisibilityHide = ({ className, width, height, stroke, fill }) => {
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
        d="M2.169 5.81299L0.610001 4.25199M5.135 3.89799L4.5 1.84299M11.831 5.81299L13.39 4.25299M8.865 3.89799L9.5 1.84299M3.12231 10C1.69498 8.90531 1.055 7.51605 1.055 7.46899C1.055 7.39099 2.813 3.62499 7 3.62499C8.19158 3.62499 9.18643 3.93 10 4.36822M4.69405 10.8894C5.36139 11.1487 6.12802 11.312 7 11.312C11.187 11.312 12.945 7.54699 12.945 7.46899C12.945 7.42742 12.4456 6.33826 11.3453 5.32998"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.01603 6.03444C7.82892 5.90059 7.61711 5.80522 7.39287 5.75386C7.16862 5.7025 6.93641 5.69617 6.7097 5.73523C6.483 5.7743 6.2663 5.85798 6.07218 5.98143C5.87806 6.10488 5.71038 6.26565 5.57886 6.4544C5.44734 6.64314 5.35461 6.85613 5.30603 7.08099C5.25189 7.30458 5.24268 7.53669 5.27893 7.76387C5.30544 7.92996 5.35586 8.09099 5.42835 8.24204M8.73003 7.65861C8.72189 7.72524 8.70989 7.79148 8.69403 7.85699C8.64545 8.08185 8.55271 8.29483 8.4212 8.48358C8.28968 8.67233 8.122 8.83309 7.92788 8.95654C7.73376 9.07999 7.51706 9.16368 7.29035 9.20274C7.14236 9.22824 6.99202 9.2344 6.84309 9.22131"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1.00002 12L13 2" stroke={stroke} strokeLinecap="round" />
    </SVG>
  );
};

const SVG = styled('svg')({
  fill: 'none',
  stroke: 'currentcolor',
});

export { IconVisibilityHide };
