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