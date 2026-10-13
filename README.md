# 📝 Note Taking App

A simple, beginner-friendly full-stack Note Taking application built with **React**, **Node.js**, **Express.js**, and **MySQL**. This project is designed to help beginners learn full-stack web development by building a complete CRUD (Create, Read, Update, Delete) application.

## 🛠️ Tech Stack

| Layer      | Technology        |
| ---------- | ----------------- |
| Frontend   | React 18, React Router v6, Axios, CSS |
| Backend    | Node.js, Express.js |
| Database   | MySQL             |

## 📁 Project Structure

```
Note-Taking React/
├── frontend/                 # React application
│   └── src/
│       ├── App.js            # Main app with routes
│       ├── App.css           # Global styles
│       └── components/       # Reusable UI components
│           ├── Header.jsx    # Navigation header
│           ├── Footer.jsx    # Page footer
│           ├── Home.jsx      # Lists all notes
│           ├── CreateNote.jsx# Form to create a note
│           ├── EditNote.jsx  # Form to edit a note
│           └── ViewNote.jsx  # View note details
│
├── backend/                  # Node.js + Express API
│   ├── server.js             # Server entry point
│   ├── config/db.js          # MySQL database connection
│   ├── routes/notesRoutes.js # API route definitions
│   └── controllers/notesController.js # CRUD logic
│
└── README.md                 # This file
```

## 🗄️ Database Setup

### Step 1: Install MySQL

Make sure MySQL is installed and running. You can use [XAMPP](https://www.apachefriends.org/), [WAMP](https://www.wampserver.com/), or a standalone MySQL installation.

### Step 2: Create the Database and Table

Open **MySQL Workbench**, **phpMyAdmin**, or the MySQL command line and run the following SQL commands:

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS notes_app;

-- Select the database
USE notes_app;

-- Create the notes table
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Step 3: Update Database Credentials (if needed)

Open `backend/config/db.js` and update the MySQL username and password if yours differ from the defaults:

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          // ← Your MySQL username
  password: '',           // ← Your MySQL password
  database: 'notes_app',
});
```

## 🚀 How to Run the Application

### Backend (API Server)

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# Server runs on http://localhost:5000
```

### Frontend (React App)

```bash
# 1. Open a new terminal and navigate to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Start the React development server
npm start

# App opens on http://localhost:3000
```

## 📡 API Endpoints

| Method   | Endpoint           | Description            |
| -------- | ------------------ | ---------------------- |
| `GET`    | `/api/notes`       | Get all notes          |
| `GET`    | `/api/notes/:id`   | Get a single note      |
| `POST`   | `/api/notes`       | Create a new note      |
| `PUT`    | `/api/notes/:id`   | Update an existing note|
| `DELETE` | `/api/notes/:id`   | Delete a note          |

## 📚 What You Will Learn

By building this project, you will learn:

- **React Basics**: Components, JSX, Props, State, Hooks (`useState`, `useEffect`)
- **React Router**: Client-side navigation, route parameters, `useNavigate`, `useParams`
- **Forms in React**: Controlled components, form submission, input handling
- **API Calls**: Using Axios to send HTTP requests (GET, POST, PUT, DELETE)
- **Node.js & Express**: Building a REST API, middleware, routing
- **MySQL**: Writing SQL queries, database connection, CRUD operations
- **Project Structure**: Organizing code into components, routes, controllers
- **Error Handling**: Try-catch blocks, HTTP status codes, user feedback

## ❓ Troubleshooting

| Problem | Solution |
| ------- | -------- |
| `ECONNREFUSED` error | Make sure MySQL is running and credentials in `db.js` are correct |
| Port 5000 already in use | Change the PORT in `backend/server.js` |
| Port 3000 already in use | React will ask if you want to use a different port — press `Y` |
| CORS errors in browser | Make sure the backend server is running before the frontend |
| `Module not found` errors | Run `npm install` in both `frontend/` and `backend/` folders |

## 📝 License

This project is open source and available for learning purposes.
