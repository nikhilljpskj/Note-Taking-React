-- =============================================
-- database.sql — Database Setup for Note Taking App
-- =============================================
-- Run this file in MySQL Workbench, phpMyAdmin,
-- or the MySQL command line to set up or update the database.

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS notes_app;

-- Step 2: Select the database to use
USE notes_app;

-- Step 3: Create the categories table
-- Categories help organize notes (e.g. Work, Personal, Study)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique ID for each category
    name VARCHAR(100) NOT NULL UNIQUE,          -- Category name (must be unique)
    color VARCHAR(20) DEFAULT '#4a90d9',        -- Hex color code for badges/chips
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Create the notes table
-- Each note has a title, content, optional category, and archive status
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique ID for each note (auto-increments)
    title VARCHAR(255) NOT NULL,                -- Note title (required)
    content TEXT NOT NULL,                      -- Note content (required)
    category_id INT NULL,                       -- Foreign key pointing to categories(id)
    is_archived TINYINT(1) DEFAULT 0,           -- 0 = Active note, 1 = Archived note
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Auto-set to creation time
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auto-updated
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ====================================================================
-- NOTE FOR EXISTING DATABASES (UPGRADE SCRIPT):
-- If you created the table previously with only title and content,
-- run these ALTER statements to upgrade your existing notes table:
--
-- ALTER TABLE notes ADD COLUMN category_id INT NULL;
-- ALTER TABLE notes ADD COLUMN is_archived TINYINT(1) DEFAULT 0;
-- ALTER TABLE notes ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
-- ALTER TABLE notes ADD CONSTRAINT fk_notes_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
-- ====================================================================

-- Step 5: Insert starter categories to get started immediately
INSERT INTO categories (name, color) VALUES
('General', '#6c757d'),
('Work', '#0d6efd'),
('Personal', '#198754'),
('Study', '#e67e22'),
('Ideas', '#6f42c1')
ON DUPLICATE KEY UPDATE name = name;

-- Step 6: Insert starter sample notes
INSERT INTO notes (title, content, category_id, is_archived) VALUES
('Welcome to Note Taking App', 'This is your first note! You can view, edit, categorize, archive, or delete it.', 1, 0),
('Learn Full-Stack Development', 'React components, hooks, Express API endpoints, and relational MySQL queries.', 4, 0),
('Project Ideas', 'Build notes with categories, search filtering, and archive restoration.', 5, 0),
('Archived Note Example', 'This is an example of an archived note. You can restore it from the Archive page!', 2, 1)
ON DUPLICATE KEY UPDATE title = title;
