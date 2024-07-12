import ReactDom from 'react-dom';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setIsUserProfileModalOpen } from 'store/modals/slice';

import Modal from '../Modal';
import Icon from 'components/Icon/Icon';

/**
 * Modal with information the user and additional user profile actions.
 * @returns {JSX.Element} Rendered user profile modal component.
 */
const UserProfileModal = () => {
  const dispatch = useDispatch();

  const handleModalClose = useCallback(() => {
    dispatch(setIsUserProfileModalOpen(false));
  }, [dispatch]);

  return ReactDom.createPortal(
    <Modal
      title="User profile"
      onCloseBtnClick={handleModalClose}
      onEscapeKeyPress={handleModalClose}
      onBackdropClick={handleModalClose}
    >
      <form>
        <div>
          <p>User identifier</p>
          <div>
            <input name='user-id' type='text'></input>
            <Icon name='important' stroke='currentcolor' />
            <Icon name='cross' stroke='currentcolor' />
            <Icon name='cross-platform' stroke='currentcolor' />
            <Icon name='user-profile' stroke='currentcolor' />
          </div>
          <label>
            <input name='remove-previous-data' type='checkbox' />
            Remove all my previously created data after switching account
          </label>
        </div>
        <div>
          <p>Verification key</p>
          <div>
            <input name='user-key' type='password' autoComplete="off" />
            <Icon name='cross' stroke='currentcolor' />
          </div>
        </div>
      </form>
      <label>
            <input name='do-not-show-checkbox' type='checkbox' />
            Do not show info message and disclaimer at start
          </label>
      <div>
        <p>Danger zone</p>
        <button type='button'>Remove all my data</button>
      </div>
    </Modal>,
    document.getElementById('modal-portal')
  )
};

export default UserProfileModal;