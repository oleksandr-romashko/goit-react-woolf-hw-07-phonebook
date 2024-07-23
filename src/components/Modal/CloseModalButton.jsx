import PropTypes from 'prop-types';

import Button from 'components/Button/BasicButton.styled';
import Icon, { ICON_NAME } from 'components/Icon/Icon';

/**
 * Styled modal close button.
 * @param {string} props.className Button css class for additional styling.
 * @param {callback} props.onClick Function to handle button click.
 * @returns {JSX.Element} Rendered button component.
 */
const CloseModalButton = ({ className, onClick }) => {
  return (
    <Button
      className={`close-modal-btn ${className ?? ''}`}
      onClick={onClick}
      role="button"
      aria-label='close modal'
    >
      <Icon iconName={ICON_NAME.CROSS} className="close-icon" />
    </Button>
  );
};

CloseModalButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default CloseModalButton;