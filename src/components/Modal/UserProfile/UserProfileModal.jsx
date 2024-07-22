import ReactDom from 'react-dom';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteContacts } from 'store/contacts/operations';
import { setDoNotShowDisclaimerAgainAction } from 'store/application/slice';
import { setIsUserProfileModalOpenAction } from 'store/modals/slice';
import { selectDoNotShowDisclaimerAgain } from 'store/application/selectors';
import { selectUserKey, selectUserUuid } from 'store/user/selectors';
import {
  selectContacts,
  selectError,
  selectInfo,
  selectIsAllContactsDeleteInProgress,
  selectIsDeleteAllContactsError,
  selectIsDeleteAllContactsSuccessful,
  selectLoading
} from 'store/contacts/selectors';

import { REMOVE_ALL_DATA_BTN_TEXT } from 'constants/buttonsTexts';

import Modal from '../Modal';
import InteractiveInput from 'components/Input/InteractiveInput';
import Spinner from 'components/Loader/Spinner';
import { ICON_NAME } from 'components/Icon/Icon';
import ConfirmDialogueBoxModal from '../ConfirmDialogBox/ConfirmDialogueBoxModal';
import { ProfileWrapper, UserProfileForm, SECTION, InfoText } from './UserProfileModal.styled';
import Button, { BUTTON_STYLE } from 'components/Button/BasicButton.styled';

/**
 * User profile modal with information about the user and additional App and user settings and actions.
 * @returns {JSX.Element} Rendered user profile modal component.
 */
const UserProfileModal = () => {
  const dispatch = useDispatch();

  const [isRemoveAllDataDialogueOpen, setIsRemoveAllDataDialogueOpen] = useState(false);
  const isDoNotShowAgain = useSelector(selectDoNotShowDisclaimerAgain);
  
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isDeleteAllLoading = useSelector(selectIsAllContactsDeleteInProgress);
  const isDeleteAllContactsSuccessful = useSelector(selectIsDeleteAllContactsSuccessful);
  const successfulInfo = useSelector(selectInfo);
  const isDeleteAllError = useSelector(selectIsDeleteAllContactsError);

  const userUuid = useSelector(selectUserUuid);
  const userKey = useSelector(selectUserKey);

  /**
   * State to show or hide user key.
   */
  const [doShowUserKey, setDoShowKey] = useState(true);
  
  /**
   * Toggles key input visibility
   * Changes visibility icon of the action button
   * @param {React.SyntheticEvent} event Ocurred event
   */
  const handleToggleKeyVisibility = event => {
    
    const input = event.currentTarget.closest('.js-input-wrapper').firstElementChild;
    if (input.type === "password") {
      input.type = "text";
      setDoShowKey(false);
    } else {
      input.type = "password";
      setDoShowKey(true);
    }
  }
  
  /**
   * WIP: Deletes all data related to the user, both on back end and locally.
   */
  const handleClearAllDataClick = () => {
    setIsRemoveAllDataDialogueOpen(false);
    // try remove contacts from back end
    dispatch(deleteContacts(contacts));

    // try remove user from back end
    
    // remove local data from user browser

    // localStorage.removeItem(`persist:${rootPersistConfig.key}`);
  }
  
  /**
   * Handles setting to show or hide disclaimer modal at start.
   */
  const handleToggleDoNowShowAgain = () => {
    dispatch(setDoNotShowDisclaimerAgainAction(!isDoNotShowAgain))
  }

  const handleModalClose = useCallback(() => {
    if (!isRemoveAllDataDialogueOpen) {
      dispatch(setIsUserProfileModalOpenAction(false));
    }
  }, [dispatch, isRemoveAllDataDialogueOpen]);

  return ReactDom.createPortal(
    <Modal
      title="User profile"
      onCloseBtnClick={handleModalClose}
      onEscapeKeyPress={handleModalClose}
      onBackdropClick={handleModalClose}
    >
      <ProfileWrapper>
        <UserProfileForm>
          <InteractiveInput
            className='user-identifier-input'
            name={'user-uuid'}
            label='User unique identifier'
            value={userUuid ?? 'User profile not found'}
            type='text'
            copyable
            disabled
          />

          <InteractiveInput
            className='user-key-input'
            name='user-key'
            label='Verification key'
            value={userKey ?? 'User key not found'}
            type='password'
            actionIconName={doShowUserKey ? ICON_NAME.VISIBILITY_SHOW : ICON_NAME.VISIBILITY_HIDE}
            autoComplete="off" 
            onAction={handleToggleKeyVisibility}
            copyable
            disabled
          />
        </UserProfileForm>

        <SECTION>
          <p>Application settings</p>
          <label className='do-not-show-label'>
            <input
              name='do-not-show-checkbox'
              type='checkbox'
              onClick={handleToggleDoNowShowAgain}
              defaultChecked={isDoNotShowAgain}
            />
            <p>Do not show important information and disclaimer at application start</p>
          </label>
        </SECTION>

        <SECTION>
          <details>
            <summary>Danger Zone</summary>
            <Button
              className={`profile-remove-all-data-btn ${BUTTON_STYLE.DANGER}`}
              onClick={() => setIsRemoveAllDataDialogueOpen(true)}>
              {isDeleteAllLoading && loading ? (
                <>
                  <Spinner />
                  </>
                ) : (
                  REMOVE_ALL_DATA_BTN_TEXT
                )}
            </Button>
            {isDeleteAllLoading && loading && <p className='delete-all-pending-message'></p>}
            <InfoText data-info-show={isDeleteAllLoading && loading}>
              Removing all contacts, please wait... This may take a while. We apologize for the wait.
            </InfoText>
            <InfoText
              className='success'
              data-info-show={isDeleteAllContactsSuccessful && successfulInfo ? true : false}
            >
              {isDeleteAllContactsSuccessful && successfulInfo && 
                <>
                {successfulInfo.empty
                  && <span>{successfulInfo.empty}</span>}
                {successfulInfo.fulfilled
                  && <span>Successfully removed {successfulInfo.fulfilled.length} {successfulInfo.fulfilled.length === 1
                    ? 'contact' : 'contacts'}.</span>}
                {successfulInfo.rejected
                  && <span> Failed to remove {successfulInfo.rejected.length} {successfulInfo.rejected.length === 1
                    ? 'contact' : 'contacts'}.</span>}
              </>
              }
            </InfoText>
            <InfoText data-info-show={error && isDeleteAllError}>
              Ouch. Our system is under too much stress. Some contacts may not have been deleted. Please refresh this page and try to delete all data again later.
              {error && error.message && `: ${error.message}`}
            </InfoText>
            {isRemoveAllDataDialogueOpen &&
              <ConfirmDialogueBoxModal
                onConfirm={handleClearAllDataClick}
                onCancel={()=> setIsRemoveAllDataDialogueOpen(false)}
                onCloseBtnClick={()=> setIsRemoveAllDataDialogueOpen(false)}
                onEscapeKeyPress={()=> setIsRemoveAllDataDialogueOpen(false)}
                onBackdropClick={()=> setIsRemoveAllDataDialogueOpen(false)}
                title=""
                message={'Are you sure you want to delete all user data?'}
                warningMessage={
                  <>
                    {/* <p>All your data, including user profile information and contacts, will be removed from this application.</p> */}
                    {/* <p>This action cannot be undone, and all information will be lost.</p> */}
                    <p>All your contacts, will be removed from this application.</p>
                    <p>This action cannot be undone, and all contact information will be lost.</p>
                  </>
                }
                confirmText="Yes, delete"
                cancelText="Cancel"
                confirmBtnStyle={BUTTON_STYLE.DANGER}
              />
            }
          </details>
        </SECTION>
      </ProfileWrapper>
    </Modal>,
    document.getElementById('modal-portal')
  )
};

export default UserProfileModal;