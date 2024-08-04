import { createSelector } from '@reduxjs/toolkit';
import { PROFILE_REQUEST_STATUS } from './slice';

/**
 * Selector for profile loading status.
 * @param {object} state Global app state.
 * @returns {func} Loading status selector.
 */
export const selectProfileLoading = state => state.profile.loading;

/**
 * Selector for profile error.
 * @param {object} state Global app state.
 * @returns {func} Error message selector.
 */
export const selectProfileError = state => state.profile.error;

/**
 * Selector for profile request status.
 * @param {object} state Global app state.
 * @returns {func} Request status selector.
 */
export const selectProfileStatus = state => state.profile.status;

/**
 * Selector to obtain profile being updating.
 * @param {object} state Global app state.
 * @returns {func} Profile is changing flag selector.
 */
export const selectIsProfileDataUpdateInProgress = createSelector(
  [selectProfileStatus],
  status => {
    return status && status === PROFILE_REQUEST_STATUS.updateUserData.pending;
  }
);

/**
 * Selector to obtain profile updated successfully.
 * @param {object} state Global app state.
 * @returns {func} Profile is successfully updated flag selector.
 */
export const selectIsProfileDataUpdateSuccessful = createSelector(
  [selectProfileStatus],
  status => {
    return (
      status && status === PROFILE_REQUEST_STATUS.updateUserData.successful
    );
  }
);

/**
 * Selector to obtain profile update failed.
 * @param {object} state Global app state.
 * @returns {func} Profile is failed to update flag selector.
 */
export const selectIsProfileDataUpdateFailed = createSelector(
  [selectProfileStatus],
  status => {
    return status && status === PROFILE_REQUEST_STATUS.updateUserData.failed;
  }
);

/**
 * Selector for profile user being deleting flag.
 * @param {object} state Global app state.
 * @returns {func} User being deleting flag selector.
 */
export const selectIsProfileUserDeleteInProgress = createSelector(
  [selectProfileStatus],
  status => {
    return (
      status && status === PROFILE_REQUEST_STATUS.deleteCurrentUser.pending
    );
  }
);

/**
 * Selector for profile user is deleted flag.
 * @param {object} state Global app state.
 * @returns {func} User is deleted flag selector.
 */
export const selectIsProfileUserDeleted = createSelector(
  [selectProfileStatus],
  status =>
    status && status === PROFILE_REQUEST_STATUS.deleteCurrentUser.successful
);
