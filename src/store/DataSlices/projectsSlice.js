import { createSlice } from '@reduxjs/toolkit'

const projectsSlice = createSlice({
  name: 'projectsData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setProjectsData(state, action) {
      state.data = action.payload
    },
    setProjectsIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setProjectsData, setProjectsIsLoading } = projectsSlice.actions;
export default projectsSlice.reducer;
