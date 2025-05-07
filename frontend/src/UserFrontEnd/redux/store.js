import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice"; // Import wishlistSlice

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // Add wishlist reducer
  },
});

export default store;
