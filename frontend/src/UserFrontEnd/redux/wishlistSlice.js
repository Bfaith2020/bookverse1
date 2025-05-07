import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const book = action.payload;
      const exists = state.items.some((item) => item._id === book._id);
      if (exists) {
        state.items = state.items.filter((item) => item._id !== book._id);
      } else {
        state.items.push(book);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
