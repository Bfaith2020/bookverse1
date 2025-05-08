import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import UserFrontEnd from './UserFrontEnd/UserFrontEnd';
import Cart from './UserFrontEnd/Usercomponents/Cart';
import { Provider } from "react-redux";
import store from "./UserFrontEnd/redux/store";
import SearchResults from './UserFrontEnd/Usercomponents/SearchResults';
import Wishlist from "./UserFrontEnd/Usercomponents/Wishlist";
import { AuthProvide, useAuth } from "./context/AuthContext";
import Login from './UserFrontEnd/Usercomponents/Login';

const AppContent = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
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
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/userfrontend/*" element={<UserFrontEnd />} />
            <Route path="/userfrontend/cart" element={<Cart />} />
            <Route path="/userfrontend/searchresults" element={<SearchResults />} />
            <Route path="/userfrontend/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/userfrontend" />} />
          </>
        )}
      </Routes>
    </Provider>
  );
};

const App = () => {
  return (
    <AuthProvide>
      <AppContent />
    </AuthProvide>
  );
};

export default App;