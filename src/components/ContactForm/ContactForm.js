import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'store/contacts/selectors';
import { addContactAction } from 'store/contacts/slice';
import { setFilterAction } from 'store/filter/slice';

import Input from 'components/Input/Input.styled';
import Button from 'components/Button/Button.styled';
import { Form, Label } from './ContactForm.styled';

/**
 * Patterns to check input text for.
 */
const CONTACT_NAME_PATTERN_REGEX =
  "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const PHONE_NUMBER_PATTERN_REGEX =
  "\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}";

/**
 * Form to handle contact form elements.
 * Submits data for adding a new contact.
 * Clears form elements on successful submit.
 * @returns {JSX.Element} Rendered contact form component.
 */
const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

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
    const isExists = contacts.some(({ name: existingName }) =>
      existingName.toLowerCase() === name.toLowerCase());
    if (isExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContactAction({name, number}));

    // On addContact - clear filter to see a newly added contact to the list
    dispatch(setFilterAction(''));

    event.target.reset();
  };

  return (
    <Form onSubmit={handleAddContact} aria-label='Add contact form'>
      <Label aria-label='Contact name'>
        Name
        <Input
          type='text'
          name='name'
          pattern={CONTACT_NAME_PATTERN_REGEX}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          autoComplete='true'
          required
        />
      </Label>
      <Label aria-label='Contact phone number'>
        Phone number
        <Input
          type='tel'
          name='number'
          pattern={PHONE_NUMBER_PATTERN_REGEX}
          title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
          required
        />
      </Label>
      <Button type='submit' aria-label='Add contact'>
        Add contact
      </Button>
    </Form>
  );
}

export default ContactForm;
