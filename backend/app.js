const express = require('express');
const cors = require('cors');
const path = require('path');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

// Serve React app from backend
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

module.exports = app;
