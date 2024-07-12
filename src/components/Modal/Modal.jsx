import { useEffect } from "react";
import {
  Backdrop,
  ModalContainer,
  CloseModalBtn,
  ModalTitle,
  ModalContentWrapper,
} from "./Modal.styled";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Modal = ({ title, children, onCloseBtnClick, onEscapeKeyPress, onBackdropClick, className }) => {
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
      <ModalContainer className={`${className ?? ''} ${onCloseBtnClick && 'closable'}`}>
        {onCloseBtnClick && <CloseModalBtn onClick={onCloseBtnClick} />}
        <ModalContentWrapper className="modal-content">
          {title && <ModalTitle>{title}</ModalTitle>}
          {children}
        </ModalContentWrapper>
      </ModalContainer>
    </>  
  );
};

export default Modal;