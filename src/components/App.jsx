import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectDoNotShowDisclaimerAgain } from 'store/persistent/selectors';
import { selectIsDisclaimerModalOpen } from 'store/modals/selectors';
import { setIsDisclaimerModalOpen } from 'store/modals/slice';

import Page from 'components/Page/Page.styled';
import Header from 'components/Header/Header.styled';
import HeaderControls from './Header/HeaderControls.styled';
import Phonebook from 'components/Phonebook/Phonebook';
import DisclaimerModal from './Modal/DisclaimerModal';
import UserProfileButton from './Button/UserProfileButton';

/**
 * Contact Book application component.
 * @returns {JSX.Element} Rendered application component.
 */
const App = () => {
  const doNotShowDisclaimer = useSelector(selectDoNotShowDisclaimerAgain);
  const isDisclaimerModalOpen = useSelector(selectIsDisclaimerModalOpen);
  const dispatch = useDispatch();

  useEffect(
    () => {
      if (doNotShowDisclaimer) {
        dispatch(setIsDisclaimerModalOpen(false));
      }
    }, [dispatch, doNotShowDisclaimer]
  );
  
  return (
    <>
      <Page>
        <ErrorBoundary>
          <Header>
            <p>Contact Book</p>
            <HeaderControls>
              <UserProfileButton />
            </HeaderControls>
          </Header>
            <Phonebook />
          </ErrorBoundary>
      </Page>
      {isDisclaimerModalOpen && <DisclaimerModal />}
    </>
  );
};

export default App;