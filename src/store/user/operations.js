import { createAsyncThunk } from '@reduxjs/toolkit';
import isEqual from 'lodash.isequal';

import {
  setProfileErrorAction,
  setProfileLoadingAction,
} from 'store/profile/slice';

import api from 'services/api';

import { REMOVE_ALL_DATA_BTN_TEXT } from 'constants/buttonsTexts';
import { rootPersistConfig } from 'store/store';
import { rehydrateUserStateAction } from './slice';

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
      await validateCredentials({ id, uuid, key });
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
 * Deletes user with all its contacts and data.
 */
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, thunkAPI) => {
    // TODO: Add user deletion
  }
);

/**
 * Executes preparation for request by synchronizing and checking user data.
 * @param {payloadCreator} thunkAPI
 * @throws {Error} Error in case of unsatisfactory data of failed request.
 */
export const prepareRequestUser = async thunkAPI => {
  try {
    rehydrateUserData(thunkAPI);
    await validateCredentials(thunkAPI.getState().user);
  } catch (error) {
    thunkAPI.dispatch(setProfileErrorAction(error.message));
    return thunkAPI.rejectWithValue(error.message);
  }
};

/**
 * Validates if local user data is equal to server user data.
 * If user key on a server side is empty string (''), all local keys considered
 * as valid keys and acceptable as equal.
 * @throws {Error} Error with message if user did not pass validation.
 */
export const validateCredentials = async user => {
  try {
    const response = await api.get(`/users/${user.id}`);
    if (
      response.data.uuid !== user.uuid ||
      (response.data.key.length && response.data.key !== user.key)
    ) {
      const errorMessage =
        'Your user credentials are no longer valid. You can update them in your user profile.';
      const customError = new Error(errorMessage);
      throw customError;
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
