import Icon, { ICON_NAME } from 'components/Icon/Icon';
import { StyledButton } from './InteractiveButton.styled';
import React from 'react';

/**
 * Button with interactive confirmation of an action after click.
 * If appropriate flag is applied, button will show a disappearing check mark. 
 * @param {string} props.className Button css class.
 * @param {string || ICON_NAME} props.iconName Icon name used to change button icon.
 * @param {func} props.onClick Function handling button click.
 * @param {bool || string} props.isConfirmable A flag whether to show action confirmation.
 * @returns {JSX.Element} Rendered button component.
 */
const InteractiveButton = ({ className, iconName, onClick, isConfirmable }) => {
  /**
   * Handles button click and calls provided function.
   * If @param props.isConfirmable flag is present, shows confirmation and hides it after delay.
   * @param {React.SyntheticEvent} event Click event. 
   */
  const handleButtonClick = event => {
    const button = event.currentTarget;
    if (isConfirmable) {
      button.classList.add('confirmed');
      setTimeout(() => button.classList.remove('confirmed'), 1000);
    }
    button.blur();
    onClick(event);
  };
  
  return (
    <StyledButton className={className} type='button' onClick={handleButtonClick}>
      <Icon
        iconName={iconName}
        className='interactive-btn-icon copy-paste-icon'
      />
      {isConfirmable &&
        <Icon
          iconName={ICON_NAME.CHECK_MARK}
          className='interactive-btn-icon feedback-confirmation-icon'
        />
      }
    </StyledButton>
  );
};

export default InteractiveButton;