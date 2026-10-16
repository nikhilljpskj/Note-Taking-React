// =============================================
// categoriesRoutes.js — API Routes for Categories
// =============================================
// This file defines the endpoints for managing note categories.

const express = require('express');
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  deleteCategory,
} = require('../controllers/categoriesController');

// GET /api/categories — Fetch all categories with note counts
router.get('/', getAllCategories);

// POST /api/categories — Create a new category
router.post('/', createCategory);

// DELETE /api/categories/:id — Delete a category
router.delete('/:id', deleteCategory);

module.exports = router;
