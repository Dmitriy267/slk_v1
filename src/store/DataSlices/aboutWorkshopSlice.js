import { createSlice } from '@reduxjs/toolkit'

const aboutWorkshopSlice = createSlice({
  name: 'aboutWorkshopData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setAboutWorkshopData(state, action) {
      state.data = action.payload;
    },
    setAboutWorkshopIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setAboutWorkshopData, setAboutWorkshopIsLoading } = aboutWorkshopSlice.actions;
export default aboutWorkshopSlice.reducer;


