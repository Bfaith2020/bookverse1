import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart } from "react-feather"; // Ensure you have react-feather installed
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { addToCart, removeFromCart } from "../redux/cartSlice"; // Corrected path

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]); // State for favorites
  const cart = useSelector((state) => state.cart.items); // Access cart state
  const dispatch = useDispatch(); // Redux dispatch

  // Random reviews and ratings generator
  const generateRandomReviews = () => {
    const reviewsPool = [
      { name: "Alice", comment: "A fantastic read!", stars: 5 },
      { name: "Bob", comment: "Enjoyed it, but could be better.", stars: 4 },
      { name: "Charlie", comment: "Not my cup of tea.", stars: 2 },
      { name: "Diana", comment: "Absolutely loved it!", stars: 5 },
      { name: "Eve", comment: "A decent book for the weekend.", stars: 3 },
      { name: "Frank", comment: "Highly recommended!", stars: 5 },
      { name: "Grace", comment: "The story was captivating.", stars: 4 },
      { name: "Hank", comment: "Too slow for my taste.", stars: 2 },
    ];

    // Randomly select 4 reviews
    const selectedReviews = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * reviewsPool.length);
      selectedReviews.push(reviewsPool[randomIndex]);
    }

    // Calculate average rating
    const averageRating =
      selectedReviews.reduce((sum, review) => sum + review.stars, 0) /
      selectedReviews.length;

    return { reviews: selectedReviews, rating: averageRating.toFixed(1) };
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books") // Ensure this matches the backend's URL
      .then((response) => {
        const booksWithReviews = response.data.data.map((book) => {
          const { reviews, rating } = generateRandomReviews();
          return { ...book, reviews, rating };
        });
        setBooks(booksWithReviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  // Toggle favorite functionality
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const isBookInCart = (id) => cart.some((item) => item._id === id); // Check if book is in cart

  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Books</h2>
      {loading ? (
        <p className="text-center">Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition cursor-pointer relative"
              onClick={() => handleBookClick(book)}
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
              {isBookInCart(book._id) ? (
                <button
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the modal
                    dispatch(removeFromCart(book._id));
                  }}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the modal
                    dispatch(addToCart(book));
                  }}
                >
                  Add to Cart
                </button>
              )}
              <Heart
                className={`absolute top-4 right-4 cursor-pointer transition ${
                  favorites.includes(book._id)
                    ? "text-pink-600 fill-pink-600"
                    : "text-gray-400"
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the modal
                  toggleFavorite(book._id);
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal for Book Details */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedBook.title}</h3>
            <p className="text-gray-600 mb-2">
              <strong>Author:</strong> {selectedBook.author}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Rating:</strong> {selectedBook.rating || "No rating available"}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Reviews:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600">
              {selectedBook.reviews && selectedBook.reviews.length > 0 ? (
                selectedBook.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.name}:</strong> {review.comment} -{" "}
                    <span className="text-yellow-500">{"★".repeat(review.stars)}</span>
                  </li>
                ))
              ) : (
                <li>No reviews available</li>
              )}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}