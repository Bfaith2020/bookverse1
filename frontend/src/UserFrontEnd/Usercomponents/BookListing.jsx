import React from 'react';

const BookListing = () => {
  return (
    <div>
      {/* Filters */}
      <section>
        <h2>Filters</h2>
        <div>
          <label>Genre</label>
          <select>
            <option>All</option>
            <option>Fiction</option>
            <option>Non-fiction</option>
          </select>
        </div>
        <div>
          <label>Author</label>
          <input type="text" placeholder="Search author" />
        </div>
      </section>

      {/* Sorting */}
      <section>
        <h2>Sort By</h2>
        <select>
          <option>Popularity</option>
          <option>Newest</option>
          <option>Price</option>
        </select>
      </section>

      {/* Book List */}
      <section>
        <h2>Books</h2>
        <div>/* Add book cards here */</div>
      </section>

      {/* Pagination */}
      <section>
        <button>Previous</button>
        <button>Next</button>
      </section>
    </div>
  );
};

export default BookListing;