// =============================================
// ViewNote.jsx — View Note Page Component
// =============================================
// This component displays the full details of a single note.
// It demonstrates:
// - useParams: reading the note ID from the URL
// - Displaying category details linked from MySQL
// - Performing Archive/Restore or Delete actions from the view page

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './viewNote.css';

function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNote();
  }, [id]);

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

  // Archive or Restore based on current note status
  const handleToggleArchive = async () => {
    try {
      if (note.is_archived) {
        await axios.patch(`http://localhost:5000/api/notes/${id}/restore`);
        alert('Note restored to active notes!');
        navigate('/');
      } else {
        await axios.patch(`http://localhost:5000/api/notes/${id}/archive`);
        alert('Note moved to Archive!');
        navigate('/archive');
      }
    } catch (error) {
      console.error('Error toggling archive status:', error);
      alert('Failed to update note archive status.');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to permanently delete this note?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note.');
    }
  };

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

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading note...</p>;
  }

  if (!note) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Note not found.</p>;
  }

  return (
    <div className="view-note">
      <div className="view-note-top">
        <h2>{note.title}</h2>
        {note.category_name && (
          <span
            className="view-note-badge"
            style={{ backgroundColor: note.category_color || '#4a90d9' }}
          >
            {note.category_name}
          </span>
        )}
      </div>

      <p className="view-note-date">
        Created on {formatDate(note.created_at)}
        {note.is_archived ? ' • (Archived)' : ''}
      </p>

      {/* Full note content */}
      <div className="view-note-content">{note.content}</div>

      {/* Action buttons */}
      <div className="view-note-actions">
        <Link to={`/edit/${note.id}`} className="btn btn-secondary">
          Edit
        </Link>
        <button className="btn btn-secondary" onClick={handleToggleArchive}>
          {note.is_archived ? 'Restore to Home' : 'Archive Note'}
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <Link to={note.is_archived ? '/archive' : '/'} className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
}

export default ViewNote;
