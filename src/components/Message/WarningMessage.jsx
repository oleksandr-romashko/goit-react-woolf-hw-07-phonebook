import Icon, { ICON_NAME } from "components/Icon/Icon";
import { Title, WarningWrapper } from "./WarningMessage.styled"

/**
 * Styled warning message for emphasize and warn before important of danger action.
 * @param {string} props.className Additional css styling class.
 * @param {JSX.Element} props.children Children elements for informational message.
 * @returns {JSX.Element} Rendered WarningMessage component.
 */
const WarningMessage = ({className, children}) => {
  return (
    <WarningWrapper className={className}>
      <Title>
        <Icon
          className='warning-title-icon'
          iconName={ICON_NAME.WARNING_TRIANGLE}
        />
        Warning!
      </Title>
      {children}
    </WarningWrapper>
  );
};

export default WarningMessage;