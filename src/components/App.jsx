import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectDoNotShowDisclaimerAgain } from 'store/persistent/selectors';
import {
  selectIsDisclaimerModalOpen,
  selectIsUserProfileModalOpen,
} from 'store/modals/selectors';
import { setIsDisclaimerModalOpen, setIsUserProfileModalOpen } from 'store/modals/slice';

import Phonebook from 'components/Phonebook/Phonebook';
import UserProfileButton from './Button/UserProfileButton';
import DisclaimerModal from './Modal/Disclaimer/DisclaimerModal';
import UserProfileModal from './Modal/UserProfile/UserProfileModal';
import Page from 'components/Page/Page.styled';
import Header from 'components/Header/Header.styled';
import HeaderControls from './Header/HeaderControls.styled';

/**
 * Contact Book application component.
 * @returns {JSX.Element} Rendered application component.
 */
const App = () => {
  const doNotShowDisclaimer = useSelector(selectDoNotShowDisclaimerAgain);
  const isDisclaimerModalOpen = useSelector(selectIsDisclaimerModalOpen);
  const isUserProfileModalOpen = useSelector(selectIsUserProfileModalOpen);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (doNotShowDisclaimer) {
        dispatch(setIsDisclaimerModalOpen(false));
      }
    }, [dispatch, doNotShowDisclaimer]
  );

  /**
   * Handles ser profile modal show.
   * @param {React.SyntheticEvent} event Ocurred event.
   */
  const handleUserProfileBtnClick = (event) => {
    const userProfileBtn = event.target.closest('button');
    if (userProfileBtn) {
      dispatch(setIsUserProfileModalOpen(true));
      if (userProfileBtn === document.activeElement) {
        userProfileBtn.blur();
      }
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
            <Phonebook />
          </ErrorBoundary>
      </Page>
      {isUserProfileModalOpen && <UserProfileModal />}
      {isDisclaimerModalOpen && <DisclaimerModal />}
    </>
  );
};

export default App;