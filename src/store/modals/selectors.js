/**
 * Selector for disclaimer modal open state flag.
 * @param {object} state Global app state.
 * @returns {func} Disclaimer modal open flag selector.
 */
export const selectIsDisclaimerModalOpen = state =>
  state.modals.isDisclaimerModalOpen;

/**
 * Selector for user profile modal open state flag.
 * @param {object} state Global app state.
 * @returns {func} User profile modal open flag selector.
 */
export const selectIsUserProfileModalOpen = state =>
  state.modals.isUserProfileModalOpen;

/**
 * Selector for dialogue box.
 * @param {object} state Global app state.
 * @returns {func} Dialogue box selector.
 */
export const selectDialogueBoxModal = state => state.modals.dialogueBoxModal;
