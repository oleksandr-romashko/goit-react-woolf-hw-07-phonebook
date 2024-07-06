/**
 * Selector to obtain contacts list from the app state.
 * @param {object} state Global app state.
 * @returns {callback} Contacts list selector function.
 */
export const getContacts = state => state.contacts.items;

/**
 * Selector to obtain contacts loading status from the app state.
 * @param {object} state Global app state.
 * @returns {callback} Loading status selector function.
 */
export const getIsLoading = state => state.contacts.isLoading;

/**
 * Selector to obtain error info from the app state.
 * @param {object} state Global app state.
 * @returns {callback} Error selector function.
 */
export const getError = state => state.contacts.error;
