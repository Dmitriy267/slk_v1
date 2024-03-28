import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
  name: 'newsData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setNewsData(state, action) {
      state.data = action.payload;
    },
    setNewsIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setNewsData, setNewsIsLoading } = newsSlice.actions;
export default newsSlice.reducer;


