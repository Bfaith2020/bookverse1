import React, { useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from React Router

const Navbar = ({ wishlist }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="text-2xl font-bold text-pink-600">Bookverse</div>
      <nav className="space-x-6 hidden md:flex">
        <a href="#" className="hover:text-pink-500">Home</a>
        <a href="#" className="hover:text-pink-500">Books</a>
        <a href="#" className="hover:text-pink-500">Categories</a>
        <a href="#" className="hover:text-pink-500">Contact</a>
      </nav>
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search books..."
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {/* Icons */}

        <Link to="/userfrontend/cart" >
        <FaShoppingCart className="cursor-pointer hover:text-pink-600" /></Link>
        <FaUserCircle
          className="cursor-pointer hover:text-pink-600"
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar */}
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
          <li className="hover:text-pink-500 cursor-pointer">Personal Info</li>
          <li className="hover:text-pink-500 cursor-pointer">Order History</li>
          <li className="hover:text-pink-500 cursor-pointer">
            <Link to="/wishlist" onClick={toggleSidebar}>
              Wishlist
            </Link>
          </li>
          <li className="hover:text-pink-500 cursor-pointer">Help Centre</li>
          <li className="hover:text-pink-500 cursor-pointer">Deals</li>
          <li className="hover:text-pink-500 cursor-pointer">Admin</li>
          <li className="hover:text-pink-500 cursor-pointer">Logout</li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
