import React, { useState } from 'react';
import Navbar from './Usercomponents/Navbar';
import HeroSection from './Usercomponents/HeroSection';
import FeaturedBooks from './Usercomponents/FeaturedBooks';
import NewsletterSignup from './Usercomponents/NewsletterSignup';
import Footer from './Usercomponents/Footer';
import { Routes, Route } from 'react-router-dom';
import SearchResults from './Usercomponents/SearchResults';

const UserFrontEnd = () => {
  const [featuredBooks, setFeaturedBooks] = useState([
    { id: 1, title: "Book 1" },
    { id: 2, title: "Book 2" },
    { id: 3, title: "Book 3" },
  ]); // Mock featured books

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/userfrontend/searchresults"
          element={<SearchResults books={featuredBooks} />}
        />
      </Routes>
      <HeroSection />
      <FeaturedBooks books={featuredBooks} />
      <NewsletterSignup />
      <Footer />
    </>
  );
};

export default UserFrontEnd;