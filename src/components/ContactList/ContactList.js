import { useEffect, useRef } from 'react';
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
  closeDialogueBoxModalAction,
  showDialogueBoxModalAction,
} from 'store/modals/slice';
import {
  deleteContactById,
  fetchContacts,
  syncContacts,
} from 'store/contacts/operations';

import textToNormalizedWordsArray from 'components/helpers/textToNormalizedWordsArray';
import { sortAsc } from 'helpers/sort';

import Button, { BUTTON_STYLE } from 'components/Button/BasicButton.styled';
import Loader from 'components/Loader/Loader';
import Spinner from 'components/Loader/Spinner';
import { List, Item, InfoText } from './ContactList.styled';
import ConfirmDialogueBoxModal from 'components/Modal/ConfirmDialogBox/ConfirmDialogueBoxModal';
import { TextMessage } from 'components/Message/TextMessage.styled';

/**
 * Polling interval for polling strategy to receive contact list updates.
 */
const POLLING_INTERVAL = 30000;

/**
 * Info error status messages.
 */
const INFO_ERROR_PREFIX = 'Oops! Sorry, but something went wrong';

/**
 * Component to contain the list of contact items.
 * Displays default message when no contacts provided.
 * @returns {JSX.Element} Rendered list of contacts or default message.
 */
const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const status = useSelector(selectStatus);
  const loading = useSelector(selectLoading);
  const isDeleteLoading = useSelector(selectIsContactDeleteInProgress);
  const error = useSelector(selectError);
  const isDeleteError = useSelector(selectIsDeleteError);
  const filter = useSelector(selectFilter);
  const { isDialogueBoxModalOpen, deleteId, deleteName } = useSelector(
    selectDialogueBoxModal
  );

  const pollingIntervalRef = useRef(null);

  // Set up polling updates using polling strategy for contacts synchronization.
  // Do not poll when document is not visible.
  useEffect(() => {
    // Fetch contacts immediately on mount
    dispatch(fetchContacts());

    // Function to synch contacts if the tab is active
    const fetchContactsIfVisible = () => {
      if (document.visibilityState === 'visible') {
        dispatch(syncContacts());
      }
    };

    // Set up polling
    pollingIntervalRef.current = setInterval(
      fetchContactsIfVisible,
      POLLING_INTERVAL
    );

    // Cleanup on unmount
    return () => {
      clearInterval(pollingIntervalRef.current);
    };
  }, [dispatch]);

  // Set up visibility change event listener for polling updates.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(syncContacts());
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch]);

  if (loading && !status) {
    return <Loader text="Just a moment, loading your contacts!" />;
  }

  if (error && !status) {
    return <TextMessage>{error}</TextMessage>;
  }

  // No contacts message
  if (!contacts.length) {
    return "Looks like you haven't added any contacts yet.";
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
    dispatch(closeDialogueBoxModalAction());
    dispatch(deleteContactById(deleteId));
  };

  const handleShowDialogueBoxModal = event => {
    if (event.target.nodeName === 'BUTTON') {
      const contactItem = event.target.closest('li');
      const deleteId = Number(contactItem.dataset.id);
      let innerText = contactItem.querySelector('.contact-name').innerText;
      const deleteName = innerText.slice(0, -2);

      if (event.target === document.activeElement) {
        event.target.blur();
      }

      dispatch(showDialogueBoxModalAction({ deleteId, deleteName }));
    }
  };

  const handleCloseDialogueBoxModal = () =>
    dispatch(closeDialogueBoxModalAction());

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
              {INFO_ERROR_PREFIX}
              {error && error.message && `: ${error.message}`}
            </InfoText>
          </Item>
        ))}
      </List>
      {isDialogueBoxModalOpen && (
        <ConfirmDialogueBoxModal
          onConfirm={handleDeleteContactOnList}
          onCancel={handleCloseDialogueBoxModal}
          onCloseBtnClick={handleCloseDialogueBoxModal}
          onEscapeKeyPress={handleCloseDialogueBoxModal}
          onBackdropClick={handleCloseDialogueBoxModal}
          title=""
          message={'Are you sure you want to delete'}
          details={`${deleteName}?`}
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
