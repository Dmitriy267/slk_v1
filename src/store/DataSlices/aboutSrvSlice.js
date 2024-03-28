import { createSlice } from '@reduxjs/toolkit'

const aboutSrvSlice = createSlice({
  name: 'aboutSrvData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setAboutSrvData(state, action) {
      state.data = action.payload;
    },
    setAboutSrvIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setAboutSrvData, setAboutSrvIsLoading } = aboutSrvSlice.actions;
export default aboutSrvSlice.reducer;


