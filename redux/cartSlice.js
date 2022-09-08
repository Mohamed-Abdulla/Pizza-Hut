import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    //cart quantity not product quantity
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload); //passing pizza details to the cart.
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, action) => {
      state.quantity -= 1;
      const deletedItem = state.products[action.payload];
      state.total -= deletedItem.price * deletedItem.quantity;
      state.products.splice(action.payload, 1);
    },
    reset: (state) => {
      //after payment, reset the cart.
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
