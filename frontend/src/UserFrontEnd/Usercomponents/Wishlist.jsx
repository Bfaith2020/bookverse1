import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { toggleWishlist } from "../redux/wishlistSlice"; // Import toggleWishlist action
import { addToCart, removeFromCart } from "../redux/cartSlice"; // Import cart actions

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items); // Access wishlist from Redux store
  const cart = useSelector((state) => state.cart.items); // Access cart from Redux store
  const dispatch = useDispatch(); // Redux dispatch

  const isBookInCart = (id) => cart.some((item) => item._id === id); // Check if book is in cart

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((book) => (
            <div
              key={book._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={book.image || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <div className="mt-4 space-y-2">
                <button
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => dispatch(toggleWishlist(book))} // Remove from wishlist
                >
                  Remove from Wishlist
                </button>
                {isBookInCart(book._id) ? (
                  <button
                    className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => dispatch(removeFromCart(book._id))} // Remove from cart
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                    onClick={() => dispatch(addToCart(book))} // Add to cart
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;