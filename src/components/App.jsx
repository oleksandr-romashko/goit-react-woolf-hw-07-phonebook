import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/Page/Page.styled';
import Header from 'components/Header/Header.styled';
import HeaderIconsWrapper from './Header/HeaderIcons.styled';
import Phonebook from 'components/Phonebook/Phonebook';
import DisclaimerModal from './Modal/DisclaimerModal';
import { selectDoNotShowDisclaimerAgain } from 'store/persistent/selectors';
import { selectIsDisclaimerModalOpen } from 'store/modals/selectors';
import { setIsDisclaimerModalOpen } from 'store/modals/slice';

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
        <Header>
          <p>Contact Book</p>
          <HeaderIconsWrapper>
            {/* <LocalStorageIcon fill='var(--color-basic-white)' /> */}
          </HeaderIconsWrapper>
        </Header>
        <ErrorBoundary>
          <Phonebook />
        </ErrorBoundary>
      </Page>
      {isDisclaimerModalOpen && <DisclaimerModal />}
    </>
  );
};

export default App;