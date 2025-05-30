import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Modal from "react-modal";
import reportWebVitals from "./reportWebVitals";

Modal.setAppElement("#root");
const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
