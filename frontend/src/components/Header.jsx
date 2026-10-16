// =============================================
// Header.jsx — Navigation Header Component
// =============================================
// This component displays the app branding and navigation links.
// It appears at the top of every page.
// We use NavLink from react-router-dom so the active page can be highlighted.

import { NavLink, Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="header">
      {/* App branding */}
      <Link to="/" className="header-title">
        📝 My Notes
      </Link>

      {/* Navigation links */}
      <nav className="header-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Home
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          + New Note
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Categories
        </NavLink>
        <NavLink to="/archive" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Archive
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
