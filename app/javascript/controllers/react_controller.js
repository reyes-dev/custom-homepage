import { Controller } from "@hotwired/stimulus";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../components/App";
import WebLinks from "../components/WebLinks";

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    console.log("Controller Connected.");
    const app = document.getElementById("app");
    createRoot(app).render(<App />);
  }
}
