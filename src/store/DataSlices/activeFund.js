import { createSlice } from '@reduxjs/toolkit'

const activeFundSlice = createSlice({
  name: 'activeFund',
  initialState: {
    id: 11 // id нецелевого сбора
  },

  reducers: {
    setActiveFund(state, action) {
      state.id = action.payload;
    },
  }
})

export const { setActiveFund } = activeFundSlice.actions;
export default activeFundSlice.reducer;
