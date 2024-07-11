import Icon from 'components/Icon/Icon';
import { ProfileButton } from './UserProfileButton.styled';

/**
 * User profile button component.
* @returns {JSX.Element} Rendered user profile button.
 */
const UserProfileButton = () => (
  <ProfileButton>
    <Icon name="user-profile" className="user-profile-icon" />
  </ProfileButton>
);

export default UserProfileButton;
