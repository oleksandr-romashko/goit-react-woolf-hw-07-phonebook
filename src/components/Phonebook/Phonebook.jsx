import { useSelector } from 'react-redux';

import { selectIsDisclaimerModalOpen } from 'store/modals/selectors';
import { selectUserId } from 'store/user/selectors';

import { Wrapper, Title, Subtitle } from './Phonebook.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';

/**
 * Phonebook component to manage contacts.
 * @returns {JSX.Element} Rendered application component.
 */
const Phonebook = () => {
  const isDisclaimerModalOpen = useSelector(selectIsDisclaimerModalOpen);
  const userId = useSelector(selectUserId);
  
  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm />
      <Subtitle>Contacts</Subtitle>
      <Filter />
      {!isDisclaimerModalOpen && userId && <ContactList />}
    </Wrapper>
  )
}

export default Phonebook;
