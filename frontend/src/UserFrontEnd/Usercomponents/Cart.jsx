import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice"; // Import Redux actions

const Cart = () => {
  const cart = useSelector((state) => state.cart.items); // Access cart items from Redux state
  const dispatch = useDispatch(); // Redux dispatch
  const [clickedButtons, setClickedButtons] = useState({}); // Track clicked state for each button

  const handleRemoveFromCart = (bookId) => {
    dispatch(removeFromCart(bookId)); // Dispatch Redux action to remove item
    setClickedButtons((prevState) => ({
      ...prevState,
      [bookId]: true, // Mark the button as clicked
    }));
  };

  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cart.map((book) => (
            <div
              key={book._id}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition cursor-pointer relative"
            >
              <div className="h-48 bg-gray-100 rounded-lg mb-4">
                <img
                  src={book.image || "https://via.placeholder.com/150"}
                  alt={book.title}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-500 mb-4">{book.author}</p>
              <p className="text-gray-600 mb-2">
                <strong>Rating:</strong> {book.rating} / 5
              </p>
              <button
                className={`w-full py-2 text-gray-700 rounded-lg transition ${
                  clickedButtons[book._id] ? "bg-pink-200" : "bg-pink-300 hover:bg-pink-400"
                }`}
                onClick={() => handleRemoveFromCart(book._id)}
              >
                {clickedButtons[book._id] ? "Removed" : "Remove from Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cart;