// =============================================
// EditNote.jsx — Edit Note Page Component
// =============================================
// This component loads an existing note and lets the user
// edit its title, category, and content.
// It demonstrates:
// - useParams: reading the note ID from the URL
// - Pre-filling a form with existing database data
// - Updating relational data (category_id)
// - API PUT request for updates

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './createNote.css';  // Reuse form styling
import './editNote.css';

function EditNote() {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load existing note data and available categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noteRes, categoriesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/notes/${id}`),
          axios.get('http://localhost:5000/api/categories'),
        ]);

        setTitle(noteRes.data.title);
        setContent(noteRes.data.content);
        setCategoryId(noteRes.data.category_id || '');
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching note details:', error);
        alert('Note not found.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/notes/${id}`, {
        title,
        content,
        category_id: categoryId || null,
      });

      navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note. Please try again.');
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading note...</p>;
  }

  return (
    <div className="form-container">
      <h2>Edit Note</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Category Select */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">-- No Category (General) --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            Update Note
          </button>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditNote;
