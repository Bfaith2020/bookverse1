import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../context/AuthContext";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(""); // State for avatar URL
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      navigate("/userfrontend"); // Redirect to userfrontend after logout
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  useEffect(() => {
    // Generate a random avatar URL
    const randomAvatar = `https://i.pravatar.cc/150?img=${Math.floor(
      Math.random() * 70 + 1 // Ensure valid range for avatar images
    )}`;
    setAvatarUrl(randomAvatar);
  }, []); // Run only once when the component mounts

  return (
    <div className="relative">
      {/* User Icon */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
      >
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-6 h-6 rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            >
              Personal Info
              {showInfo && currentUser && (
                <div className="absolute left-full top-0 ml-2 w-64 bg-gray-100 p-4 rounded-lg shadow-lg">
                  <p className="text-sm font-bold">Email: {currentUser.email}</p>
                  <p className="text-sm">UID: {currentUser.uid}</p>
                </div>
              )}
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              View Order History
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link to="/userfrontend/wishlist">Wishlist</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Help Centre
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Deals
            </li>
            {currentUser && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}