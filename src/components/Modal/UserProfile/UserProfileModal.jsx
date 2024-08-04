import { useCallback, useState } from 'react';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import throttle from 'lodash.throttle';

import { rootPersistConfig } from 'store/store';
import { deleteContacts } from 'store/contacts/operations';
import {
  deleteCurrentUser,
  switchUser,
  updateUserKey,
} from 'store/user/operations';
import { setDoNotShowDisclaimerAgainAction } from 'store/application/slice';
import { setIsUserProfileModalOpenAction } from 'store/modals/slice';
import {
  PROFILE_REQUEST_STATUS,
  setProfileStatusAction,
  setProfileErrorAction,
} from 'store/profile/slice';
import { selectDoNotShowDisclaimerAgain } from 'store/application/selectors';
import {
  selectProfileStatus,
  selectProfileError,
  selectIsProfileDataUpdateInProgress,
  selectIsProfileDataUpdateSuccessful,
  selectIsProfileDataUpdateFailed,
  selectIsProfileUserDeleteInProgress,
  selectIsProfileUserDeleted,
} from 'store/profile/selectors';
import { selectUserKey, selectUserUuid } from 'store/user/selectors';
import {
  selectContacts,
  selectError,
  selectInfo,
  selectIsAllContactsDeleteInProgress,
  selectIsDeleteAllContactsSuccessful,
  selectIsDeleteAllContactsError,
} from 'store/contacts/selectors';

import { REMOVE_ALL_DATA_BTN_TEXT } from 'constants/buttonsTexts';

import Modal from '../Modal';
import ConfirmDialogueBoxModal from '../ConfirmDialogBox/ConfirmDialogueBoxModal';
import {
  ProfileWrapper,
  UserProfileForm,
  Section,
  InfoText,
  ProfileFormActionsWrapper
} from './UserProfileModal.styled';
import InteractiveInput from 'components/Input/InteractiveInput';
import Spinner from 'components/Loader/Spinner';
import Icon, { ICON_NAME } from 'components/Icon/Icon';
import Button, { BUTTON_STYLE } from 'components/Button/BasicButton.styled';
import WarningMessage from 'components/Message/WarningMessage';

const NOT_FOUND_USER = 'User profile not found';
const NOT_FOUND_KEY = 'User key not found';

/**
 * User profile modal with information about the user and additional App and user settings and actions.
 * @returns {JSX.Element} Rendered user profile modal component.
 */
const UserProfileModal = () => {
  const dispatch = useDispatch();

  const isDoNotShowAgain = useSelector(selectDoNotShowDisclaimerAgain);

  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);
  
  const isProfileUpdateInProgress = useSelector(selectIsProfileDataUpdateInProgress);
  const isProfileDataUpdateSuccessful = useSelector(selectIsProfileDataUpdateSuccessful);
  const isProfileDataUpdateFailed = useSelector(selectIsProfileDataUpdateFailed);
  const profileError = useSelector(selectProfileError);
  
  const isDeleteAllContactsInProgress = useSelector(selectIsAllContactsDeleteInProgress);
  const isDeleteUserInProgress = useSelector(selectIsProfileUserDeleteInProgress);
  const isDeleteAllContactsSuccessful = useSelector(selectIsDeleteAllContactsSuccessful);
  const successfulInfo = useSelector(selectInfo);
  const isDeleteAllError = useSelector(selectIsDeleteAllContactsError);

  const profileDeleteStatus = useSelector(selectProfileStatus);
  const isProfileUserDeletedStatus = useSelector(selectIsProfileUserDeleted);

  const userUuid = useSelector(selectUserUuid);
  const userKey = useSelector(selectUserKey);
  const [userUuidInputValue, setUserUuidInputValue] = useState(userUuid ?? NOT_FOUND_USER);
  const [userKeyInputValue, setUserKeyInputValue] = useState(userKey ?? NOT_FOUND_KEY)
  
  const isUserUuidChanged = userUuidInputValue !== userUuid;
  const isUserKeyChanged = userKeyInputValue !== userKey;

  const [isChangeUserDialogueOpen, setIsChangeUserDialogueOpen] = useState(false);
  const [isChangeUserKeyDialogueOpen, setIsChangeUserKeyDialogueOpen] = useState(false);
  const [isRemoveAllUserDataDialogueOpen, setIsRemoveAllUserDataDialogueOpen] = useState(false);

  const [doShowUserKey, setDoShowKey] = useState(true);
  
  const handleUserFormClick = ({ target, currentTarget }) => {
    const editAttribute = 'data-edited';
    const form = currentTarget;
    const button = target.closest('button');
    if (button && button.name) {
      if (button.name === 'edit-btn') {
        form.setAttribute(editAttribute, '');

        const userUuidEl = form.elements['user-uuid'];
        const userKeyEl = form.elements['user-key'];

        userUuidEl.removeAttribute('disabled');
        userKeyEl.removeAttribute('disabled');
      }
  
      if (button.name === 'cancel-btn') {
        form.removeAttribute(editAttribute);
        
        const userUuidEl = form.elements['user-uuid'];
        const userKeyEl = form.elements['user-key'];

        userUuidEl.setAttribute('disabled', '');
        userKeyEl.setAttribute('disabled', '');

        isUserUuidChanged && setUserUuidInputValue(userUuid ?? NOT_FOUND_USER);
        isUserKeyChanged && setUserKeyInputValue(userKey ?? NOT_FOUND_KEY)
      }
    }
  };

  const handleUserFormInputChange = event => {
    if (event.target?.name === 'user-uuid') {
      setUserUuidInputValue(event.target.value);
    }

    if (event.target?.name === 'user-key') {
      setUserKeyInputValue(event.target.value)
    }
  }

  const handleUserFormSubmit = event => {
    event.preventDefault();

    // open change user confirmation dialogue
    if (isUserUuidChanged) {
      setIsChangeUserDialogueOpen(true);
    }
    
    // open change user key confirmation dialogue
    if (!isUserUuidChanged && isUserKeyChanged) {
      setIsChangeUserKeyDialogueOpen(true);
    }
  };

  const handleUserChange = () => {
    const userUuid = document.getElementById('user-id-input').value;
    const userKey = document.getElementById('user-key-input').value;
    setIsChangeUserDialogueOpen(false);
    dispatch(switchUser({ uuid: userUuid, key: userKey }));
  }

  const handleUserKeyUpdate = () => {
    const userKey = document.getElementById('user-key-input').value;
    setIsChangeUserKeyDialogueOpen(false);
    dispatch(updateUserKey(userKey));
  }

  /**
   * Toggles user verification key input text readability.
   * Also changes visibility icon of the show-hide action button.
   * @param {React.SyntheticEvent} event Ocurred click event.
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
    if (input === document.activeElement) {
        input.blur();
    }
  }
  
  /**
   * Handles app setting to show disclaimer modal at start.
   */
  const handleToggleDoNowShowAgain = () => {
    if (!profileDeleteStatus) {
      dispatch(setDoNotShowDisclaimerAgainAction(!isDoNotShowAgain));
    }
  }

  /**
   * Deletes all data related to the user, both on back end and locally.
   */
  const handleClearAllDataClick = async () => {
    setIsRemoveAllUserDataDialogueOpen(false);
    try {
      // Dispatch deleteContacts and wait for it to complete
      const deleteContactsResult = await dispatch(deleteContacts(contacts)).unwrap();

      if (deleteContactsResult.rejected.length === 0) {
        // Dispatch deleteCurrentUser and wait for it to complete
        await dispatch(deleteCurrentUser()).unwrap();

        // Remove local data from user's browser
        localStorage.removeItem(`persist:${rootPersistConfig.key}`);

        dispatch(setProfileStatusAction(PROFILE_REQUEST_STATUS.deleteCurrentUser.successful));
      }
    } catch (error) {
      dispatch(setProfileErrorAction("An error occurred while clearing data:", error.message))
    }
  }

  const handleModalClose = useCallback(() => {
    if (!isRemoveAllUserDataDialogueOpen) {
      dispatch(setIsUserProfileModalOpenAction(false));
    }
  }, [dispatch, isRemoveAllUserDataDialogueOpen]);

  return ReactDom.createPortal(
    <Modal
      title="User profile"
      onCloseBtnClick={handleModalClose}
      onEscapeKeyPress={handleModalClose}
      onBackdropClick={handleModalClose}
    >
      <ProfileWrapper>
        <UserProfileForm
          id='profile-user-data-form'
          onClick={handleUserFormClick}
          onSubmit={handleUserFormSubmit}
        >
          <p className='user-form-element'>
            You may use your unique user identifier and verification key to access your contacts on other devices, such as a mobile phone.
          </p>
          <p className='user-form-element'>
            Additionally, you can share them with others, allowing them to view and manage your contacts as well.
          </p>

          <InteractiveInput
            id='user-id-input'
            className='user-input'
            name='user-uuid'
            label='Unique user identifier'
            value={userUuidInputValue}
            onChange={throttle(handleUserFormInputChange, 200, { trailing: false })}
            type='text'
            copyable
            disabled
          />

          <InteractiveInput
            id='user-key-input'
            className='user-input'
            name='user-key'
            label='Verification key'
            value={userKeyInputValue}
            onChange={throttle(handleUserFormInputChange, 200, { trailing: false })}
            type='password'
            actionIconName={
              doShowUserKey
              ? ICON_NAME.VISIBILITY_SHOW
              : ICON_NAME.VISIBILITY_HIDE
            }
            autoComplete="off" 
            onAction={handleToggleKeyVisibility}
            copyable
            disabled
          />

          <div className='user-form-warnings'>
            <WarningMessage data-show-condition={isUserUuidChanged}>
              <p>We will switch your user profile to another one.</p>
              <p>You may switch back to your current account by providing your user identifier and verification key. Therefore, don't forget to <em>save your current user identifier and verification key</em> for future use.</p>
            </WarningMessage>
            <WarningMessage
              data-show-condition={!isUserUuidChanged && isUserKeyChanged}
            >
              <p>We will change your user key associated with the current user.</p>
              <p>All connected <em>devices will automatically lose access to the current user's data</em> until their user key is updated to the new one.</p>
            </WarningMessage>
          </div>
            
          <ProfileFormActionsWrapper className='user-form-element'>
            <Button
              name='edit-btn'
              className='js-edited-hide'
              type='button'
              data-edit='edit'
            >
              <Icon
                className='user-profile-edit-icon'
                iconName={ICON_NAME.PENCIL}
              />
              Edit
            </Button>

            <Button
              name='submit-btn'
              className={`js-edited-show ${BUTTON_STYLE.ACCENT_BLUE}`}
              type='submit'
              disabled = {isUserUuidChanged || isUserKeyChanged ? false : true}
            >
              {
                isProfileUpdateInProgress
                ? <Spinner />
                : 'Apply'
              }
            </Button>

            <Button
              name='cancel-btn'
              className='js-edited-show'
              type='button'
              data-edit='cancel'
            >
              Cancel
            </Button>

          </ProfileFormActionsWrapper>
          <InfoText
            className='success'
            data-info-show={isProfileDataUpdateSuccessful}
          >
            User data has been successfully updated.
          </InfoText>
          <InfoText
            className='fail'
            data-info-show={isProfileDataUpdateFailed}
          >
            Something went wrong while updating user data{profileError ? `: ${profileError}` : ''}.
          </InfoText>
        </UserProfileForm>

        <Section>
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
        </Section>

        <Section>
          <details>
            <summary>Danger Zone</summary>
            <p className='normal-black-text'>
              You may delete all data related to your account from this app:
            </p>
            <Button
              className={`profile-remove-all-data-btn ${BUTTON_STYLE.DANGER}`}
              onClick={() => !profileDeleteStatus && setIsRemoveAllUserDataDialogueOpen(true)}>
              {
                // isDeleteAllContactsLoading && contactsLoading
                // isDeleteAllContactsLoading
                isDeleteAllContactsInProgress || isDeleteUserInProgress
                ? <Spinner />
                : REMOVE_ALL_DATA_BTN_TEXT
              }
            </Button>
            {isDeleteAllContactsInProgress
              && <p className='delete-all-pending-message'></p>}
            <InfoText className='danger-error' data-info-show={isDeleteAllContactsInProgress}>
              Removing all contacts, please wait... This may take a while. We apologize for the wait.
            </InfoText>
            <InfoText
              className='danger-error success'
              data-info-show={isDeleteAllContactsSuccessful && successfulInfo}
            >
              <>
              {successfulInfo?.empty
                && <span>{successfulInfo.empty}</span>}
              {successfulInfo?.fulfilled
                && <span>Successfully removed {successfulInfo.fulfilled.length} {successfulInfo.fulfilled.length === 1
                  ? 'contact' : 'contacts'}.</span>}
              {successfulInfo?.rejected
                && <span> Failed to remove {successfulInfo.rejected.length} {successfulInfo.rejected.length === 1
                  ? 'contact' : 'contacts'}.</span>}
              </>
            </InfoText>
             <InfoText
              className='danger-error success'
              data-info-show={isProfileUserDeletedStatus}
            >
              Your profile has already been deleted.
            </InfoText>
            <InfoText className='danger-error' data-info-show={error && isDeleteAllError}>
              Ouch. Something went wrong and some contacts may not have been deleted. Please refresh this page and try to delete all data again later.
              {error && error.message && `: ${error.message}`}
            </InfoText>
            {isChangeUserDialogueOpen &&
              <ConfirmDialogueBoxModal
                onConfirm={handleUserChange}
                onCancel={()=> setIsChangeUserDialogueOpen(false)}
                onCloseBtnClick={()=> setIsChangeUserDialogueOpen(false)}
                onEscapeKeyPress={()=> setIsChangeUserDialogueOpen(false)}
                onBackdropClick={()=> setIsChangeUserDialogueOpen(false)}
                title=""
                message={'Are you sure you want to change user?'}
                confirmText="Yes"
                cancelText="Cancel"
                confirmBtnStyle={BUTTON_STYLE.DANGER}
              />
            }
            {isChangeUserKeyDialogueOpen &&
              <ConfirmDialogueBoxModal
                onConfirm={handleUserKeyUpdate}
                onCancel={()=> setIsChangeUserKeyDialogueOpen(false)}
                onCloseBtnClick={()=> setIsChangeUserKeyDialogueOpen(false)}
                onEscapeKeyPress={()=> setIsChangeUserKeyDialogueOpen(false)}
                onBackdropClick={()=> setIsChangeUserKeyDialogueOpen(false)}
                title=""
                message={'Are you sure you want to change user key?'}
                confirmText="Yes"
                cancelText="Cancel"
                confirmBtnStyle={BUTTON_STYLE.DANGER}
              />
            }
            {isRemoveAllUserDataDialogueOpen &&
              <ConfirmDialogueBoxModal
                onConfirm={handleClearAllDataClick}
                onCancel={()=> setIsRemoveAllUserDataDialogueOpen(false)}
                onCloseBtnClick={()=> setIsRemoveAllUserDataDialogueOpen(false)}
                onEscapeKeyPress={()=> setIsRemoveAllUserDataDialogueOpen(false)}
                onBackdropClick={()=> setIsRemoveAllUserDataDialogueOpen(false)}
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
        </Section>
      </ProfileWrapper>
    </Modal>,
    document.getElementById('modal-portal')
  )
};

export default UserProfileModal;