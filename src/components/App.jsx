import Page from 'components/Page/Page.styled';
import Header from 'components/Header/Header.styled';
import HeaderIcons from './Icons/HeaderIcons.styled';
import Phonebook from 'components/Phonebook/Phonebook';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

/**
 * Contact Book application component.
 * @returns {JSX.Element} Rendered application component.
 */
const App = () => {
  return (
    <Page>
      <Header>
        <p>Contact Book</p>
        <HeaderIcons>
          {/* <LocalStorageIcon fill='var(--color-basic-white)' /> */}
        </HeaderIcons>
      </Header>
      <ErrorBoundary>
        <Phonebook />
      </ErrorBoundary>
    </Page>
  );
};

export default App;