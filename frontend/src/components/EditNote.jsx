// =============================================
// EditNote.jsx — Edit Note Page Component
// =============================================
// This component loads an existing note and lets the user
// edit its title and content. It demonstrates:
// - useParams: reading the note ID from the URL
// - useEffect: fetching data when the component loads
// - Pre-filling a form with existing data
// - API PUT request: updating data on the backend

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './createNote.css';  // Reuse the same form styles
import './editNote.css';    // Any edit-specific overrides

function EditNote() {
  // ---- Get the Note ID from the URL ----
  // useParams extracts dynamic parameters from the URL
  // For /edit/5, id would be "5"
  const { id } = useParams();

  // State for form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // ---- Fetch the Existing Note ----
  // Load the note data when the component mounts
  useEffect(() => {
    const fetchNote = async () => {
      try {
        // Get the note by ID from the backend
        const response = await axios.get(`http://localhost:5000/api/notes/${id}`);

        // Pre-fill the form with the existing note data
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching note:', error);
        alert('Note not found.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);  // Re-run if the id changes

  // ---- Handle Form Submission ----
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a PUT request to update the note
      await axios.put(`http://localhost:5000/api/notes/${id}`, {
        title,
        content,
      });

      // Redirect to home page after successful update
      navigate('/');
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note. Please try again.');
    }
  };

  // Show loading state while fetching
  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading note...</p>;
  }

  // ---- Render the Edit Form ----
  return (
    <div className="form-container">
      <h2>Edit Note</h2>

      <form onSubmit={handleSubmit}>
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
