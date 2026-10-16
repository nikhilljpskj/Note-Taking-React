// =============================================
// Categories.jsx — Category Management Component
// =============================================
// This component lets users manage note categories.
// It teaches beginners:
// - Relational category data handling
// - Controlled input forms with color pickers
// - Refreshing lists after POST/DELETE operations
// - Visual feedback using dynamic style attributes

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for creating a new category
  const [name, setName] = useState('');
  const [color, setColor] = useState('#4a90d9');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  // Load categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle creating a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/categories', {
        name: name.trim(),
        color,
      });

      // Clear input and reload category list
      setName('');
      fetchCategories();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMsg('A category with this name already exists.');
      } else {
        setErrorMsg('Failed to create category. Please try again.');
      }
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (id, categoryName) => {
    const confirm = window.confirm(
      `Delete category "${categoryName}"? Existing notes in this category will become Uncategorized.`
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category.');
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading categories...</p>;
  }

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2>Manage Categories</h2>
      </div>

      {/* Form to Add New Category */}
      <div className="add-category-card">
        <h3>Create New Category</h3>
        {errorMsg && <p style={{ color: '#dc3545', marginBottom: '10px' }}>{errorMsg}</p>}

        <form className="add-category-form" onSubmit={handleAddCategory}>
          <input
            type="text"
            className="add-category-input"
            placeholder="Category name (e.g., Work, Health, Reading)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="color-picker-group">
            <label htmlFor="color">Color:</label>
            <input
              type="color"
              id="color"
              className="color-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success">
            + Add Category
          </button>
        </form>
      </div>

      {/* Grid of Existing Categories */}
      <div className="categories-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            {/* Visual colored accent bar */}
            <div
              className="category-card-accent"
              style={{ backgroundColor: cat.color || '#4a90d9' }}
            ></div>

            <div className="category-card-header">
              <span className="category-badge-name">{cat.name}</span>
            </div>

            <p className="category-count">
              📄 {cat.note_count} {cat.note_count === 1 ? 'active note' : 'active notes'}
            </p>

            <div className="category-card-actions">
              {/* Navigate to Home with this category pre-filtered */}
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/?category_id=${cat.id}`)}
              >
                View Notes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCategory(cat.id, cat.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
