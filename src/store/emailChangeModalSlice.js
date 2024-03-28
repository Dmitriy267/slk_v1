import { createSlice } from '@reduxjs/toolkit'

const emailChangeModalSlice = createSlice({
  name: 'emailChangeModal',
  initialState: {
    EmailChangeModalIsOpened: false,
    email: ''
  },

  reducers: {
    openEmailChangeModal(state, action) {
      state.EmailChangeModalIsOpened = true;
    },
    closeEmailChangeModal(state, action) {
      state.EmailChangeModalIsOpened = false;
    },
    setEmailChange(state, action) {
      state.email = action.payload;
    },
  }
})

export const { openEmailChangeModal, closeEmailChangeModal, setEmailChange } = emailChangeModalSlice.actions;
export default emailChangeModalSlice.reducer;

