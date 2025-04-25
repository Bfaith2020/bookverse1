import React from 'react';

const BookDetails = () => {
  return (
    <div>
      <h1>Book Title</h1>
      <img src="cover.jpg" alt="Book Cover" />
      <p>Author: John Doe</p>
      <p>Genre: Fiction</p>
      <p>Rating: 4.5/5</p>
      <p>Description: This is a great book...</p>
      <button>Add to Cart</button>
      <button>Read Now</button>

      {/* Related Books */}
      <section>
        <h2>Related Books</h2>
        <div>/* Add related book cards here */</div>
      </section>
    </div>
  );
};

export default BookDetails;