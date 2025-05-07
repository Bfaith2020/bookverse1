import React, { useState, useEffect } from "react"; // Added missing useState and useEffect imports
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Added missing Navigate import
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import UserFrontEnd from './UserFrontEnd/UserFrontEnd'; // Adjusted the path to match the likely correct location
import Cart from './UserFrontEnd/Usercomponents/Cart'; // Adjusted the path to match the likely correct location
import { Provider } from "react-redux"; // Import Provider
import store from "./UserFrontEnd/redux/store"; // Import the Redux store
import SearchResults from './UserFrontEnd/Usercomponents/SearchResults'; // Adjusted the path to match the likely correct location
import Wishlist from "./UserFrontEnd/Usercomponents/Wishlist";
import { AuthProvide } from "./context/AuthContext"; // Corrected import
import Login from './UserFrontEnd/Usercomponents/Login'; // Import Login component


const App = () => {
  const [isAdmin, setIsAdmin] = useState(null); // State to track if the user is an admin
  useEffect(() => {
    const savedIsAdmin = localStorage.getItem("isAdmin");
    if (savedIsAdmin !== null) {
      setIsAdmin(JSON.parse(savedIsAdmin));
    }
  }, []);

  const handleAdminResponse = (response) => {
    setIsAdmin(response);
    localStorage.setItem("isAdmin", JSON.stringify(response)); // Save the response in local storage
  };

  if (isAdmin === null) {
    return (
      <Provider store={store}>
        <div style={{ textAlign: "center", marginTop: "20%" }}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Are you an admin?
          </p>
          <button
            onClick={() => {
              handleAdminResponse(true)
            }}
            style={{
              margin: "10px",
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              handleAdminResponse(false)
            }}
            style={{
              margin: "10px",
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </Provider>
    );
  }

  return (
    <AuthProvide>
      <Provider store={store}>
        <Routes>
          {isAdmin ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/books/create" element={<CreateBook />} />
              <Route path="/books/details/:id" element={<ShowBook />} />
              <Route path="/books/edit/:id" element={<EditBook />} />
              <Route path="/books/delete/:id" element={<DeleteBook />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/userfrontend/*" element={<UserFrontEnd />} />
              <Route path="/userfrontend/cart" element={<Cart />} />
              <Route path="/userfrontend/searchresults" element={<SearchResults />} />
              <Route path="/userfrontend/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} /> {/* Added Login route */}
              <Route path="*" element={<Navigate to="/userfrontend" />} />
            </>
          )}
        </Routes>
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            setIsAdmin(null);
          }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset Admin
        </button>
      </Provider>
    </AuthProvide>
  );
};

export default App;