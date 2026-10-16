// =============================================
// notesController.js — CRUD Logic for Notes
// =============================================
// This file contains the controller logic for each note endpoint.
// It demonstrates:
// - Relational queries with LEFT JOIN (linking notes with categories)
// - Dynamic query filtering (?category_id=... and ?q=search)
// - Status updates with PATCH (archiving and restoring)
// - Parameterized SQL statements to prevent SQL injection

const db = require('../config/db');

// ---- GET ALL ACTIVE NOTES ----
// Fetches active (unarchived) notes, joined with their category details
// Supports optional query filters: ?category_id=1 and ?q=search_text
const getAllNotes = async (req, res) => {
  try {
    const { category_id, q } = req.query;

    // Base SQL query joining notes with categories
    let sql = `
      SELECT 
        n.id, 
        n.title, 
        n.content, 
        n.category_id, 
        n.is_archived,
        n.created_at,
        c.name AS category_name,
        c.color AS category_color
      FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE n.is_archived = 0
    `;
    const params = [];

    // Filter by category if user selected one
    if (category_id) {
      sql += ' AND n.category_id = ?';
      params.push(category_id);
    }

    // Search filter: matching title or content
    if (q && q.trim() !== '') {
      sql += ' AND (n.title LIKE ? OR n.content LIKE ?)';
      params.push(`%${q.trim()}%`, `%${q.trim()}%`);
    }

    sql += ' ORDER BY n.created_at DESC';

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// ---- GET ARCHIVED NOTES ----
// Fetches all notes that have been archived (is_archived = 1)
const getArchivedNotes = async (req, res) => {
  try {
    const sql = `
      SELECT 
        n.id, 
        n.title, 
        n.content, 
        n.category_id, 
        n.is_archived,
        n.created_at,
        c.name AS category_name,
        c.color AS category_color
      FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE n.is_archived = 1
      ORDER BY n.created_at DESC
    `;

    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching archived notes:', error);
    res.status(500).json({ message: 'Failed to fetch archived notes' });
  }
};

// ---- GET NOTE BY ID ----
// Fetches a single note with its category info
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT 
        n.id, 
        n.title, 
        n.content, 
        n.category_id, 
        n.is_archived,
        n.created_at,
        c.name AS category_name,
        c.color AS category_color
      FROM notes n
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE n.id = ?
    `;

    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ message: 'Failed to fetch note' });
  }
};

// ---- CREATE NOTE ----
// Inserts a new note with optional category_id
const createNote = async (req, res) => {
  try {
    const { title, content, category_id } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // If category_id is empty string or undefined, save as NULL
    const noteCategoryId = category_id ? parseInt(category_id, 10) : null;

    const [result] = await db.query(
      'INSERT INTO notes (title, content, category_id, is_archived) VALUES (?, ?, ?, 0)',
      [title, content, noteCategoryId]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      content,
      category_id: noteCategoryId,
      is_archived: 0,
      message: 'Note created successfully',
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// ---- UPDATE NOTE ----
// Updates title, content, and category_id of an existing note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category_id } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const noteCategoryId = category_id ? parseInt(category_id, 10) : null;

    const [result] = await db.query(
      'UPDATE notes SET title = ?, content = ?, category_id = ? WHERE id = ?',
      [title, content, noteCategoryId, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Failed to update note' });
  }
};

// ---- ARCHIVE NOTE ----
// Sets is_archived to 1 so the note moves from Home to Archive
const archiveNote = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'UPDATE notes SET is_archived = 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note archived successfully' });
  } catch (error) {
    console.error('Error archiving note:', error);
    res.status(500).json({ message: 'Failed to archive note' });
  }
};

// ---- RESTORE NOTE ----
// Sets is_archived back to 0 so the note returns to the Home page
const restoreNote = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'UPDATE notes SET is_archived = 0 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note restored successfully' });
  } catch (error) {
    console.error('Error restoring note:', error);
    res.status(500).json({ message: 'Failed to restore note' });
  }
};

// ---- DELETE NOTE ----
// Permanently removes a note from the database
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM notes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Failed to delete note' });
  }
};

module.exports = {
  getAllNotes,
  getArchivedNotes,
  getNoteById,
  createNote,
  updateNote,
  archiveNote,
  restoreNote,
  deleteNote,
};
