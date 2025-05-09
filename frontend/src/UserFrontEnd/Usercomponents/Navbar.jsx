import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(""); // State for avatar URL
  const [showInfo, setShowInfo] = useState(false); // State to toggle user info
  const { currentUser, logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };



  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="text-2xl font-bold text-pink-600">Bookverse</div>
      <SearchBar />
      <nav className="space-x-6 hidden md:flex">
        <a href="#" className="hover:text-pink-500">Home</a>
        <a href="#" className="hover:text-pink-500">Books</a>
        <a href="#" className="hover:text-pink-500">Categories</a>
        <a href="#" className="hover:text-pink-500">Contact</a>
      </nav>
      <div className="flex items-center gap-4 relative">
        <Link to="/userfrontend/cart">
          <FaShoppingCart className="cursor-pointer hover:text-pink-600" />
        </Link>
        {!currentUser && (
          <Link to="/login">
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-500">
              Login
            </button>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
        >
          <FaUserCircle className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-48 bg-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={toggleSidebar}
        >
          Close
        </button>
        <ul className="mt-16 space-y-4 px-6 text-gray-700">
          <li
            className="hover:text-pink-500 cursor-pointer"
            onClick={() => setShowInfo((prev) => !prev)} // Toggle user info
          >
            Personal Info
            {showInfo && currentUser && (
              <div className="mt-2 p-4 bg-gray-100 rounded-lg shadow-lg">
                <p className="text-sm font-bold">Email: {currentUser.email}</p>
                <p className="text-sm">UID: {currentUser.uid}</p>
              </div>
            )}
          </li>
          <li className="hover:text-pink-500 cursor-pointer">Order History</li>
          <li className="hover:text-pink-500 cursor-pointer">
            <Link to="/userfrontend/wishlist">Wishlist</Link>
          </li>
          <li className="hover:text-pink-500 cursor-pointer">Help Centre</li>
          <li className="hover:text-pink-500 cursor-pointer">Deals</li>
          {currentUser && (
            <li
              className="hover:text-pink-500 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
