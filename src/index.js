import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Modal from "react-modal";
import reportWebVitals from "./reportWebVitals";

<<<<<<< HEAD
// Set the app element for react-modal
Modal.setAppElement("#root");

// Get the root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals
=======

Modal.setAppElement("#root");
const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
      <App  />
  </React.StrictMode>
);

>>>>>>> e814dd919dcb57d43fbbad08a9b7e57c15b53b1d
reportWebVitals();
