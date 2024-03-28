import { createSlice } from '@reduxjs/toolkit'

const specialistsPageSlice = createSlice({
  name: 'specialistsPageData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setSpecialistsPageData(state, action) {
      state.data = action.payload
    },
    setSpecialistsPageIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setSpecialistsPageData, setSpecialistsPageIsLoading } = specialistsPageSlice.actions;
export default specialistsPageSlice.reducer;
