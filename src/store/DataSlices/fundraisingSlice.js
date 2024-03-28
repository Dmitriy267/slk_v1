import { createSlice } from '@reduxjs/toolkit';

const fundraisingSlice = createSlice({
  name: 'fundraisingData',
  initialState: {
    data: [],
    isLoading: false
  },

  reducers: {
    setFundraisingData(state, action) {
      state.data = action.payload;
    },
    setFundraisingIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    addNewPaymentFundraisingData(state, action) {
      const newPayment = action.payload;
      state.data = state.data.map((item) =>
        item.id === newPayment.collection
          ? { ...item, supports: [...item.supports, newPayment] }
          : item
      );
    }
  }
});

export const { setFundraisingData, setFundraisingIsLoading, addNewPaymentFundraisingData } =
  fundraisingSlice.actions;
export default fundraisingSlice.reducer;
