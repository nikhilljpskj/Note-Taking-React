// =============================================
// App.js — Main Application Component
// =============================================
// This is the root component of our React app.
// It sets up the layout (Header, Footer) and
// defines all the page routes using React Router.

// Import React Router components for navigation
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import global styles
import './App.css';

// Import our page components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import CreateNote from './components/CreateNote';
import ViewNote from './components/ViewNote';
import EditNote from './components/EditNote';

// The App component wraps everything in a Router
// and defines which component to show for each URL path
function App() {
  return (
    // Router enables client-side navigation (no full page reloads)
    <Router>
      <div className="app-container">
        {/* Header appears on every page */}
        <Header />

        {/* Main content area — changes based on the current URL */}
        <main className="main-content">
          <Routes>
            {/* Home page — shows list of all notes */}
            <Route path="/" element={<Home />} />

            {/* Create page — form to add a new note */}
            <Route path="/create" element={<CreateNote />} />

            {/* View page — shows details of a single note */}
            {/* :id is a dynamic parameter (e.g., /note/5) */}
            <Route path="/note/:id" element={<ViewNote />} />

            {/* Edit page — form to update an existing note */}
            <Route path="/edit/:id" element={<EditNote />} />
          </Routes>
        </main>

        {/* Footer appears on every page */}
        <Footer />
      </div>
    </Router>
  );
}

// Export App so index.js can render it
export default App;
