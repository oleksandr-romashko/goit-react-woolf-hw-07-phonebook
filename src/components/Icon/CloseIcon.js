import { ICON_DEFAULT } from "./Icon";

const CloseIcon = ({ className, fill, height, stroke, width }) => {
  return (
    <svg
      className={className}
      width={width || ICON_DEFAULT.WIDTH}
      height={height || ICON_DEFAULT.HEIGHT}
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
    </svg>
  );
};

export { CloseIcon };
