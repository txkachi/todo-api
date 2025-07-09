const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const TODOS_FILE = 'todos.json';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize todos file if it doesn't exist
function initializeTodosFile() {
  if (!fs.existsSync(TODOS_FILE)) {
    fs.writeFileSync(TODOS_FILE, JSON.stringify([], null, 2));
  }
}

// Read todos from file
function readTodos() {
  try {
    const data = fs.readFileSync(TODOS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write todos to file
function writeTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Routes

// GET /api/todos - Get all todos
app.get('/api/todos', (req, res) => {
  try {
    const todos = readTodos();
    res.json({
      success: true,
      data: todos,
      count: todos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
});

// GET /api/todos/:id - Get a specific todo
app.get('/api/todos/:id', (req, res) => {
  try {
    const todos = readTodos();
    const todo = todos.find(t => t.id === req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
});

// POST /api/todos - Create a new todo
app.post('/api/todos', (req, res) => {
  try {
    const { title, description, completed = false } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }
    
    const todos = readTodos();
    const newTodo = {
      id: generateId(),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: Boolean(completed),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    writeTodos(todos);
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todos = readTodos();
    const todoIndex = todos.findIndex(t => t.id === req.params.id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    const updatedTodo = {
      ...todos[todoIndex],
      title: title !== undefined ? title.trim() : todos[todoIndex].title,
      description: description !== undefined ? description.trim() : todos[todoIndex].description,
      completed: completed !== undefined ? Boolean(completed) : todos[todoIndex].completed,
      updatedAt: new Date().toISOString()
    };
    
    todos[todoIndex] = updatedTodo;
    writeTodos(todos);
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  try {
    const todos = readTodos();
    const todoIndex = todos.findIndex(t => t.id === req.params.id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    writeTodos(todos);
    
    res.json({
      success: true,
      message: 'Todo deleted successfully',
      data: deletedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
});

// DELETE /api/todos - Delete all todos
app.delete('/api/todos', (req, res) => {
  try {
    writeTodos([]);
    res.json({
      success: true,
      message: 'All todos deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting all todos',
      error: error.message
    });
  }
});

// GET / - Welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Todo API',
    version: '1.0.0',
    endpoints: {
      'GET /api/todos': 'Get all todos',
      'GET /api/todos/:id': 'Get a specific todo',
      'POST /api/todos': 'Create a new todo',
      'PUT /api/todos/:id': 'Update a todo',
      'DELETE /api/todos/:id': 'Delete a todo',
      'DELETE /api/todos': 'Delete all todos'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  initializeTodosFile();
  console.log(`🚀 Todo API server running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}`);
});

module.exports = app; 