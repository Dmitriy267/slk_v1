import { createSlice } from '@reduxjs/toolkit'

const aboutSchoolSlice = createSlice({
  name: 'aboutSchoolData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setAboutSchoolData(state, action) {
      state.data = action.payload;
    },
    setAboutSchoolIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setAboutSchoolData, setAboutSchoolIsLoading } = aboutSchoolSlice.actions;
export default aboutSchoolSlice.reducer;


