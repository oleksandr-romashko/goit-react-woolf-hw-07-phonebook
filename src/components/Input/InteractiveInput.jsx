import {
  Label,
  InputWrapper,
  StyledInput,
  ButtonsWrapper,
} from './InteractiveInput.styled';
import InteractiveButton from './InteractiveButton';
import { ICON_NAME } from 'components/Icon/Icon';

/**
 * Input with additional interactions facilitating additional custom action and
 * copy to clipboard functionality.
 * Whether @param props.onAction function or @param props.copyable flag is provided,
 * shows appropriate additional functionality, by default not shown.
 * @param {string} props.className Additional custom css styling class(es) for input.
 * @param {string} props.id Input id.
 * @param {string} props.name Input name.
 * @param {string} props.label Label text to title input. Wraps input.
 * @param {string} props.value Input value.
 * @param {string} props.type Input type (e.g. 'text' or 'password').
 * @param {string} props.placeholder Input placeholder text.
 * @param {string} props.title Input title.
 * @param {func} props.onChange Function to handle input change event.
 * @param {func} props.onKeyUp Function to handle keyUp event when input focused.
 * @param {string} props.autoComplete Flag ('on' or 'off') to ignore form element autocomplete. May be ignored by browser.
 * @param {func} props.onAction Function to handle additional action button click.
 * @param {string} props.actionIconName Icon name for additional action button.
 * @param {string} props.copyable Flag to show copy-to-clipboard button.
 * @param {string} props.disabled Flag to disable input element.
 * @returns {JSX.Element} Rendered InteractiveInput component.
 */
const InteractiveInput = ({
  className,
  id,
  name = id,
  label,
  value,
  type,
  placeholder,
  title,
  onChange,
  onKeyUp,
  autoComplete,
  onAction,
  actionIconName,
  copyable,
  disabled,
}) => {

  /**
   * Handles copying input text to clipboard.
   */
  let handleCopyTextToClipboard;
    if (copyable) {
      handleCopyTextToClipboard = event => {
      var input = event.target.closest('.copyable').firstElementChild;

      // Select the text field
      // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_copy_clipboard
      input.select();
      input.setSelectionRange(0, 99999); // For mobile devices
      // Copy the text inside the text field
      navigator.clipboard.writeText(input.value);
    }
  }

  return (
    <Label className={copyable && 'copyable'}>
      {label}
      <InputWrapper className={`js-input-wrapper ${label && 'labeled'} ${copyable && 'copyable'}`}>
        <StyledInput
          className={`${className} ${onAction && 'with-action'}`}
          id={id}
          value={value}
          type={type ?? 'text'}
          placeholder={placeholder ?? ''}
          name={name}
          autoComplete={autoComplete}
          title={title}
          onChange={onChange}
          onKeyUp={onKeyUp}
          disabled={disabled}
        />
        <ButtonsWrapper>
          {onAction &&
            <InteractiveButton
              className='action'
              iconName={actionIconName}
              onClick={onAction}
              aria-label='additional action'
            />
          }
          {copyable &&
            <InteractiveButton
              className='copy-paste'
              iconName={ICON_NAME.COPY_PASTE}
              onClick={handleCopyTextToClipboard}
              isConfirmable='true'
              aria-label='copy input field text'
            />
          }
        </ButtonsWrapper>
      </InputWrapper>
    </Label>
  );
};

export default InteractiveInput;
