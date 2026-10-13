// =============================================
// CreateNote.jsx — Create Note Page Component
// =============================================
// This component renders a form to create a new note.
// It demonstrates:
// - Controlled components: form inputs tied to state
// - Form handling: onSubmit, onChange events
// - API POST request: sending data to the backend
// - Navigation: redirecting after successful creation

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './createNote.css';

function CreateNote() {
  // ---- State for Form Fields ----
  // Each input field has its own state variable.
  // When the user types, the state updates, and the input re-renders.
  const [title, setTitle] = useState('');     // Stores the note title
  const [content, setContent] = useState(''); // Stores the note content

  // useNavigate hook lets us redirect to another page after saving
  const navigate = useNavigate();

  // ---- Handle Form Submission ----
  // This function runs when the user clicks "Save Note"
  const handleSubmit = async (event) => {
    // Prevent the browser from reloading the page (default form behavior)
    event.preventDefault();

    try {
      // Send a POST request with the note data to our backend API
      await axios.post('http://localhost:5000/api/notes', {
        title,    // Same as title: title (ES6 shorthand)
        content,  // Same as content: content
      });

      // After successful creation, redirect to the home page
      navigate('/');
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    }
  };

  // ---- Render the Form ----
  return (
    <div className="form-container">
      <h2>Create New Note</h2>

      {/* onSubmit calls handleSubmit when the form is submitted */}
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter note title"
            value={title}                          // Controlled: value comes from state
            onChange={(e) => setTitle(e.target.value)}  // Update state when user types
            required                                // HTML5 validation: field must not be empty
          />
        </div>

        {/* Content Textarea */}
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
            Save Note
          </button>
          <Link to="/" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
