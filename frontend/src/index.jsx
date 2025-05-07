import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { WishlistProvider } from "./UserFrontEnd/context/WishlistContext"; // Import WishlistProvider

ReactDOM.render(
  <WishlistProvider>
    <App />
  </WishlistProvider>,
  document.getElementById("root")
);
