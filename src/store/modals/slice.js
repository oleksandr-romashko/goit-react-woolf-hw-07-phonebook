import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDisclaimerModalOpen: true,
  isUserProfileModalOpen: false,
  dialogueBoxModal: {
    isDialogueBoxModalOpen: false,
    deleteId: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setIsDisclaimerModalOpen: (state, action) => {
      state.isDisclaimerModalOpen = action.payload;
    },
    setIsUserProfileModalOpen: (state, action) => {
      state.isUserProfileModalOpen = action.payload;
    },
    showDialogueBoxModal: (state, action) => {
      state.dialogueBoxModal = {
        isDialogueBoxModalOpen: true,
        deleteId: action.payload,
      };
    },
    closeDialogueBoxModal: state => {
      state.dialogueBoxModal = {
        isDialogueBoxModalOpen: false,
        deleteId: null,
      };
    },
  },
});

export const {
  setIsDisclaimerModalOpen,
  setIsUserProfileModalOpen,
  showDialogueBoxModal,
  closeDialogueBoxModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
