import React, { useState } from "react";

export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-6 py-10 bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">Join Our Newsletter</h2>
      <p className="text-center text-gray-600 mb-6">
        Get updates, recommendations, and exclusive discounts!
      </p>
      {submitted ? (
        <p className="text-center text-pink-600 font-semibold bg-white py-4 rounded-xl">
          Thank you for subscribing!
        </p>
      ) : (
        <form
          className="flex justify-center gap-4 max-w-xl mx-auto bg-white p-4 rounded-xl shadow"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}