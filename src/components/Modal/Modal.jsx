import { useEffect } from "react";
import PropTypes from 'prop-types';

import {
  Backdrop,
  ModalContainer,
  ModalTitle,
  ModalContentWrapper,
} from "./Modal.styled";
import CloseModalButton from "./CloseModalButton";

/**
 * Base modal component.
 * @param {string} props.title Modal title.
 * @param {JSX.Element} props.children Children components.
 * @param {func} props.onCloseBtnClick Function to handle click on modal close button.
 * @param {func} props.onEscapeKeyPress Function to handle Escape key press while modal is opened.
 * @param {func} props.onBackdropClick Function to handle click on modal backdrop.
 * @param {string} props.className Additional css styling class for modal container.
 * @returns {JSX.Element} Rendered modal component.
 */
const Modal = (
  {
    title,
    children,
    onCloseBtnClick,
    onEscapeKeyPress,
    onBackdropClick,
    className,
  }
) => {

  /**
   * Add and removes listener for Escape key press while modal is opened.
   */
  useEffect(() => {
    if (onEscapeKeyPress) {
      const handleKeyPress = event => {
        if (event.code === "Escape") {
          onEscapeKeyPress();
        }
      };
      window.addEventListener("keyup", handleKeyPress);

      return () => {
        window.removeEventListener("keyup", handleKeyPress);
      };
    }
  }, [onEscapeKeyPress])

  return (
    <>
      <Backdrop onClick={onBackdropClick}/>
      <ModalContainer
        className={`${className ?? ''} ${onCloseBtnClick ? 'closable' : ''}`}
      >
        {onCloseBtnClick && <CloseModalButton onClick={onCloseBtnClick} />}
        <ModalContentWrapper className="modal-content">
          {title && <ModalTitle>{title}</ModalTitle>}
          {children}
        </ModalContentWrapper>
      </ModalContainer>
    </>  
  );
};

Modal.propTypes = {
  title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
    onCloseBtnClick: PropTypes.func,
    onEscapeKeyPress: PropTypes.func,
    onBackdropClick: PropTypes.func,
    className: PropTypes.string,
};

export default Modal;