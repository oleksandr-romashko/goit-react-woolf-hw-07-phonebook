/**
 * Selector to obtain disclaimer modal open state flag.
 * @param {object} state Global app state.
 * @returns {func} Disclaimer modal open flag selector.
 */
export const selectIsDisclaimerModalOpen = state =>
  state.modals.isDisclaimerModalOpen;
