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
import { selectDialogueBoxModal } from 'store/modals/selectors';
import {
  closeDialogueBoxModal,
  showDialogueBoxModal,
} from 'store/modals/slice';
import { deleteContactById, fetchContacts } from 'store/contacts/operations';

import textToNormalizedWordsArray from 'components/helpers/textToNormalizedWordsArray';
import { sortAsc } from 'helpers/sort';

import Button, { BUTTON_STYLE } from 'components/Button/BasicButton.styled';
import Loader from 'components/Loader/Loader';
import Spinner from 'components/Loader/Spinner';
import { List, Item, InfoText } from './ContactList.styled';
import ConfirmDialogueBoxModal from 'components/Modal/ConfirmDialogBox/ConfirmDialogueBoxModal';

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
  const { isDialogueBoxModalOpen, deleteId } = useSelector(
    selectDialogueBoxModal
  );
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
  const handleDeleteContactOnList = () => {
    dispatch(closeDialogueBoxModal());
    dispatch(deleteContactById(deleteId));
  };

  const handleShowDialogueBoxModal = event => {
    if (event.target.nodeName === 'BUTTON') {
      const contactItem = event.target.closest('li');
      const deleteId = Number(contactItem.dataset.id);
      if (event.target === document.activeElement) {
        event.target.blur();
      }
      dispatch(showDialogueBoxModal(deleteId));
    }
  };

  const handleCloseDialogueBoxModal = () => dispatch(closeDialogueBoxModal());

  return (
    <>
      <List
        id="contact-list"
        onClick={handleShowDialogueBoxModal}
        aria-label="List of contacts"
      >
        {sortedFilteredContacts.map(el => (
          <Item key={el.id} aria-label="Contact" data-id={el.id}>
            <div>
              <p>
                <span className="contact-name">{el.name}:&nbsp;</span>
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
              data-info-show={
                isDeleteError && error.contactId === Number(el.id)
              }
            >
              {INFO_DELETE_FAILED}
              {/* additional error message details showed lack of exact useful details for user */}
              {/* {isDeleteError && error.contactId === Number(el.id) ? `: ${error.message}.` : '.'} */}
            </InfoText>
          </Item>
        ))}
      </List>
      {isDialogueBoxModalOpen && (
        <ConfirmDialogueBoxModal
          onConfirm={handleDeleteContactOnList}
          onCancel={handleCloseDialogueBoxModal}
          onCloseBtnClick={handleCloseDialogueBoxModal}
          onBackdropClick={handleCloseDialogueBoxModal}
          title=""
          message="Are you sure you want to delete this contact?"
          confirmText="Yes, delete"
          cancelText="Cancel"
          confirmBtnStyle={BUTTON_STYLE.ACCENT_BLUE}
        />
      )}
    </>
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