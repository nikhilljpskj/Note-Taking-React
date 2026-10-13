// =============================================
// Home.jsx — Home Page Component
// =============================================
// This is the main page that displays all notes.
// It demonstrates several key React concepts:
// - useState: to store data (notes) in the component
// - useEffect: to fetch data when the component first loads
// - API calls: using axios to communicate with the backend
// - Conditional rendering: showing different UI based on data
// - List rendering: using .map() to display multiple items

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

function Home() {
  // ---- State ----
  // useState creates a 'state variable' that React watches.
  // When it changes, React re-renders (updates) the component.
  const [notes, setNotes] = useState([]);       // Array to store all notes
  const [loading, setLoading] = useState(true);  // Track if data is still loading

  // useNavigate lets us redirect the user to a different page programmatically
  const navigate = useNavigate();

  // ---- Fetch Notes on Page Load ----
  // useEffect runs code when the component mounts (loads for the first time).
  // The empty array [] means this runs only ONCE when the page opens.
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to get all notes from the backend API
  const fetchNotes = async () => {
    try {
      // Send a GET request to our backend API
      const response = await axios.get('http://localhost:5000/api/notes');

      // Store the received notes in state
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      // Whether success or error, stop showing the loading state
      setLoading(false);
    }
  };

  // ---- Delete a Note ----
  // This function sends a DELETE request to remove a note
  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');

    if (confirmDelete) {
      try {
        // Send DELETE request to the backend
        await axios.delete(`http://localhost:5000/api/notes/${id}`);

        // Remove the deleted note from state (updates the UI immediately)
        // .filter() creates a new array excluding the deleted note
        setNotes(notes.filter((note) => note.id !== id));
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  // ---- Format Date ----
  // Converts database date string to a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // ---- Show Loading Message ----
  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Loading notes...</p>;
  }

  // ---- Render the Page ----
  return (
    <div>
      {/* Page heading with a create button */}
      <div className="home-header">
        <h2>All Notes</h2>
        <Link to="/create" className="btn btn-primary">
          + Create Note
        </Link>
      </div>

      {/* Conditional rendering: show notes grid OR empty message */}
      {notes.length > 0 ? (
        <div className="notes-grid">
          {/* .map() loops through each note and creates a card */}
          {notes.map((note) => (
            // 'key' is required by React to track items in a list efficiently
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p className="note-date">{formatDate(note.created_at)}</p>

              {/* Action buttons for each note */}
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
                  className="btn btn-danger"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* This shows when there are no notes yet */
        <div className="empty-message">
          <p>📝</p>
          <p>No notes yet. Create your first note!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
