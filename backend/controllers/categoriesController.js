// =============================================
// categoriesController.js — CRUD Logic for Categories
// =============================================
// This controller manages note categories (e.g. Work, Personal, Study).
// It introduces beginners to relational database concepts:
// - Aggregation with COUNT()
// - Joining tables with LEFT JOIN
// - Grouping data with GROUP BY

const db = require('../config/db');

// ---- GET ALL CATEGORIES (with note count) ----
// Fetches each category and counts how many active notes belong to it
const getAllCategories = async (req, res) => {
  try {
    // We use a LEFT JOIN so categories with 0 notes are still returned.
    // Notice the condition 'AND n.is_archived = 0' so we only count active notes.
    const query = `
      SELECT 
        c.id, 
        c.name, 
        c.color, 
        c.created_at, 
        COUNT(n.id) AS note_count
      FROM categories c
      LEFT JOIN notes n ON c.id = n.category_id AND n.is_archived = 0
      GROUP BY c.id, c.name, c.color, c.created_at
      ORDER BY c.name ASC
    `;

    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// ---- CREATE NEW CATEGORY ----
// Adds a new category name and an optional hex color code
const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    // Validation: Name is required
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // Default color if user didn't pick one
    const categoryColor = color || '#4a90d9';

    // Insert category into database
    const [result] = await db.query(
      'INSERT INTO categories (name, color) VALUES (?, ?)',
      [name.trim(), categoryColor]
    );

    res.status(201).json({
      id: result.insertId,
      name: name.trim(),
      color: categoryColor,
      message: 'Category created successfully',
    });
  } catch (error) {
    // Error code 1062 in MySQL means duplicate entry for unique key
    if (error.errno === 1062) {
      return res.status(409).json({ message: 'A category with this name already exists' });
    }
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category' });
  }
};

// ---- DELETE CATEGORY ----
// Deletes a category by ID (notes under it will have category_id set to NULL)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
