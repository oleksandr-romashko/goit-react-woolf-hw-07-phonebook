import Icon, { ICON_NAME } from 'components/Icon/Icon';
import { ProfileButton } from './UserProfileButton.styled';

/**
 * User profile button component.
* @returns {JSX.Element} Rendered user profile button.
 */
const UserProfileButton = () => (
  <ProfileButton>
    <Icon iconName={ICON_NAME.USER} className="user-profile-icon" />
  </ProfileButton>
);

export default UserProfileButton;
