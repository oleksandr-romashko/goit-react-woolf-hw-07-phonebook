import ReactDom from 'react-dom';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setIsUserProfileModalOpen } from 'store/modals/slice';

import { Backdrop, ModalContainer, Modal, Title } from '../Modal.styled';
import { CloseBtn } from './UserProfileModal.styled';
import Icon from 'components/Icon/Icon';

const UserProfileModal = () => {
  const dispatch = useDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(setIsUserProfileModalOpen(false));
  }, [dispatch]);

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.code === "Escape") {
        handleModalClose();
      }
    };

    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleModalClose])

  return ReactDom.createPortal(
    <>
      <Backdrop />
      <Modal>
        <CloseBtn onClick={handleModalClose} />
        <ModalContainer>
          <Title>User profile</Title>
          <form>
            <div>
              <p>User identifier</p>
              <div>
                <input type='text'></input>
                <Icon name='important' stroke='currentcolor' />
                <Icon name='close' stroke='currentcolor' />
                <Icon name='cross-platform' stroke='currentcolor' />
                <Icon name='user-profile' stroke='currentcolor' />
              </div>
              <label>
                <input type='checkbox' />
                Remove all my previously created data after switching account
              </label>
            </div>
            <div>
              <p>Verification key</p>
              <div>
                <input type='text' />
                <Icon name='close' stroke='currentcolor' />
              </div>
            </div>
          </form>
          
          <div>
            <p>Danger zone</p>
            <button type='button'>Remove all my data</button>
          </div>
        </ModalContainer>
      </Modal>
    </>,
    document.getElementById('modal-portal')
  )
};

export default UserProfileModal;