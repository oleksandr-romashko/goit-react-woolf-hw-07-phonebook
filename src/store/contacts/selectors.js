/**
 * Selector to obtain contacts list from the app state.
 * @param {object} state Global app state. 
 * @returns {callback} Contacts list selector function.
 */
export const getContacts = state => state.contacts;
