import { createSlice } from '@reduxjs/toolkit'

const aboutCenterSlice = createSlice({
  name: 'aboutCenterData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setAboutCenterData(state, action) {
      state.data = action.payload;
    },
    setAboutCenterIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setAboutCenterData, setAboutCenterIsLoading } = aboutCenterSlice.actions;
export default aboutCenterSlice.reducer;


