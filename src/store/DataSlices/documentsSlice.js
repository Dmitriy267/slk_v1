import { createSlice } from '@reduxjs/toolkit'

const documentsSlice = createSlice({
  name: 'documentsData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setDocuments(state, action) {
      state.data = action.payload;
    },
    setDocumentsIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setDocuments, setDocumentsIsLoading } = documentsSlice.actions;
export default documentsSlice.reducer;