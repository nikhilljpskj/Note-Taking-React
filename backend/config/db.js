// =============================================
// db.js — MySQL Database Connection
// =============================================
// This file creates a connection pool to the MySQL database.
// A connection pool reuses connections, which is more efficient
// than opening a new connection for every database query.

const mysql = require('mysql2');

// Create a connection pool with your database credentials
// Update these values to match your local MySQL setup
const pool = mysql.createPool({
  host: 'localhost',       // Where MySQL is running (usually localhost)
  user: 'root',            // Your MySQL username
  password: '',            // Your MySQL password (empty by default in XAMPP/WAMP)
  database: 'notes_app',   // The database name we will create
  waitForConnections: true, // Wait if all connections are in use
  connectionLimit: 10,      // Maximum number of connections in the pool
});

// Export the pool using promise-based API
// .promise() lets us use async/await instead of callbacks
module.exports = pool.promise();
