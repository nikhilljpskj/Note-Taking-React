# 📝 Note Taking App

A beginner-friendly, feature-packed full-stack Note Taking application built with **React**, **Node.js**, **Express.js**, and **MySQL**. This project is designed to help beginners learn full-stack web development through clean architecture, separated components, and real-world features like categories, archive management, search, and full CRUD operations.

## 🛠️ Tech Stack

| Layer      | Technology        |
| ---------- | ----------------- |
| Frontend   | React 18, React Router v6, Axios, CSS |
| Backend    | Node.js, Express.js |
| Database   | MySQL             |

## 📁 Project Structure

```
Note-Taking React/
├── database.sql              # Complete MySQL database creation script
├── README.md                 # Project documentation and setup guide
│
├── frontend/                 # React client
│   └── src/
│       ├── App.js            # Main application router
│       ├── App.css           # Global layout, fonts, and button styles
│       └── components/       # Reusable UI components with paired CSS
│           ├── Header.jsx    # Navigation header with active links
│           ├── header.css
│           ├── Footer.jsx    # Page footer
│           ├── footer.css
│           ├── Home.jsx      # All active notes + search + category filter chips
│           ├── home.css
│           ├── CreateNote.jsx# Form to create note with category dropdown
│           ├── createNote.css
│           ├── EditNote.jsx  # Form to edit note with category dropdown
│           ├── editNote.css
│           ├── ViewNote.jsx  # Full note view with category badge & archive toggle
│           ├── viewNote.css
│           ├── Categories.jsx# Manage categories + note count per category
│           ├── categories.css
│           ├── Archive.jsx   # Archived notes view with Restore and Delete
│           ├── archive.css
│           ├── About.jsx     # Architectural guide and API reference
│           └── about.css
│
└── backend/                  # Node.js + Express API
    ├── server.js             # Server entry point with CORS & route mounting
    ├── config/
    │   └── db.js             # MySQL database connection pool (mysql2/promise)
    ├── routes/
    │   ├── notesRoutes.js    # Notes API endpoints (CRUD, archive, restore)
    │   └── categoriesRoutes.js # Categories API endpoints
    └── controllers/
        ├── notesController.js # Notes business logic & MySQL queries
        └── categoriesController.js # Categories business logic & queries
```

## 🗄️ Database Setup

You can run the complete script found in [`database.sql`](./database.sql) directly in **MySQL Workbench**, **phpMyAdmin**, or the MySQL command line:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS notes_app;
USE notes_app;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    color VARCHAR(20) DEFAULT '#4a90d9',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notes table with category relationship and archive flag
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id INT NULL,
    is_archived TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Insert sample categories
INSERT INTO categories (name, color) VALUES
('General', '#6c757d'),
('Work', '#0d6efd'),
('Personal', '#198754'),
('Study', '#e67e22'),
('Ideas', '#6f42c1')
ON DUPLICATE KEY UPDATE name = name;
```

> **Upgrading an existing table?** If you already had an earlier version of the `notes` table, run:
> ```sql
> ALTER TABLE notes ADD COLUMN category_id INT NULL;
> ALTER TABLE notes ADD COLUMN is_archived TINYINT(1) DEFAULT 0;
> ALTER TABLE notes ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
> ALTER TABLE notes ADD CONSTRAINT fk_notes_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
> ```

### Database Credentials

Open `backend/config/db.js` and update your MySQL username or password if different from defaults:

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          // ← Your MySQL username
  password: '',          // ← Your MySQL password
  database: 'notes_app',
});
```

## 🚀 How to Run the Application

### 1. Start the Backend API

```bash
# Navigate to the backend folder
cd backend

# Install dependencies (if not already done)
npm install

# Start the Express server
npm start

# Server will run on http://localhost:5000
```

### 2. Start the Frontend React App

```bash
# Open a new terminal and navigate to the frontend folder
cd frontend

# Install dependencies (if not already done)
npm install

# Start the React development server
npm start

# App will open automatically on http://localhost:3000
```

## 📱 Application Screens & Features

- **Home (`/`)**: Displays all active notes. Features instant search (by title or content), category filter chips, note counts, and quick archive/delete actions.
- **Create Note (`/create`)**: Form with title, category dropdown selection, and note content.
- **View Note (`/note/:id`)**: Full-page preview with category pill badge, creation date, and options to edit, archive, or delete.
- **Edit Note (`/edit/:id`)**: Pre-populated form to update note content or re-assign category.
- **Categories (`/categories`)**: Create and delete categories with a color picker; shows active note counts per category using SQL `LEFT JOIN` and `COUNT()`.
- **Archive (`/archive`)**: View soft-deleted/archived notes with one-click "Restore" to Home or permanent delete.
- **About (`/about`)**: Architecture diagrams, full-stack concepts, and complete API reference.

## 📡 API Endpoints

| Method   | Endpoint                  | Description                               |
| -------- | ------------------------- | ----------------------------------------- |
| `GET`    | `/api/notes`              | Get all active notes (`?category_id=` & `?q=`) |
| `GET`    | `/api/notes/archived`     | Get all archived notes                    |
| `GET`    | `/api/notes/:id`          | Get single note with category info        |
| `POST`   | `/api/notes`              | Create a new note                         |
| `PUT`    | `/api/notes/:id`          | Update note details                       |
| `PATCH`  | `/api/notes/:id/archive`  | Move note to archive (`is_archived = 1`)  |
| `PATCH`  | `/api/notes/:id/restore`  | Restore note to active (`is_archived = 0`)|
| `DELETE` | `/api/notes/:id`          | Permanently delete a note                 |
| `GET`    | `/api/categories`         | Get all categories with note count        |
| `POST`   | `/api/categories`         | Create a new category with color          |
| `DELETE` | `/api/categories/:id`     | Delete a category                         |

## 📚 What You Will Learn

- **React State & Effects**: Dynamic lists, controlled inputs, color pickers, and URL search parameters (`useSearchParams`).
- **React Router v6**: Clean navigation layout, dynamic routes (`:id`), and `NavLink` active states.
- **Relational Databases (MySQL)**: Multi-table schemas, foreign keys, `LEFT JOIN`, `GROUP BY`, and `COUNT()`.
- **RESTful API Design**: Express routers, controllers, HTTP status codes, and parameterized queries for security.
- **Full-Stack Lifecycle**: Transitioning data from Active to Archived, filtered queries, and soft-delete vs hard-delete patterns.

## ❓ Troubleshooting

| Problem | Solution |
| ------- | -------- |
| `ECONNREFUSED` error | Make sure MySQL is running in XAMPP/WAMP/Service and credentials in `db.js` match |
| Port 5000 in use | Change `PORT` in `backend/server.js` |
| Port 3000 in use | React prompts to use another port — type `Y` |
| CORS errors | Verify the backend server is running on `http://localhost:5000` |

## 📝 License

This project is open-source and created for educational purposes.
