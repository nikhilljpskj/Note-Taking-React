// =============================================
// server.js — Main Entry Point for the Backend
// =============================================
// This file sets up the Express server, applies
// middleware, connects routes, and starts listening.

// Import required packages
const express = require('express');  // Express framework for building APIs
const cors = require('cors');        // CORS allows frontend to talk to backend

// Import our custom routes
const notesRoutes = require('./routes/notesRoutes');

// Create an Express application
const app = express();

// Define the port the server will run on
const PORT = 5000;

// ---- Middleware Setup ----
// Middleware are functions that run before your route handlers.
// They process incoming requests (like parsing JSON data).

// Enable CORS so the React frontend (port 3000) can call this API (port 5000)
app.use(cors());

// Parse incoming JSON data from request bodies
// Without this, req.body would be undefined when receiving JSON
app.use(express.json());

// ---- Routes Setup ----
// All requests starting with '/api/notes' will be handled by notesRoutes
app.use('/api/notes', notesRoutes);

// ---- Start the Server ----
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
