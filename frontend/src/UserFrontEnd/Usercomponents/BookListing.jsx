import React from 'react';

const BookListing = () => {
  return (
    <div className="p-6 bg-white">
      {/* Filters */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>
        <div className="flex flex-wrap items-center gap-4">
          {/* Genre Filter */}
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Genre</label>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All</option>
              <option>Fiction</option>
              <option>Non-fiction</option>
              <option>Mystery</option>
              <option>Fantasy</option>
              <option>Thriller</option>
              <option>Biography</option>
              <option>Self-help</option>
              <option>History</option>
              <option>Children's</option>
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
    </div>
  );
};

export default BookListing;