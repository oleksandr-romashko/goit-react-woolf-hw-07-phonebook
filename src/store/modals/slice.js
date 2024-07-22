import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDisclaimerModalOpen: true,
  isUserProfileModalOpen: false,
  dialogueBoxModal: {
    isDialogueBoxModalOpen: false,
    deleteId: null,
    deleteName: null,
  },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setIsDisclaimerModalOpenAction: (state, action) => {
      state.isDisclaimerModalOpen = action.payload;
    },
    setIsUserProfileModalOpenAction: (state, action) => {
      state.isUserProfileModalOpen = action.payload;
    },
    showDialogueBoxModalAction: (state, action) => {
      state.dialogueBoxModal = {
        isDialogueBoxModalOpen: true,
        deleteId: action.payload.deleteId,
        deleteName: action.payload.deleteName,
      };
    },
    closeDialogueBoxModalAction: state => {
      state.dialogueBoxModal = {
        isDialogueBoxModalOpen: false,
        deleteId: null,
        deleteName: null,
      };
    },
  },
});

export const {
  setIsDisclaimerModalOpenAction,
  setIsUserProfileModalOpenAction,
  showDialogueBoxModalAction,
  closeDialogueBoxModalAction,
} = modalsSlice.actions;

export default modalsSlice.reducer;
