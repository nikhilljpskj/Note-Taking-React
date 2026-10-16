// =============================================
// About.jsx — About & Architecture Guide Page
// =============================================
// This component serves as a visual guide to the full-stack architecture.
// It explains how React, Express, and MySQL work together to build a real app.

import './about.css';

function About() {
  return (
    <div className="about-container">
      {/* Overview Card */}
      <div className="about-card">
        <h2>ℹ️ About My Notes App</h2>
        <p>
          Welcome to the <strong>Note Taking Full-Stack Application</strong>! This project is crafted
          specifically as a clean, beginner-friendly learning resource to master full-stack web
          development from scratch.
        </p>

        {/* Visual Architecture Flow */}
        <h3>Full-Stack Architecture Flow</h3>
        <div className="flow-diagram">
          <div className="flow-step">
            <div className="flow-step-icon">⚛️</div>
            <div className="flow-step-title">React UI</div>
            <div className="flow-step-desc">Components & State</div>
          </div>
          <div className="flow-arrow">➔</div>
          <div className="flow-step">
            <div className="flow-step-icon">🌐</div>
            <div className="flow-step-title">Axios HTTP</div>
            <div className="flow-step-desc">REST API Requests</div>
          </div>
          <div className="flow-arrow">➔</div>
          <div className="flow-step">
            <div className="flow-step-icon">🚀</div>
            <div className="flow-step-title">Express API</div>
            <div className="flow-step-desc">Routes & Controllers</div>
          </div>
          <div className="flow-arrow">➔</div>
          <div className="flow-step">
            <div className="flow-step-icon">🗄️</div>
            <div className="flow-step-title">MySQL Database</div>
            <div className="flow-step-desc">Tables & Queries</div>
          </div>
        </div>

        {/* Concepts Mastered */}
        <h3>Core Concepts You Learn in This Project</h3>
        <ul className="about-features-list">
          <li>
            <span className="check-icon">✓</span>
            <strong>React Fundamentals:</strong> Functional components, JSX syntax, Props, and App layout structuring.
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>React Hooks:</strong> <code>useState</code> for state management, <code>useEffect</code> for fetching API data on mount.
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>Client-Side Routing:</strong> <code>react-router-dom</code> with <code>&lt;Routes&gt;</code>, dynamic params with <code>useParams</code>, and programmatic redirect with <code>useNavigate</code>.
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>Forms & Controlled Inputs:</strong> Handling <code>onChange</code>, <code>onSubmit</code>, form validation, and dropdown selects.
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>Node.js & Express:</strong> Modular REST architecture with dedicated routers, controllers, and CORS middleware.
          </li>
          <li>
            <span className="check-icon">✓</span>
            <strong>Relational MySQL:</strong> Primary keys, Foreign keys, <code>LEFT JOIN</code>, <code>COUNT()</code>, <code>GROUP BY</code>, and parameterized queries.
          </li>
        </ul>
      </div>

      {/* API Reference Card */}
      <div className="about-card">
        <h3>Available API Endpoints</h3>
        <p>Your Express backend provides the following RESTful routes:</p>

        <table className="api-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="api-badge api-badge-get">GET</span></td>
              <td><code>/api/notes</code></td>
              <td>Fetch all active notes (supports <code>?category_id=</code> & <code>?q=</code>)</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-get">GET</span></td>
              <td><code>/api/notes/archived</code></td>
              <td>Fetch all archived notes</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-get">GET</span></td>
              <td><code>/api/notes/:id</code></td>
              <td>Fetch a single note by ID</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-post">POST</span></td>
              <td><code>/api/notes</code></td>
              <td>Create a new note</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-put">PUT</span></td>
              <td><code>/api/notes/:id</code></td>
              <td>Update an existing note</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-patch">PATCH</span></td>
              <td><code>/api/notes/:id/archive</code></td>
              <td>Move a note to the archive</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-patch">PATCH</span></td>
              <td><code>/api/notes/:id/restore</code></td>
              <td>Restore an archived note back to Home</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-delete">DELETE</span></td>
              <td><code>/api/notes/:id</code></td>
              <td>Permanently delete a note</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-get">GET</span></td>
              <td><code>/api/categories</code></td>
              <td>Fetch all categories with note count</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-post">POST</span></td>
              <td><code>/api/categories</code></td>
              <td>Create a new category</td>
            </tr>
            <tr>
              <td><span className="api-badge api-badge-delete">DELETE</span></td>
              <td><code>/api/categories/:id</code></td>
              <td>Delete a category</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default About;
