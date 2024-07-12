import ReactDom from 'react-dom';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsUserProfileModalOpen } from 'store/modals/slice';
import { selectDoNotShowDisclaimerAgain } from 'store/persistent/selectors';

import Modal from '../Modal';
import { ProfileWrapper } from './UserProfileModal.styled';
import Icon from 'components/Icon/Icon';
import Button, { BUTTON_STYLE } from 'components/Button/BasicButton.styled';

/**
 * Modal with information the user and additional user profile actions.
 * @returns {JSX.Element} Rendered user profile modal component.
 */
const UserProfileModal = () => {
  const isDoNotShowAgain = useSelector(selectDoNotShowDisclaimerAgain);
  const dispatch = useDispatch();
  
  const handleDoNowShowAgainClick = () => {
    // switch state of do not show again
  }

  const handleClearAllData = () => {
    // clear all data after user confirmation
  }

  const handleClearAllDataClick = () => {
    // show confirmation dialogue with warning section describing all related risks
    console.log("open confirmation modal");
  }

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
      <ProfileWrapper>
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
              Remove all my previously created data after switching to other account
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
          <input name='do-not-show-checkbox' type='checkbox' onClick={handleDoNowShowAgainClick}/>
            Do not show greeting informational message and disclaimer at start
          </label>
        <div>
          <p>Danger Zone</p>
          <Button className={BUTTON_STYLE.DANGER} onClick={handleClearAllDataClick}>Remove all my data</Button>
        </div>
      </ProfileWrapper>
    </Modal>,
    document.getElementById('modal-portal')
  )
};

export default UserProfileModal;