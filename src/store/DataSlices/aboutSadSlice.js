import { createSlice } from '@reduxjs/toolkit'

const aboutSadSlice = createSlice({
  name: 'aboutSadData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setAboutSadData(state, action) {
      state.data = action.payload;
    },
    setAboutSadIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setAboutSadData, setAboutSadIsLoading } = aboutSadSlice.actions;
export default aboutSadSlice.reducer;


