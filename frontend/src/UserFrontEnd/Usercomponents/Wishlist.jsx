import React from "react";

const Wishlist = ({ wishlist }) => {
  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={book.coverImage || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
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