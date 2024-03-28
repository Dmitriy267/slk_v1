import { createSlice } from '@reduxjs/toolkit'

const centerSlice = createSlice({
  name: 'centerData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setData, setIsLoading } = centerSlice.actions;
export default centerSlice.reducer;


