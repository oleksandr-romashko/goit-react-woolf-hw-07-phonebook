import styled from 'styled-components';
import { ICON_DEFAULTS } from './Icon';

const IconImportant = ({ className, width, height, stroke, fill }) => {
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
        d="M7.42308 3.61538V6.57692M4.88462 11.6538L1.5 12.5L2.34615 9.96154V2.34615C2.34615 2.12174 2.4353 1.90652 2.59399 1.74783C2.75267 1.58915 2.96789 1.5 3.19231 1.5H11.6538C11.8783 1.5 12.0935 1.58915 12.2522 1.74783C12.4109 1.90652 12.5 2.12174 12.5 2.34615V10.8077C12.5 11.0321 12.4109 11.2473 12.2522 11.406C12.0935 11.5647 11.8783 11.6538 11.6538 11.6538H4.88462Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.42309 8.90385C7.36698 8.90385 7.31318 8.88156 7.27351 8.84189C7.23383 8.80222 7.21155 8.74842 7.21155 8.69231C7.21155 8.63621 7.23383 8.5824 7.27351 8.54273C7.31318 8.50306 7.36698 8.48077 7.42309 8.48077M7.42309 8.90385C7.47919 8.90385 7.533 8.88156 7.57267 8.84189C7.61234 8.80222 7.63462 8.74842 7.63462 8.69231C7.63462 8.63621 7.61234 8.5824 7.57267 8.54273C7.533 8.50306 7.47919 8.48077 7.42309 8.48077"
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

export { IconImportant };
