import { useSelector } from 'react-redux';
import { selectIsDisclaimerModalOpen } from 'store/modals/selectors';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { Wrapper, Title, Subtitle } from './Phonebook.styled';

/**
 * Phonebook component to manage contacts.
 * @returns {JSX.Element} Rendered application component.
 */
const Phonebook = () => {
  const isDisclaimerModalOpen = useSelector(selectIsDisclaimerModalOpen);
  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm />
      <Subtitle>Contacts</Subtitle>
      <Filter />
      {!isDisclaimerModalOpen && <ContactList />}
    </Wrapper>
  )
}

export default Phonebook;
