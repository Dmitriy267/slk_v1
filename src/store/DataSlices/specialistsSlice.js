import { createSlice } from '@reduxjs/toolkit'

const specialistsSlice = createSlice({
  name: 'specialistsData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setSpecialistsData(state, action) {
      state.data.ceo = action.payload.filter(item => item.position === "Директор АНОО «Солнечный круг»");
      state.data.others = action.payload.filter(item => item.position !== "Директор АНОО «Солнечный круг»");
    },
    setSpecialistsIsLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const { setSpecialistsData, setSpecialistsIsLoading } = specialistsSlice.actions;
export default specialistsSlice.reducer;


