import { createSlice } from '@reduxjs/toolkit'

const cartItemsSlice = createSlice({
  name: 'cartItemsData',
  initialState: {
    data: []
  },

  reducers: {
    addCartData(state, action) {
      state.data.push(action.payload);
    }
  }
})

export const { addCartData } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;