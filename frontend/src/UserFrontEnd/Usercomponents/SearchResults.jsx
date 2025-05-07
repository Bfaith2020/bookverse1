import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Heart } from "react-feather"; // Ensure react-feather is installed

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.trim().toLowerCase() || ""; // Trim and ensure lowercase

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]); // State for favorites
  const [selectedBook, setSelectedBook] = useState(null); // State for selected book

  useEffect(() => {
    if (query) {
      setLoading(true);
      const endpoint =
        query === "all"
          ? "http://localhost:5555/books" // Fetch all books
          : `http://localhost:5555/books?search=${encodeURIComponent(query)}`; // Fetch matching books
      axios
        .get(endpoint)
        .then((response) => {
          setSearchResults(response.data.data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    }
  }, [query]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book for the modal
  };

  const closeModal = () => {
    setSelectedBook(null); // Close the modal
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchResults.map((book) => (
            <div
              key={book._id}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition cursor-pointer relative"
              onClick={() => handleBookClick(book)} // Open modal on click
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
                <strong>Price:</strong> R{book.price.toFixed(2)}
              </p>
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
      ) : (
        <p>No results found. Please try searching by title, author, or ISBN.</p>
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
              <strong>Price:</strong> R{selectedBook.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Description:</strong> {selectedBook.description}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;