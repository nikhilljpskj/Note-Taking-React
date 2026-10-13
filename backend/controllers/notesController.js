// =============================================
// notesController.js — CRUD Logic for Notes
// =============================================
// This file contains the actual logic for each API endpoint.
// Controllers receive the request (req), process it, and send
// back a response (res). Each function handles one CRUD operation.

// Import the database connection pool
const db = require('../config/db');

// ---- GET ALL NOTES ----
// Fetches every note from the database, newest first
const getAllNotes = async (req, res) => {
  try {
    // Execute SQL query to get all notes, ordered by newest first
    const [rows] = await db.query('SELECT * FROM notes ORDER BY created_at DESC');

    // Send the notes back as JSON with status 200 (OK)
    res.status(200).json(rows);
  } catch (error) {
    // If something goes wrong, log the error and send a 500 status
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// ---- GET NOTE BY ID ----
// Fetches a single note using its unique ID
const getNoteById = async (req, res) => {
  try {
    // Get the id from the URL parameter (e.g., /api/notes/3 → id = 3)
    const { id } = req.params;

    // Use a parameterized query (?) to prevent SQL injection attacks
    const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [id]);

    // If no note was found with that ID, return 404 (Not Found)
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Send the found note (first item in the array)
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Failed to fetch note' });
  }
};

// ---- CREATE NOTE ----
// Creates a new note with a title and content
const createNote = async (req, res) => {
  try {
    // Extract title and content from the request body
    const { title, content } = req.body;

    // Validate that both fields are provided
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Insert the new note into the database
    const [result] = await db.query(
      'INSERT INTO notes (title, content) VALUES (?, ?)',
      [title, content]
    );

    // Send back the created note with status 201 (Created)
    res.status(201).json({
      id: result.insertId,
      title,
      content,
      message: 'Note created successfully',
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// ---- UPDATE NOTE ----
// Updates an existing note's title and content
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Validate that both fields are provided
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Update the note in the database where the id matches
    const [result] = await db.query(
      'UPDATE notes SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );

    // If no rows were affected, the note doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Failed to update note' });
  }
};

// ---- DELETE NOTE ----
// Deletes a note by its ID
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the note from the database
    const [result] = await db.query('DELETE FROM notes WHERE id = ?', [id]);

    // If no rows were affected, the note doesn't exist
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Send success response
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Failed to delete note' });
  }
};

// Export all controller functions so routes can use them
module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
