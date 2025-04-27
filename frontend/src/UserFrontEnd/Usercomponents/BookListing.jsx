import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';

const BookListing = forwardRef((props, ref) => {
  const [books, setBooks] = useState([]); // Original book list
  const [filteredBooks, setFilteredBooks] = useState([]); // Books to display
  const [selectedGenre, setSelectedGenre] = useState('All'); // Selected genre

  useEffect(() => {
    axios
      .get('http://localhost:5555/books') // Ensure this matches your backend URL
      .then((response) => {
        setBooks(response.data.data); // Set the original book list
        setFilteredBooks(response.data.data); // Initially display all books
      })
      .catch((error) => console.error(error));
  }, []);

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    if (genre === 'All') {
      setFilteredBooks(books); // Show all books if "All" is selected
    } else {
      setFilteredBooks(books.filter((book) => book.genre === genre)); // Filter by genre
    }
  };

  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredBooks(books); // Reset filteredBooks when books change
    } else {
      setFilteredBooks(books.filter((book) => book.genre === selectedGenre)); // Reapply filter
    }
  }, [books, selectedGenre]); // Run this effect when books or selectedGenre changes

  return (
    <div ref={ref} className="p-6 bg-white">
      {/* Filters */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="flex flex-wrap items-center gap-4">
          {/* Genre Filter */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Genre</label>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={selectedGenre} // Bind the selected genre state
              onChange={handleGenreChange} // Update the genre filter on change
            >
              <option value="All">All</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Thriller">Thriller</option>
              <option value="Biography">Biography</option>
              <option value="Self-help">Self-help</option>
              <option value="History">History</option>
              <option value="Children's">Children's</option>
            </select>
          </div>

          {/* Author Filter */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              placeholder="Search author"
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Popular Filter */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Popular</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All</option>
              <option>Most Popular</option>
              <option>Least Popular</option>
            </select>
          </div>

          {/* Best Selling Filter */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Best Selling</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All</option>
              <option>Top Sellers</option>
              <option>Recent Best Sellers</option>
              <option>Classic Best Sellers</option>
              <option>New Arrivals</option>
              <option>Discounted</option>
              <option>Limited Editions</option>
            </select>
          </div>
        </div>
      </section>

      {/* Sort By */}
      <section className="mb-8">
        <div className="flex flex-wrap items-center gap-4">
          {/* Sort A-Z */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Sort A-Z</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>A-Z</option>
              <option>Z-A</option>
            </select>
          </div>

          {/* Sort by Price */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Sort by Price</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>

          {/* Sort by Newest */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Sort by Newest</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>
      </section>

      {/* Book List */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="border rounded-lg p-4 shadow">
              <img
                src={book.image || 'https://via.placeholder.com/150'} // Apply fallback image dynamically
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-500">{book.genre}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.slice(0, 4).map((book) => (
            <div key={book._id} className="border rounded-lg p-4 shadow">
              <img
                src={book.image || 'https://via.placeholder.com/150'} // Apply fallback image dynamically
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-500">{book.genre}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

export default BookListing;