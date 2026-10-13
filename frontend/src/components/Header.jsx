// =============================================
// Header.jsx — Navigation Header Component
// =============================================
// This component displays the app name and navigation links.
// It appears at the top of every page.
// We use the <Link> component from React Router for navigation
// instead of <a> tags to avoid full page reloads.

import { Link } from 'react-router-dom';
import './header.css';

// Header is a functional component (the simplest type of React component)
function Header() {
  return (
    <header className="header">
      {/* App name — clicking it goes to the home page */}
      <Link to="/" className="header-title">
        📝 My Notes
      </Link>

      {/* Navigation links */}
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/create">+ New Note</Link>
      </nav>
    </header>
  );
}

// Export the component so other files can import and use it
export default Header;
