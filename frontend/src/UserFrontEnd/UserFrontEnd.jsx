import React from 'react';
import Navbar from './Usercomponents/Navbar';
import HeroSection from './Usercomponents/HeroSection';
import FeaturedBooks from './Usercomponents/FeaturedBooks';
import NewsletterSignup from './Usercomponents/NewsletterSignup';
import Footer from './Usercomponents/Footer';
import BookListing from './Usercomponents/BookListing';

const UserFrontEnd = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BookListing />
      <FeaturedBooks />
      <NewsletterSignup />
      <Footer />
    </>
  );
};

export default UserFrontEnd;