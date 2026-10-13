// =============================================
// notesRoutes.js — API Route Definitions
// =============================================
// This file defines the URL paths (endpoints) for our API.
// Each route maps an HTTP method + URL to a controller function.
// Routes only define WHAT URLs exist — the actual logic is in the controller.

const express = require('express');

// Create a Router instance
// A Router lets us group related routes together
const router = express.Router();

// Import controller functions that contain the actual logic
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

// ---- Define Routes ----
// Each route uses an HTTP method (GET, POST, PUT, DELETE)
// to perform a specific action on notes.

// GET /api/notes — Fetch all notes from the database
router.get('/', getAllNotes);

// GET /api/notes/:id — Fetch a single note by its ID
// :id is a URL parameter (e.g., /api/notes/3 means id = 3)
router.get('/:id', getNoteById);

// POST /api/notes — Create a new note
// The note data (title, content) comes in the request body
router.post('/', createNote);

// PUT /api/notes/:id — Update an existing note
// :id tells us which note to update
router.put('/:id', updateNote);

// DELETE /api/notes/:id — Delete a note
// :id tells us which note to delete
router.delete('/:id', deleteNote);

// Export the router so server.js can use it
module.exports = router;
