import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'productData',
  initialState: {
    data: {},
    isLoading: false
  },

  reducers: {
    setProductsData(state, action) {
      state.data = action.payload;
    },
    setProductsIsLoading(state, action) {
      state.isLoading = action.payload;
    }
  }
});

export const { setProductsData, setProductsIsLoading } = productsSlice.actions;
export default productsSlice.reducer;
