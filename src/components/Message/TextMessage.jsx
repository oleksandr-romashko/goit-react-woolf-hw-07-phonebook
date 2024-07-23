import { TextMessageWrapper } from "./TextMessage.styled";

const TextMessage = ({ className, children }) => {
  return (
    <TextMessageWrapper className={className}>
      {children}
    </TextMessageWrapper>
  );
};

export default TextMessage;