/**
 * Selector for the user id.
 * @param {object} state Global app state.
 * @returns {func} User id selector.
 */
export const selectUserId = state => state.user.id;

/**
 * Selector for the user uuid.
 * @param {object} state Global app state.
 * @returns {func} User uuid selector.
 */
export const selectUserUuid = state => state.user.uuid;

/**
 * Selector for the user key.
 * @param {object} state Global app state.
 * @returns {func} User key selector.
 */
export const selectUserKey = state => state.user.key;
