import { createSlice } from '@reduxjs/toolkit'

const edSiteSlice = createSlice({
  name: 'edSiteData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setEdSiteData(state, action) {
      state.data = action.payload;
    },
    setEdSiteDataIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setEdSiteData, setEdSiteDataIsLoading } = edSiteSlice.actions;
export default edSiteSlice.reducer;


