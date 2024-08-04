import { createSelector } from '@reduxjs/toolkit';
import { CONTACTS_REQUEST_STATUS } from './slice';

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
export const selectContactsLoading = state => state.contacts.loading;

/**
 * Selector to obtain contacts error information.
 * @param {object} state Global app state.
 * @returns {func} Error message selector.
 */
export const selectError = state => state.contacts.error;

/**
 * Selector to obtain info details.
 * @param {object} state Global app state.
 * @returns {func} Info message selector.
 */
export const selectInfo = state => state.contacts.info;

/**
 * Selector to obtain add contact form being loading flag.
 * @param {object} state Global app state.
 * @returns {func} Form being loading flag selector.
 */
export const selectIsFormLoading = createSelector(
  [selectContactsLoading, selectStatus],
  (loading, status) => {
    return (
      loading && status && status === CONTACTS_REQUEST_STATUS.addContact.pending
    );
  }
);

/**
 * Selector to obtain contact being deleting flag.
 * @param {object} state Global app state.
 * @returns {func} Contact being deleting flag selector.
 */
export const selectIsContactDeleteInProgress = createSelector(
  [selectContactsLoading, selectStatus],
  (loading, status) => {
    return (
      loading &&
      status &&
      status === CONTACTS_REQUEST_STATUS.deleteContact.pending
    );
  }
);

/**
 * Selector to obtain delete contact error flag.
 * @param {object} state Global app state.
 * @returns {func} Delete error flag selector.
 */
export const selectIsDeleteError = createSelector(
  [selectStatus, selectError],
  (status, isError) => {
    return (
      isError &&
      status &&
      status === CONTACTS_REQUEST_STATUS.deleteContact.failed
    );
  }
);

/**
 * Selector to obtain all contacts being deleting flag.
 * @param {object} state Global app state.
 * @returns {func} All contacts being deleting flag selector.
 */
export const selectIsAllContactsDeleteInProgress = createSelector(
  [selectContactsLoading, selectStatus],
  (loading, status) => {
    return (
      loading &&
      status &&
      status === CONTACTS_REQUEST_STATUS.deleteAllContacts.pending
    );
  }
);

/**
 * Selector to obtain delete all contacts successful flag.
 * @param {object} state Global app state.
 * @returns {func} Delete error flag selector.
 */
export const selectIsDeleteAllContactsSuccessful = createSelector(
  [selectStatus],
  status => {
    return (
      status && status === CONTACTS_REQUEST_STATUS.deleteAllContacts.successful
    );
  }
);

/**
 * Selector to obtain delete all contacts error flag.
 * @param {object} state Global app state.
 * @returns {func} Delete error flag selector.
 */
export const selectIsDeleteAllContactsError = createSelector(
  [selectStatus, selectError],
  (status, isError) => {
    return (
      isError &&
      status &&
      status === CONTACTS_REQUEST_STATUS.deleteAllContacts.failed
    );
  }
);
