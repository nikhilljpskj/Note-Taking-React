// =============================================
// Home.jsx — Home Page Component
// =============================================
// This is the main page displaying all active notes.
// It demonstrates key React & Full-Stack concepts:
// - useState: managing notes, categories, search term, active filter
// - useEffect: loading notes and categories from Express APIs
// - Dynamic query strings with axios: /api/notes?category_id=...&q=...
// - useSearchParams: reading ?category_id from the URL (e.g. from Categories page)
// - One-click archiving with PATCH requests

import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './home.css';

function Home() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // useSearchParams reads and sets URL search parameters (?category_id=1)
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = searchParams.get('category_id') || '';

  const navigate = useNavigate();

  // Load categories and notes when component mounts or filter changes
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [activeCategoryId, searchTerm]);

  // Fetch all categories for filter chips
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch active notes with optional category and search query filters
  const fetchNotes = async () => {
    try {
      const params = {};
      if (activeCategoryId) params.category_id = activeCategoryId;
      if (searchTerm.trim()) params.q = searchTerm.trim();

      const response = await axios.get('http://localhost:5000/api/notes', { params });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Move a note to Archive using PATCH
  const handleArchive = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notes/${id}/archive`);
      // Remove from active notes immediately
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error archiving note:', error);
      alert('Failed to archive note.');
    }
  };

  // Permanently delete a note
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${id}`);
        setNotes(notes.filter((note) => note.id !== id));
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Set category filter chip
  const handleSelectCategory = (catId) => {
    if (catId) {
      setSearchParams({ category_id: catId });
    } else {
      setSearchParams({});
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading notes...</p>;
  }

  return (
    <div>
      {/* Header bar */}
      <div className="home-header">
        <h2>All Notes</h2>
        <Link to="/create" className="btn btn-primary">
          + Create Note
        </Link>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="home-controls">
        {/* Search input */}
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search notes by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category filter chips */}
        <div className="category-filters">
          <button
            className={`filter-chip ${activeCategoryId === '' ? 'active' : ''}`}
            onClick={() => handleSelectCategory('')}
          >
            All Notes
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-chip ${activeCategoryId === String(cat.id) ? 'active' : ''}`}
              onClick={() => handleSelectCategory(cat.id)}
            >
              {cat.name} ({cat.note_count})
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      {notes.length > 0 ? (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <div>
                <div className="note-card-top">
                  <h3>{note.title}</h3>
                  {note.category_name && (
                    <span
                      className="note-category-badge"
                      style={{ backgroundColor: note.category_color || '#4a90d9' }}
                    >
                      {note.category_name}
                    </span>
                  )}
                </div>

                <p>{note.content}</p>
              </div>

              <div>
                <p className="note-date">{formatDate(note.created_at)}</p>

                {/* Actions */}
                <div className="note-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/note/${note.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/edit/${note.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleArchive(note.id)}
                    title="Move to Archive"
                  >
                    Archive
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-message">
          <p>📝</p>
          <p>
            {searchTerm || activeCategoryId
              ? 'No notes match your search or filter.'
              : 'No notes yet. Create your first note!'}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
