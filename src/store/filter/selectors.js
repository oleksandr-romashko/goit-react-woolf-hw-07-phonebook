/**
 * Selector to obtain filter value from the app state.
 * @param {object} state Global app state. 
 * @returns {callback} Filter selector function.
 */
export const getFilter = state => state.filter;
