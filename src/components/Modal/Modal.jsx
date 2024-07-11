import { Backdrop, ModalContent } from "./Modal.styled"

const Modal = ({children}) => {
  return (
    <>
      <Backdrop />
      <ModalContent>
        {children}
      </ModalContent>
    </>
  )
}

export default Modal