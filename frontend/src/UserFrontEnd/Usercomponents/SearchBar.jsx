import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/userfrontend/searchresults?query=${encodeURIComponent(query)}`);
      setQuery(""); // Clear the search bar
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
        className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-pink-600 text-white px-4 py-2 rounded-r hover:bg-pink-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
