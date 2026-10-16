// =============================================
// Archive.jsx — Archived Notes Component
// =============================================
// This page displays all archived notes.
// It teaches beginners:
// - Status-based filtering (is_archived = 1)
// - Sending PATCH requests to update specific flags
// - Restoring records back into the active list
// - Permanent deletion vs soft archiving

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './archive.css';

function Archive() {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  const fetchArchivedNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes/archived');
      setArchivedNotes(response.data);
    } catch (error) {
      console.error('Error fetching archived notes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Restore a note back to active status (is_archived = 0)
  const handleRestore = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notes/${id}/restore`);
      // Remove from archived list immediately
      setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error restoring note:', error);
      alert('Failed to restore note.');
    }
  };

  // Permanently delete a note from MySQL
  const handleDeletePermanent = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to permanently delete this note? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error permanently deleting note:', error);
      alert('Failed to delete note.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading archive...</p>;
  }

  return (
    <div>
      <div className="archive-header">
        <div>
          <h2>📦 Archived Notes</h2>
          <p className="archive-description">
            Notes you've archived are stored here safely. You can restore them anytime or delete them permanently.
          </p>
        </div>
      </div>

      {archivedNotes.length > 0 ? (
        <div className="archive-grid">
          {archivedNotes.map((note) => (
            <div key={note.id} className="archive-card">
              <div className="archive-card-top">
                <h3>{note.title}</h3>
                {note.category_name && (
                  <span
                    className="category-badge"
                    style={{ backgroundColor: note.category_color || '#4a90d9' }}
                  >
                    {note.category_name}
                  </span>
                )}
              </div>

              <p>{note.content}</p>
              <p className="archive-date">{formatDate(note.created_at)}</p>

              <div className="archive-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/note/${note.id}`)}
                >
                  View
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => handleRestore(note.id)}
                >
                  Restore
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePermanent(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="archive-empty">
          <p>📦</p>
          <p>Your archive is empty.</p>
        </div>
      )}
    </div>
  );
}

export default Archive;
