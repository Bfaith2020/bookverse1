import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = ({ scrollToBooks }) => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-pink-100 via-white to-pink-100">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore a World of Books</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl">
        Discover your next great read, from bestsellers to hidden gems.
      </p>
      <div className="flex gap-4">
        {/* Navigate to /books */}

        <Link to="/userfrontend/searchresults?query=all">
          <button
            className="px-6 py-3 bg-pink-600 text-white rounded-xl text-lg hover:bg-pink-700 transition"
      
          >
            Browse Books
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;