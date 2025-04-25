import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import UserFrontEnd from './UserFrontEnd/UserFrontEnd'; // Adjusted the path to match the likely correct location
import Cart from './UserFrontEnd/Usercomponents/Cart'; // Adjusted the path to match the likely correct location
import { Provider } from "react-redux"; // Import Provider
import store from "./UserFrontEnd/redux/store"; // Import the Redux store

const App = () => {
  const [isAdmin, setIsAdmin] = useState(null); // State to track if the user is an admin
  const navigate = useNavigate(); // Hook to programmatically navigate

  if (isAdmin === null) {
    return (
      <Provider store={store}>
        <div style={{ textAlign: "center", marginTop: "20%" }}>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Are you an admin?
          </p>
          <button
            onClick={() => {
              setIsAdmin(true);
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
              setIsAdmin(false);
              navigate("/userfrontend"); // Navigate to the user frontend path
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
    <Provider store={store}>
      <Routes>
        {isAdmin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/books/create" element={<CreateBook />} />
            <Route path="/books/details/:id" element={<ShowBook />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/books/delete/:id" element={<DeleteBook />} />
          </>
        ) : (
          <>
            <Route path="/userfrontend" element={<UserFrontEnd />} />
            <Route path="/userfrontend/cart" element={<Cart />} />
          </>
        )}
      </Routes>
    </Provider>
  );
};

export default App;