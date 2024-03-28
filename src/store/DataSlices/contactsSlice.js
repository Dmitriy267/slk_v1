import { createSlice } from '@reduxjs/toolkit'

const contactsSlice = createSlice({
  name: 'contactsData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setContactsData(state, action) {
      state.data = action.payload;
    },
    setContactsIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setContactsData, setContactsIsLoading } = contactsSlice.actions;
export default contactsSlice.reducer;


