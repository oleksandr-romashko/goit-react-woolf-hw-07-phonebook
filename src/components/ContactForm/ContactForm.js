import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectContacts,
  selectStatus,
  selectIsFormLoading,
  selectError,
} from 'store/contacts/selectors';
import { setFilterAction } from 'store/filter/slice';
import {
  // resetStatus,
  rejectContactAddWhenExists,
  requestStatus,
} from 'store/contacts/slice';
import { addContact } from 'store/contacts/operations';

import Input from 'components/Input/Input.styled';
import Button from 'components/Button/BasicButton.styled';
import Spinner from 'components/Loader/Spinner';
import { Form, Label, AddButtonWrapper, InfoText } from './ContactForm.styled';

/**
 * Info status messages.
 */
const INFO_ADD_SUCCESSFUL = '✓ Contact was successfully added to the list.';
const INFO_ADD_FAILED = 'Failed to add contact';

/**
 * Patterns to check input text for.
 */
const CONTACT_NAME_PATTERN_REGEX =
  "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const PHONE_NUMBER_PATTERN_REGEX =
  '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}';

/**
 * Form to handle contact form elements.
 * Submits data for adding a new contact.
 * Clears form elements on successful submit.
 * @returns {JSX.Element} Rendered contact form component.
 */
const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectStatus);
  const isFormLoading = useSelector(selectIsFormLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === requestStatus.addContact.successful) {
      document.getElementById('add-form').reset();

      // Remove info message upon timeout by resetting status.
      // A better solution should be found as it removes status even in case
      // if other not related status has been applied
      // setTimeout(() => {
      //   dispatch(resetStatus());
      // }, 3500);
    }
  }, [status, dispatch]);

  /**
   * Handles form submission.
   * Terminates if requested regex pattern does not match to input value.
   * Calls provided props callback that handles add of a new contact.
   * @param {React.SyntheticEvent} event React cross-browser SyntheticEvent that wraps the native Event.
   */
  const handleAddContact = event => {
    event.preventDefault();

    const name = event.target.name.value;
    const number = event.target.number.value;

    // Additional patterns checks in JS as addition to html input element pattern
    // ! Evaluate logging data when if saving to a log file for potential debugging
    if (!name.match(CONTACT_NAME_PATTERN_REGEX)) {
      console.error(`Name '${name}' does not match allowed pattern.`);
      return;
    }
    if (!number.match(PHONE_NUMBER_PATTERN_REGEX)) {
      console.error(`Number '${number}' does not match allowed pattern.`);
      return;
    }

    // Remove focus from form submit button
    if (event.target['add-button'] === document.activeElement) {
      event.target['add-button'].blur();
    }

    const isExists = contacts.some(
      ({ name: existingName }) =>
        existingName.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      // Handle contact exists in the state
      dispatch(rejectContactAddWhenExists('Contact is already in the list'));
      return;
    }

    dispatch(addContact({ name, number }));

    // On addContact - clear filter to see a newly added contact to the list
    dispatch(setFilterAction(''));
  };

  return (
    <Form
      id="add-form"
      onSubmit={handleAddContact}
      aria-label="Add contact form"
    >
      <Label aria-label="Contact name">
        Name
        <Input
          type="text"
          name="name"
          pattern={CONTACT_NAME_PATTERN_REGEX}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          autoComplete="true"
          required
        />
      </Label>
      <Label aria-label="Contact phone number">
        Phone number
        <Input
          type="tel"
          name="number"
          pattern={PHONE_NUMBER_PATTERN_REGEX}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <AddButtonWrapper>
        <Button name="add-button" type="submit" aria-label="Add contact">
          {isFormLoading ? <Spinner /> : 'Add contact'}
        </Button>
        <InfoText
          className={
            status &&
            ((status === requestStatus.addContact.successful && 'success') ||
              (status &&
                status === requestStatus.addContact.failed &&
                'failure'))
          }
          data-info-show={
            (status &&
              (status === requestStatus.addContact.successful ||
                status === requestStatus.addContact.failed)) ||
            false
          }
        >
          <span className="info-text success-text">{INFO_ADD_SUCCESSFUL}</span>
          <span className="info-text failure-text">{`${INFO_ADD_FAILED}${
            error && `: ${error}`
          }.`}</span>
        </InfoText>
      </AddButtonWrapper>
    </Form>
  );
};

export default ContactForm;
