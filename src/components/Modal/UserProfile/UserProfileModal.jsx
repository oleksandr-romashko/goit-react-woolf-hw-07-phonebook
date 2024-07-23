import ReactDom from 'react-dom';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { rootPersistConfig } from 'store/store';
import { deleteContacts } from 'store/contacts/operations';
import { deleteCurrentUser } from 'store/user/operations';
import { setDoNotShowDisclaimerAgainAction } from 'store/application/slice';
import { profileRequestStatus, setProfileStatusAction } from 'store/profile/slice';
import { selectDoNotShowDisclaimerAgain } from 'store/application/selectors';
import { selectProfileStatus } from 'store/profile/selectors';
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
import { setIsUserProfileModalOpenAction } from 'store/modals/slice';

import { REMOVE_ALL_DATA_BTN_TEXT } from 'constants/buttonsTexts';

import InteractiveInput from 'components/Input/InteractiveInput';
import Spinner from 'components/Loader/Spinner';
import { ICON_NAME } from 'components/Icon/Icon';
import Modal from '../Modal';
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

  const profileDeleteStatus = useSelector(selectProfileStatus);
   
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
   * Deletes all data related to the user, both on back end and locally.
   */
  const handleClearAllDataClick = async () => {
    setIsRemoveAllDataDialogueOpen(false);
     try {
        // Dispatch deleteContacts and wait for it to complete
        const deleteContactsResult = await dispatch(deleteContacts(contacts)).unwrap();

        if (deleteContactsResult.rejected.length === 0) {
          // Dispatch deleteCurrentUser and wait for it to complete
          await dispatch(deleteCurrentUser()).unwrap();

          // Remove local data from user browser
          localStorage.removeItem(`persist:${rootPersistConfig.key}`);

          dispatch(setProfileStatusAction(profileRequestStatus.deleteUser.successful));
        }
      } catch (error) {
        // Handle any errors that occur during deletion
        console.error("An error occurred while clearing data:", error.message);
      }
  }
  
  /**
   * Handles setting to show or hide disclaimer modal at start.
   */
  const handleToggleDoNowShowAgain = () => {
    if (!profileDeleteStatus) {
      dispatch(setDoNotShowDisclaimerAgainAction(!isDoNotShowAgain))
    }
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
            label='Unique user identifier'
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
            <p className='normal-black-text'>
              You may delete all data related to your account from this app:
            </p>
            <Button
              className={`profile-remove-all-data-btn ${BUTTON_STYLE.DANGER}`}
              onClick={() => !profileDeleteStatus && setIsRemoveAllDataDialogueOpen(true)}>
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
             <InfoText
              className='success'
              data-info-show={profileDeleteStatus ? true : false}
            >
              Your profile has already been deleted.
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
                    <p>All your data, including user profile information and contacts, will be removed from this application.</p>
                    <p>This action cannot be undone, and all information will be lost.</p>
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