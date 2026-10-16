// =============================================
// App.js — Main Application Component
// =============================================
// This is the root component of our React app.
// It sets up the layout (Header, Footer) and
// defines all the page routes using React Router.

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
import Categories from './components/Categories';
import Archive from './components/Archive';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header appears on every page */}
        <Header />

        {/* Main content area — changes based on the current URL */}
        <main className="main-content">
          <Routes>
            {/* Home page — shows list of all active notes with search & category filters */}
            <Route path="/" element={<Home />} />

            {/* Create page — form to add a new note with category selection */}
            <Route path="/create" element={<CreateNote />} />

            {/* View page — shows details of a single note */}
            <Route path="/note/:id" element={<ViewNote />} />

            {/* Edit page — form to update an existing note */}
            <Route path="/edit/:id" element={<EditNote />} />

            {/* Categories page — manage note categories */}
            <Route path="/categories" element={<Categories />} />

            {/* Archive page — view, restore, or delete archived notes */}
            <Route path="/archive" element={<Archive />} />

            {/* About page — overview of architecture and full-stack concepts */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer appears on every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
