const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import data from the data folder
const students = require('./data/studentData');
const courses = require('./data/courseData');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Database setup (if you are using MongoDB as well)
mongoose.connect('mongodb://localhost:27017/taskdb')
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Failed to connect to database', err));

// Root route to test the server
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API');
});

// Routes to serve student and course data

// Get all students (from data/studentData.js)
app.get('/api/students', (req, res) => {
  res.status(200).send(students);
});

// Get all courses (from data/courseData.js)
app.get('/api/courses', (req, res) => {
  res.status(200).send(courses);
});

// Example of adding a student and course (using database if you need)
app.post('/api/students', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).send(newStudent);
});

app.post('/api/courses', async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).send(newCourse);
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
