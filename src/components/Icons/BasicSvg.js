import PropTypes from 'prop-types';
import { Svg } from './BasicSvg.styled';

/**
 * Styled svg icon.
 * @param {string} props.width Width value.
 * @param {string} props.height Height value.
 * @param {string} props.fill Fill color - color name or value.
 * @param {string} props.stroke Stroke color - color name or value.
 * @param {string} props.strokeWidth Stroke width.
 * @param {string} props.viewBox Viewbox values.
 *
 * @returns {JSX.Element} Rendered icon component.
 */
export const BasicSvg = ({
  width,
  height,
  fill,
  stroke,
  strokeWidth,
  viewBox,
  children,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
    >
      {children}
    </Svg>
  );
};

BasicSvg.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.string,
  viewBox: PropTypes.string,
};
