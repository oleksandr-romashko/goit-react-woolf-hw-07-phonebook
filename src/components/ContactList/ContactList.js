import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectContacts,
  selectStatus,
  selectLoading,
  selectIsContactDeleteInProgress,
  selectError,
  selectIsDeleteError,
} from 'store/contacts/selectors';
import { selectFilter } from 'store/filter/selectors';
import { fetchContacts, deleteContactById } from 'store/contacts/operations';
import textToNormalizedWordsArray from 'components/helpers/textToNormalizedWordsArray';

import Button from 'components/Button/BasicButton.styled';
import { List, Item, InfoText } from './ContactList.styled';
import Loader from 'components/Loader/Loader';
import { sortAsc } from 'helpers/sort';
import Spinner from 'components/Loader/Spinner';

/**
 * Info status messages.
 */
const INFO_DELETE_FAILED = 'Failed to delete contact';

/**
 * Component to contain the list of contact items.
 * Displays default message when no contacts provided.
 * @returns {JSX.Element} Rendered list of contacts or default message.
 */
const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectStatus);
  const loading = useSelector(selectLoading);
  const isDeleteLoading = useSelector(selectIsContactDeleteInProgress);
  const error = useSelector(selectError);
  const isDeleteError = useSelector(selectIsDeleteError);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading && !status) {
    return <Loader />;
  }

  if (error && !status) {
    return `Sorry, but something went wrong: ${error}.`;
  }

  // No contacts message
  if (!contacts.length) {
    return 'You have no contacts at the moment.';
  }

  const filteredContacts = filterContacts(contacts, filter);

  // No results found after contacts filtration message
  if (!filteredContacts.length) {
    return "It looks like we couldn't find any matches for your search.";
  }

  const sortedFilteredContacts = sortAsc(filteredContacts);

  /**
   * Handles deletion of the contact.
   */
  const handleDeleteContactOnList = event => {
    if (event.target.nodeName === 'BUTTON') {
      const id = Number(event.target.closest('li').dataset.id);
      dispatch(deleteContactById(id));

      // Remove focus from form submit button
      if (event.target === document.activeElement) {
        event.target.blur();
      }
    }
  };

  return (
    <List aria-label="Contacts list" onClick={handleDeleteContactOnList}>
      {sortedFilteredContacts.map(el => (
        <Item key={el.id} aria-label="Contact" data-id={el.id}>
          <div>
            <p>
              <span>{el.name}:&nbsp;</span>
              <a href={`tel:${el.number}`}>{el.number}</a>
            </p>
            <Button>
              {isDeleteLoading && loading.id === Number(el.id) ? (
                <Spinner />
              ) : (
                'Delete'
              )}
            </Button>
          </div>
          <InfoText
            data-info-show={isDeleteError && error.contactId === Number(el.id)}
          >
            {INFO_DELETE_FAILED}
            {/* additional error message details */}
            {/* {isDeleteError && error.contactId === Number(el.id) ? `: ${error.message}.` : '.'} */}
          </InfoText>
        </Item>
      ))}
    </List>
  );
};

/**
 * Filters contacts based on filter value or returns initial empty contacts array.
 * @param {object[]} contacts Array of contacts.
 * @param {string} filter Filter value.
 * @returns {object[]} Array of filtered contacts. May be empty array.
 */
function filterContacts(contacts, filter) {
  if (!filter) {
    return contacts;
  }
  const normalizedFilterWordsArr = textToNormalizedWordsArray(filter);
  return contacts.filter(el => {
    const normalizedContact = textToNormalizedWordsArray(
      `${el.name}${el.number}`
    ).join('');
    return normalizedFilterWordsArr.some(
      filterEl => !filterEl.isEmpty && normalizedContact.includes(filterEl)
    );
  });
}

export default ContactList;
