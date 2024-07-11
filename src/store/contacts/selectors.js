import { createSelector } from '@reduxjs/toolkit';
import { requestStatus } from './slice';

/**
 * Selector to obtain contacts list.
 * @param {object} state Global app state.
 * @returns {func} Contacts list selector.
 */
export const selectContacts = state => state.contacts.items;

/**
 * Selector to obtain current state status.
 * @param {object} state Global app state.
 * @returns {func} Current app status selector.
 */
export const selectStatus = state => state.contacts.status;

/**
 * Selector to obtain contacts loading status.
 * @param {object} state Global app state.
 * @returns {func} Loading status selector.
 */
export const selectLoading = state => state.contacts.loading;

/**
 * Selector to obtain contacts error information.
 * @param {object} state Global app state.
 * @returns {func} Error message selector.
 */
export const selectError = state => state.contacts.error;

/**
 * Selector to obtain add contact form being loading flag.
 * @param {object} state Global app state.
 * @returns {func} Form being loading flag selector.
 */
export const selectIsFormLoading = createSelector(
  [selectLoading, selectStatus],
  (loading, status) => {
    return loading && status && status === requestStatus.addContact.pending;
  }
);

/**
 * Selector to obtain contact being deleting flag.
 * @param {object} state Global app state.
 * @returns {func} Form being loading flag selector.
 */
export const selectIsContactDeleteInProgress = createSelector(
  [selectLoading, selectStatus],
  (loading, status) => {
    return loading && status && status === requestStatus.deleteContact.pending;
  }
);

/**
 * Selector to obtain delete error flag.
 * @param {object} state Global app state.
 * @returns {func} Delete error flag selector.
 */
export const selectIsDeleteError = createSelector(
  [selectStatus, selectError],
  (status, isError) => {
    return isError && status && status === requestStatus.deleteContact.failed;
  }
);
