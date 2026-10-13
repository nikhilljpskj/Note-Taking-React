// =============================================
// index.js — React Entry Point
// =============================================
// This is the very first JavaScript file that runs.
// It renders the App component into the HTML page.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Get the 'root' div from index.html and render our App inside it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
