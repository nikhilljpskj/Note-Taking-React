// =============================================
// Footer.jsx — Footer Component
// =============================================
// A simple footer that appears at the bottom of every page.
// This demonstrates a basic React functional component.

import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      {/* Display the current year dynamically */}
      <p>© {new Date().getFullYear()} My Notes App — Built with React & Node.js</p>
    </footer>
  );
}

export default Footer;
