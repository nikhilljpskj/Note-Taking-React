// =============================================
// notesRoutes.js — API Route Definitions
// =============================================
// This file defines the URL paths (endpoints) for our notes API.
// Note the order: specific routes like '/archived' must come BEFORE
// dynamic routes like '/:id' so Express doesn't treat 'archived' as an id!

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getAllNotes,
  getArchivedNotes,
  getNoteById,
  createNote,
  updateNote,
  archiveNote,
  restoreNote,
  deleteNote,
} = require('../controllers/notesController');

// ---- Define Routes ----

// GET /api/notes — Fetch all active (non-archived) notes (supports ?category_id= and ?q=)
router.get('/', getAllNotes);

// GET /api/notes/archived — Fetch all archived notes
// IMPORTANT: Defined before /:id so 'archived' is not treated as a dynamic parameter
router.get('/archived', getArchivedNotes);

// GET /api/notes/:id — Fetch a single note by its ID
router.get('/:id', getNoteById);

// POST /api/notes — Create a new note
router.post('/', createNote);

// PUT /api/notes/:id — Update an existing note
router.put('/:id', updateNote);

// PATCH /api/notes/:id/archive — Archive a note (sets is_archived = 1)
router.patch('/:id/archive', archiveNote);

// PATCH /api/notes/:id/restore — Restore an archived note (sets is_archived = 0)
router.patch('/:id/restore', restoreNote);

// DELETE /api/notes/:id — Permanently delete a note
router.delete('/:id', deleteNote);

module.exports = router;
