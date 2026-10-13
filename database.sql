-- =============================================
-- database.sql — Database Setup for Note Taking App
-- =============================================
-- Run this file in MySQL Workbench, phpMyAdmin,
-- or the MySQL command line to set up the database.

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS notes_app;

-- Step 2: Select the database to use
USE notes_app;

-- Step 3: Create the notes table
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- Unique ID for each note (auto-increments)
    title VARCHAR(255) NOT NULL,             -- Note title (max 255 characters, required)
    content TEXT NOT NULL,                   -- Note content (long text, required)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Auto-set to current date/time when created
);
