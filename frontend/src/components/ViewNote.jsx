// =============================================
// ViewNote.jsx — View Note Page Component
// =============================================
// This component displays the full details of a single note.
// It demonstrates:
// - useParams: reading the note ID from the URL
// - useEffect + useState: fetching and storing note data
// - Displaying data from the backend on a dedicated page

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './viewNote.css';

function ViewNote() {
  // Get the note ID from the practical URL (e.g., /note/3 → id = "3")
  const { id } = useParams();

  // State to store the fetched note
  const [note, setNote] = useState(null);      // null = not loaded yet
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ---- Fetch the Note When Page Loads ----
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error('Error fetching note:', error);
        alert('Note not found.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  // ---- Format Date ----
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Show loading state
  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading note...</p>;
  }

  // Safety check: if note is still null after loading
  if (!note) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Note not found.</p>;
  }

  // ---- Render the Note Details ----
  return (
    <div className="view-note">
      <h2>{note.title}</h2>
      <p className="view-note-date">Created on {formatDate(note.created_at)}</p>

      {/* Display the full note content */}
      <div className="view-note-content">{note.content}</div>

      {/* Action buttons */}
      <div className="view-note-actions">
        <Link to={`/edit/${note.id}`} className="btn btn-secondary">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ViewNote;
