const express = require('express');
const cors = require('cors');
const database = require('better-sqlite3')('data.db');
const uuid = require('uuid');
const Authenticate = require('./middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
(() => {
  // Create tables
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      _id TEXT NOT NULL,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      _id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER NOT NULL DEFAULT 0,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);
})();

// Signup endpoint
app.post('/api/signup', (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userId = uuid.v4();
    const sql = 'INSERT INTO users (_id, username, email, password) VALUES (?, ?, ?, ?)';
    database.prepare(sql).run(userId, username, email, password);
    const userData = database.prepare('SELECT * FROM users WHERE _id = ?').get(userId);
    res.cookie('auth_token', userData._id, { maxAge: 360000, httpOnly: true, secure: true, path: '/' });
    res.status(201).json(userData);
  } catch (error) {
    console.log(error);
  }
});

// Login endpoint
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = database.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);
    if (user) {
      res.cookie('auth_token', user._id, { maxAge: 3600000, httpOnly: true, secure: true, path: '/' });
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.log(error);
  }
});

// Get current user
app.get('/api/currentuser', Authenticate, (req, res) => {
  try {
    const user = req.user;
    const current_user = database.prepare('SELECT * FROM users WHERE _id = ?').get(user._id);
    if (!current_user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(current_user);
  } catch (error) {
    console.log(error);
  }
});

// Create a new todo
app.post('/api/todos', Authenticate, (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;
    const todoId = uuid.v4();
    const sql = 'INSERT INTO todos (_id, title, description, user_id) VALUES (?, ?, ?, ?)';
    database.prepare(sql).run(todoId, title, description, user.id);
    const todo = database.prepare('SELECT * FROM todos WHERE _id = ?').get(todoId);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

// Get all todos for the authenticated user
app.get('/api/todos', Authenticate, (req, res) => {
  try {
    const user = req.user;
    const todos = database.prepare('SELECT * FROM todos WHERE user_id = ?').all(user.id);
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
});

// Get a specific todo by ID
app.get('/api/todos/:id', Authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const todo = database.prepare('SELECT * FROM todos WHERE _id = ? AND user_id = ?').get(id, user.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

// Update a todo
app.put('/api/todos/:id', Authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const user = req.user;
    const sql = `
      UPDATE todos
      SET title = ?, description = ?, completed = ?
      WHERE _id = ? AND user_id = ?
    `;
    const result = database.prepare(sql).run(title, description, completed ? 1 : 0, id, user.id);
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Todo not found or not authorized' });
    }
    const updatedTodo = database.prepare('SELECT * FROM todos WHERE _id = ?').get(id);
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
  }
});

// Delete a todo
app.delete('/api/todos/:id', Authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const result = database.prepare('DELETE FROM todos WHERE _id = ? AND user_id = ?').run(id, user.id);
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Todo not found or not authorized' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
