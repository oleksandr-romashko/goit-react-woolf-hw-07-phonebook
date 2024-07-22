/**
 * Selector to obtain disclaimer modal show flag.
 * @param {object} state Global app state.
 * @returns {func} Disclaimer do not show flag selector.
 */
export const selectDoNotShowDisclaimerAgain = state =>
  state.application.doNotShowDisclaimer;
