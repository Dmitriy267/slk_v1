import { createSlice } from '@reduxjs/toolkit'

const jobsSlice = createSlice({
  name: 'jobsData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setJobsData(state, action) {
      state.data = action.payload;
    },
    setJobsIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setJobsData, setJobsIsLoading } = jobsSlice.actions;
export default jobsSlice.reducer;


