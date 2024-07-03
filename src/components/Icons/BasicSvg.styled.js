import styled from 'styled-components';

export const Svg = styled('svg')(
  ({ width, height, fill, stroke, strokeWidth, viewBox }) => {
    return {
      width: width || '40px',
      height: height || '40px',
      fill: fill || 'var(--color-basic-white)',
      stroke: stroke || 'none',
      strokeWidth: strokeWidth || '1',
      viewBox: viewBox || '0 0 40 40',
    };
  }
);
