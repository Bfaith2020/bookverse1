import React, { useState } from "react";
import { User } from "react-feather"; // Ensure react-feather is installed

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* User Icon */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
      >
        <User className="w-6 h-6 text-gray-600" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Edit Personal Info
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              View Order History
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Wishlist
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Help Centre
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Deals
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}