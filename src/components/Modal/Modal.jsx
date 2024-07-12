import { useEffect } from "react";
import {
  Backdrop,
  ModalContainer,
  CloseModalBtn,
  ModalTitle,
  ModalContentWrapper,
} from "./Modal.styled";

const Modal = ({ title, children, onCloseBtnClick, onBackdropClick, className }) => {
  useEffect(() => {
    if (onCloseBtnClick) {
      const handleKeyPress = event => {
        if (event.code === "Escape") {
          onCloseBtnClick();
        }
      };
      window.addEventListener("keyup", handleKeyPress);

      return () => {
        window.removeEventListener("keyup", handleKeyPress);
      };
    }
  }, [onCloseBtnClick])

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