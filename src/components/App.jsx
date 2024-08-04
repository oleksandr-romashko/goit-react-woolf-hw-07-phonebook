import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

import { createUser, validateUser } from 'store/user/operations';
import {
  setIsDisclaimerModalOpenAction, setIsUserProfileModalOpenAction
} from 'store/modals/slice';
import { selectDoNotShowDisclaimerAgain } from 'store/application/selectors';
import {
  selectProfileLoading,
  selectProfileError,
  selectIsProfileUserDeleted,
} from 'store/profile/selectors';
import { selectUserId } from 'store/user/selectors';
import {
  selectIsDisclaimerModalOpen,  selectIsUserProfileModalOpen,
} from 'store/modals/selectors';

import Phonebook from 'components/Phonebook/Phonebook';
import UserProfileButton from './Button/UserProfileButton';
import TextMessage from './Message/TextMessage';
import Loader from './Loader/Loader';
import Page from 'components/Page/Page.styled';
import Header from 'components/Header/Header.styled';
import HeaderControls from './Header/HeaderControls.styled';
import DisclaimerModal from './Modal/Disclaimer/DisclaimerModal';
import UserProfileModal from './Modal/UserProfile/UserProfileModal';

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
  
  const profileIsDeletedStatus = useSelector(selectIsProfileUserDeleted);

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
    if (!profileIsDeletedStatus) {
      if (!userId) {
        // No user -> request to create a new user
        dispatch(createUser());
      } else {
        dispatch(validateUser());
      }
    }
  }, [dispatch, userId, profileIsDeletedStatus]);

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

  let deletedProfileMessage;
  if (profileIsDeletedStatus) {
    deletedProfileMessage =
      <>
        <p>All your data has been successfully deleted and your user account has been removed. You may now close this tab.</p>
        <p>To continue using this application, simply refresh the page. A new account will be created for you automatically on page refresh or on your next visit.</p>
        <p>Thank you!</p>
        <p className='secondary'>I would love to read your thoughts, questions, issues, typos, and anything else you feel like sharing with me.</p>
        <p className='secondary'>You can contact me on&nbsp;
          <a
            href="https://github.com/oleksandr-romashko"
            title="Developer GitHub page"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </>
  }
  
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
          {!profileIsDeletedStatus && error &&
            <TextMessage className='page-message'>
              <p>{error}</p>
              <p className='secondary'>I would love to read your thoughts, questions, issues, typos, and anything else you feel like sharing with me.</p>
              <p className='secondary'>You can contact me on&nbsp;
                <a
                  href="https://github.com/oleksandr-romashko"
                  title="Developer GitHub page"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                .
              </p>
            </TextMessage>}
          {profileIsDeletedStatus &&
            <TextMessage className='page-message'>
              {deletedProfileMessage}
            </TextMessage>
          }
          {!error && !loading && !profileIsDeletedStatus && userId && <Phonebook />}
        </ErrorBoundary>
      </Page>
      {isUserProfileModalOpen && <UserProfileModal />}
      {doShowDisclaimerModal && isDisclaimerModalOpen && <DisclaimerModal />}
    </>
  );
};

export default App;