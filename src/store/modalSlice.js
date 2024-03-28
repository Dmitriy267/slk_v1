import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalIsOpened: false
  },

  reducers: {
    openModal(state, action) {
      state.modalIsOpened = true;
    },
    closeModal(state, action) {
      state.modalIsOpened = false;
    }
  }
})

export const { openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;

