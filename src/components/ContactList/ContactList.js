import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../store/contacts/selectors';
import { getFilter } from 'store/filter/selectors';
import { deleteContactByIdAction } from 'store/contacts/slice';

import textToNormalizedWordsArray from 'components/helpers/textToNormalizedWordsArray';

import Button from 'components/Button/Button.styled';
import { List, Item } from './ContactList.styled';

/**
 * Component to contain the list of contact items.
 * Displays default message when no contacts provided.
 * @returns {JSX.Element} Rendered list of contacts or default message.
 */
const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  /**
   * Filters contacts based on filter value.
   * @returns {object[]} Array of filtered contacts.
   */
  const filterContacts = () => {
    if (!contacts.length) {
      return [];
    }
    if (!filter) {
      return contacts;
    }
    const normalizedFilterWordsArr = textToNormalizedWordsArray(filter);
    return contacts.filter(el => {
      const normalizedContact = textToNormalizedWordsArray(`${el.name}${el.number}`).join("");
      return normalizedFilterWordsArr.some(filterEl => (
          !filterEl.isEmpty && normalizedContact.includes(filterEl)
        )
      );
    });
  }

  /**
   * Handles deletion of the contact.
   */
  const handleDeleteContact = event => {
    const id = Number(event.target.closest('li').dataset.id);
    dispatch(deleteContactByIdAction(id));
  };

  // no contacts message
  if (!contacts.length) {
    return 'You have no contacts at the moment.';
  }

  const filteredContacts = filterContacts(contacts);

  // no results after contacts filtration message
  if (!filteredContacts.length) {
    return "It looks like we couldn't find any matches for your search.";
  }

  return (
    <List aria-label='Contacts list'>
      {filteredContacts.map(el => (
        <Item key={el.id} aria-label='Contact' data-id={el.id}>
          <div>
            <p>
              <span>{el.name}:&nbsp;</span>
              <a href={`tel:${el.number}`}>{el.number}</a>
            </p>
            <Button onClick={handleDeleteContact}>Delete</Button>
          </div>
        </Item>
      ))}
    </List>
  );
};

export default ContactList;
