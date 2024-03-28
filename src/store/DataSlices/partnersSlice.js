import { createSlice } from '@reduxjs/toolkit'

const partnersSlice = createSlice({
  name: 'partnersData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setPartnersData(state, action) {
      state.data = action.payload;
    },
    setPartnersIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setPartnersData, setPartnersIsLoading } = partnersSlice.actions;
export default partnersSlice.reducer;


