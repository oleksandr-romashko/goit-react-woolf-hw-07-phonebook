import Icon from 'components/Icon/Icon';
import { ProfileButton } from './UserProfileButton.styled';

/**
 * Handles show of the user profile modal.
 * @param {React.SyntheticEvent} event Ocurred event.
 */
const handleUserProfileBtnClick = (event) => {
  // add open user profile modal code here
  if (event.currentTarget === document.activeElement) {
      event.currentTarget.blur();
  }
};

/**
 * User profile button component.
* @returns {JSX.Element} Rendered user profile button.
 */
const UserProfileButton = () => (
  <ProfileButton onClick={handleUserProfileBtnClick}>
    <Icon name="user-profile" className="user-profile-icon" />
  </ProfileButton>
);

export default UserProfileButton;
