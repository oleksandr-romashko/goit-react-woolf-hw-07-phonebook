import { createAsyncThunk } from '@reduxjs/toolkit';
import isEqual from 'lodash.isequal';

import {
  PROFILE_REQUEST_STATUS,
  setProfileStatusAction,
  setProfileLoadingAction,
  setProfileErrorAction,
} from 'store/profile/slice';

import api from 'services/api';

import { REMOVE_ALL_DATA_BTN_TEXT } from 'constants/buttonsTexts';
import { rootPersistConfig } from 'store/store';
import { rehydrateUserStateAction } from './slice';
import { setDoNotShowDisclaimerAgainAction } from 'store/application/slice';

/**
 * Validates user data.
 */
export const validateUser = createAsyncThunk(
  'user/validateUser',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        setProfileLoadingAction({ message: 'Validating user profile data' })
      );
      const { id, uuid, key } = thunkAPI.getState().user;
      const isValidUser = await validateUserCredentials({ id, uuid, key });
      return isValidUser;
    } catch (error) {
      thunkAPI.dispatch(setProfileErrorAction(error.message));
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      thunkAPI.dispatch(setProfileLoadingAction(false));
    }
  }
);

/**
 * Creates a new user.
 */
export const createUser = createAsyncThunk(
  'user/createUser',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(
        setProfileLoadingAction({ message: 'Creating a new user profile' })
      );
      const response = await api.post('/users');
      return response.data;
    } catch (error) {
      const errorMessage =
        (error.response &&
          error.response.status + ' ' + error.response.statusText) ||
        error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    } finally {
      thunkAPI.dispatch(setProfileLoadingAction(false));
    }
  }
);

/**
 * Change current user.
 */
export const switchUser = createAsyncThunk(
  'user/switchUser',
  async ({ uuid, key }, thunkAPI) => {
    thunkAPI.dispatch(setProfileErrorAction(null));
    thunkAPI.dispatch(setProfileLoadingAction(true));
    thunkAPI.dispatch(
      setProfileStatusAction(PROFILE_REQUEST_STATUS.updateUserData.pending)
    );

    try {
      const response = await api.get('users', {
        params: { uuid, key },
      });

      if (response?.data.length) {
        const id = response.data[0]?.id;
        thunkAPI.dispatch(
          setProfileStatusAction(
            PROFILE_REQUEST_STATUS.updateUserData.successful
          )
        );
        switchOffUserFormEdit();
        thunkAPI.dispatch(setDoNotShowDisclaimerAgainAction(false));
        return thunkAPI.fulfillWithValue({ id, uuid, key });
      }
    } catch (error) {
      if (error.response?.status === 404) {
        const errorMessage =
          'User not found or verification key is not valid. Unable to switch user';
        thunkAPI.dispatch(setProfileErrorAction(errorMessage));
        thunkAPI.dispatch(
          setProfileStatusAction(PROFILE_REQUEST_STATUS.updateUserData.failed)
        );
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        const errorMessage =
          (error.response &&
            error.response.status + ' ' + error.response?.statusText) ||
          error.message;
        thunkAPI.dispatch(
          setProfileStatusAction(PROFILE_REQUEST_STATUS.updateUserData.failed)
        );
        return thunkAPI.rejectWithValue(errorMessage);
      }
    } finally {
      thunkAPI.dispatch(setProfileLoadingAction(false));
    }
  }
);

/**
 * Updates current user validation key.
 */
export const updateUserKey = createAsyncThunk(
  'user/updateUserKey',
  async (userKey, thunkAPI) => {
    thunkAPI.dispatch(setProfileErrorAction(null));
    thunkAPI.dispatch(setProfileLoadingAction(true));
    thunkAPI.dispatch(
      setProfileStatusAction(PROFILE_REQUEST_STATUS.updateUserData.pending)
    );

    try {
      // Prepare request and handle possible rejection if current user is not valid.
      const prepareResult = await prepareRequestUser(thunkAPI);
      const { id: userId } = thunkAPI.getState().user;

      if (!prepareResult?.payload) {
        // Current user data are valid -> make request to backend for the key change
        // Use PUT request PATCH requests are blocked by server CORS policy, i.e.use put request
        await api.put(`users/${userId}`, { key: userKey });
      }

      thunkAPI.dispatch(
        setProfileStatusAction(PROFILE_REQUEST_STATUS.updateUserData.successful)
      );
      switchOffUserFormEdit();

      return thunkAPI.fulfillWithValue(userKey);
    } catch (error) {
      if (error.response?.status === 404) {
        const errorMessage =
          'User or its validation key not found. Unable to update user key.';
        thunkAPI.dispatch(setProfileErrorAction(errorMessage));
        thunkAPI.dispatch(
          setProfileStatusAction(PROFILE_REQUEST_STATUS.updateUserData.failed)
        );
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        const errorMessage =
          (error.response &&
            error.response.status + ' ' + error.response?.statusText) ||
          error.message;
        thunkAPI.dispatch(
          setProfileStatusAction(PROFILE_REQUEST_STATUS.updateUserData.failed)
        );
        return thunkAPI.rejectWithValue(errorMessage);
      }
    } finally {
      thunkAPI.dispatch(setProfileLoadingAction(false));
    }
  }
);

/**
 * Deletes current user.
 */
export const deleteCurrentUser = createAsyncThunk(
  'user/deleteUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setProfileLoadingAction(true));
    thunkAPI.dispatch(
      setProfileStatusAction(PROFILE_REQUEST_STATUS.deleteCurrentUser.pending)
    );

    try {
      await prepareRequestUser(thunkAPI);
      const { id: userId } = thunkAPI.getState().user;
      const response = await api.delete(`users/${userId}`);
      thunkAPI.dispatch(
        setProfileStatusAction(
          PROFILE_REQUEST_STATUS.deleteCurrentUser.successful
        )
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        const errorMessage = 'User not found. Unable to delete.';
        thunkAPI.dispatch(setProfileErrorAction(errorMessage));
        thunkAPI.dispatch(
          setProfileStatusAction(
            PROFILE_REQUEST_STATUS.deleteCurrentUser.failed
          )
        );
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        const errorMessage =
          (error.response &&
            error.response.status + ' ' + error.response.statusText) ||
          error.message;
        thunkAPI.dispatch(setProfileErrorAction(errorMessage));
        thunkAPI.dispatch(
          setProfileStatusAction(
            PROFILE_REQUEST_STATUS.deleteCurrentUser.failed
          )
        );

        return thunkAPI.rejectWithValue(errorMessage);
      }
    } finally {
      thunkAPI.dispatch(setProfileLoadingAction(false));
    }
  }
);

/**
 * Executes preparation for request by synchronizing storage and checking user data.
 * @param {object} thunkAPI The thunk API object provided by createAsyncThunk.
 * @throws {Error} Error in case of unsatisfactory data of failed request.
 */
export const prepareRequestUser = async thunkAPI => {
  try {
    // Rehydrate user data from persistent storage
    rehydrateUserData(thunkAPI);

    // Validate user credentials
    const isValidUser = await validateUserCredentials(thunkAPI.getState().user);

    // Check if user data is valid
    if (!isValidUser) {
      const errorMessage =
        'It looks like your user data is not valid or no longer valid and needs updating. You can try refreshing this page or you can update your user data with valid information in your user profile.';
      throw new Error(errorMessage);
    }
  } catch (error) {
    thunkAPI.dispatch(setProfileErrorAction(error.message));
    return thunkAPI.rejectWithValue(error.message);
  }
  return true;
};

/**
 * Validates if local user data is equal to server user data.
 * If user key on a server side is empty string (''), all local keys considered
 * as valid keys and acceptable as equal.
 * @throws {Error} Error with message if user did not pass validation.
 */
const validateUserCredentials = async user => {
  try {
    const response = await api.get(`/users/${user.id}`);
    if (
      response.data.uuid !== user.uuid ||
      (response.data.key.length > 0 && response.data.key !== user.key)
    ) {
      return false;
    }
    return true;
  } catch (error) {
    if (!error.response || !error.response.status) {
      throw error;
    }
    if (error.response && error.response.status === 404) {
      const errorMessage =
        "We couldn't find your user profile." +
        ' Please update your credentials in your user profile.';
      throw new Error(errorMessage);
    } else if (error.response.status === 500) {
      // Workaround MockApi 500 error response
      // when trying to access user and no users at /users endpoint
      // i.e. access to /users/{userId} when no resources at /users
      const errorMessage =
        "We couldn't find your user profile or another error occurred." +
        ' Please update your credentials in your user profile.' +
        " If this message continues to appear, try using the '" +
        REMOVE_ALL_DATA_BTN_TEXT +
        "' button in your profile to reset your user data and create a new profile.";
      throw new Error(errorMessage);
    } else {
      const errorMessage =
        (error.response &&
          error.response.status + ' ' + error.response.statusText) ||
        error.message;
      throw new Error(errorMessage);
    }
  }
};

/**
 * Manually synchronizes (rehydrates) user data in local storage with persistent data.
 * Happens when e.g. data in local storage were manually changed.
 */
export const rehydrateUserData = thunkAPI => {
  let localStorageUserData;
  try {
    const localStorageUserString = JSON.parse(
      localStorage.getItem(`persist:${rootPersistConfig.key}`)
    ).user;
    localStorageUserData = JSON.parse(localStorageUserString);
  } catch (error) {
    const errorMessage =
      'Uh-oh! We detected a potential issue with your locally saved data.' +
      " Please reset your user data by clicking the '" +
      REMOVE_ALL_DATA_BTN_TEXT +
      ' button in your profile.';
    throw new Error(errorMessage);
  }

  const persistentUserData = thunkAPI.getState().user;

  if (!isEqual(localStorageUserData, persistentUserData)) {
    thunkAPI.dispatch(rehydrateUserStateAction(localStorageUserData));
  }
};

/**
 * Makes profile user form not editable
 */
function switchOffUserFormEdit() {
  const form = document.getElementById('profile-user-data-form');

  const editAttribute = 'data-edited';
  form.removeAttribute(editAttribute);

  const userUuidEl = form.elements['user-uuid'];
  const userKeyEl = form.elements['user-key'];

  userUuidEl.setAttribute('disabled', '');
  userKeyEl.setAttribute('disabled', '');
}
