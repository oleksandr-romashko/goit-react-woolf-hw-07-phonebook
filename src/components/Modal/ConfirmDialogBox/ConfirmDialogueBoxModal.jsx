import { useEffect } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import { ButtonsWrapper } from './ConfirmDialogueBoxModal.styled';
import Button, { BUTTON_STYLE } from 'components/Button/BasicButton.styled';
import Modal from '../Modal';

/**
 * Dialog for info messages and interaction with the user.
 * @param {callback} props.onConfirm Function to handle confirmation click.
 * @param {callback} props.onRefuse Function to handle refuse click.
 * @param {callback} props.onCancel Function to handle cancel click.
 * @param {callback} props.onClose Function to handle close button click.
 * @param {string} props.title Title text.
 * @param {string} props.message Message text.
 * @param {string} props.confirmText Confirm button text.
 * @param {string} props.refuseText Refuse button text.
 * @param {string} props.cancelText Cancel button text.
 * @param {BUTTON_STYLE | string} props.confirmBtnStyle Style (class) of the confirm button.
 * @param {BUTTON_STYLE | string} props.refuseBtnStyle Style (class) of the refuse button..
 * @param {BUTTON_STYLE | string} props.cancelBtnStyle Style (class) of the cancel button..
 * @param {string} props.calledOnId DOM element id of a container to render children into using React portal.
 * @returns 
 */
const ConfirmDialogueBoxModal = (
  {
    onConfirm,
    onRefuse,
    onCancel,
    onCloseBtnClick,
    title = !onRefuse ? 'Thank you!' : 'Are you sure?',
    message,
    confirmText = !onRefuse ? 'Ok' : 'Yes',
    refuseText = 'No',
    cancelText = 'Cancel',
    confirmBtnStyle,
    refuseBtnStyle,
    cancelBtnStyle,
    calledOnId = 'modal-dialogue-portal',
  }
) => {

  /**
   * Adds and removes event listener for modal close when modal is opened.
   */
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

  return ReactDom.createPortal(
    <Modal className='confirm-dialogue-box-modal' title={title} onCloseBtnClick={onCloseBtnClick}>
      {message && <p>{message}</p>}
      <ButtonsWrapper>
        <Button className={confirmBtnStyle} onClick={onConfirm}>
          {confirmText}
        </Button>
        {onRefuse &&  <Button className={refuseBtnStyle} onClick={onRefuse}>
                        {refuseText}
                      </Button>}
        {onCancel && <Button className={cancelBtnStyle} onClick={onCancel}>
                        {cancelText}
                      </Button>}
      </ButtonsWrapper>
    </Modal>,
    document.getElementById(calledOnId)
  );
};

ConfirmDialogueBoxModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onRefuse: PropTypes.func,
  onCancel: PropTypes.func,
  onClose: PropTypes.func,
  calledOnId: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  refuseText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmBtnStyle: PropTypes.oneOf(Object.values(BUTTON_STYLE)),
  refuseBtnStyle: PropTypes.oneOf(Object.values(BUTTON_STYLE)),
  cancelBtnStyle: PropTypes.oneOf(Object.values(BUTTON_STYLE)),
};

export default ConfirmDialogueBoxModal;
