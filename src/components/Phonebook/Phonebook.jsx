import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getIsLoading } from 'store/contacts/selectors';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { Wrapper, Title, Subtitle } from './Phonebook.styled';
import Loader from 'components/Loader/Loader';
import { useEffect } from 'react';
import { fetchContacts } from 'store/contacts/operations';

/**
 * Phonebook component to manage contacts.
 * @returns {JSX.Element} Rendered application component.
 */
const Phonebook = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const contacts = useSelector(getContacts);

  useEffect(()=> {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm />
        <Subtitle>Contacts</Subtitle>
        {isLoading 
          ? <Loader /> 
          : contacts.length > 0 
            ? <>
                <Filter />
                <ContactList />
              </>
          : 'You have no contacts at the moment.'
        }
      </Wrapper>
  )
}

export default Phonebook;
