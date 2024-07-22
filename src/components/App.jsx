import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

import { createUser, validateUser } from 'store/user/operations';
import {
  setIsDisclaimerModalOpenAction,
  setIsUserProfileModalOpenAction
} from 'store/modals/slice';
import { selectDoNotShowDisclaimerAgain } from 'store/application/selectors';
import {
  selectIsDisclaimerModalOpen,
  selectIsUserProfileModalOpen,
} from 'store/modals/selectors';

import Phonebook from 'components/Phonebook/Phonebook';
import UserProfileButton from './Button/UserProfileButton';
import DisclaimerModal from './Modal/Disclaimer/DisclaimerModal';
import UserProfileModal from './Modal/UserProfile/UserProfileModal';
import Page from 'components/Page/Page.styled';
import Header from 'components/Header/Header.styled';
import HeaderControls from './Header/HeaderControls.styled';
import Loader from './Loader/Loader';
import { selectProfileError, selectProfileLoading } from 'store/profile/selectors';
import { selectUserId } from 'store/user/selectors';
import { TextMessage } from './Message/TextMessage.styled';

/**
 * Contact Book application component.
 * @returns {JSX.Element} Rendered application component.
 */
const App = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectProfileLoading);
  const error = useSelector(selectProfileError);
  const userId = useSelector(selectUserId);

  const isDisclaimerModalOpen = useSelector(selectIsDisclaimerModalOpen);
  const isUserProfileModalOpen = useSelector(selectIsUserProfileModalOpen);

  const doNotShowDisclaimerFlag = useSelector(selectDoNotShowDisclaimerAgain);
  
  /**
   * Setting to show or hide disclaimer modal at start.
   * Change will not be instant and will be effective on next visit or page refresh.
   */
  const doShowDisclaimerModal = useRef(!doNotShowDisclaimerFlag);

  /**
   * Hides disclaimer modal at start.
   */
  useEffect(() => {
    if (doNotShowDisclaimerFlag) {
      dispatch(setIsDisclaimerModalOpenAction(!doNotShowDisclaimerFlag));
    }
  }, [dispatch, doNotShowDisclaimerFlag]);
  
  /**
   * Creates a new user if no user info or validates existing user.
   */
  useEffect(() => {
    if (!userId) {
      // No user -> request to create a new user
      dispatch(createUser());
    } else {
      dispatch(validateUser());
    }
  }, [dispatch, userId]);

  /**
   * Handles show of the user profile modal.
   * @param {React.SyntheticEvent} event Ocurred event.
   */
  const handleUserProfileBtnClick = (event) => {
    const userProfileBtn = event.target.closest('button');
    if (userProfileBtn) {
      if (userProfileBtn === document.activeElement) {
        userProfileBtn.blur();
      }
      dispatch(setIsUserProfileModalOpenAction(true));
    }    
  };
  
  return (
    <>
      <Page>
        <ErrorBoundary>
          <Header>
            <p>Contact Book</p>
            <HeaderControls onClick={handleUserProfileBtnClick}>
              <UserProfileButton />
            </HeaderControls>
          </Header>
          {loading && <Loader text={loading.message || 'Loading user profile data'} />}
          {error && <TextMessage className='page-error-message'>Oops! Sorry, but something went wrong: {error}</TextMessage>}
          {!error && !loading && userId && <Phonebook />}
        </ErrorBoundary>
      </Page>
      {isUserProfileModalOpen && <UserProfileModal />}
      {doShowDisclaimerModal && isDisclaimerModalOpen && <DisclaimerModal />}
    </>
  );
};

export default App;