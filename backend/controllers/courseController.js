const OngoingCourse = require('../models/OngoingCourse');
const courses = require('../data/courseData');

exports.getAllCourses = (req, res) => {
  res.json(courses);
};

exports.addCourse = (req, res) => {
  const { id, name, department, isOpen } = req.body;
  const newCourse = new OngoingCourse(id, name, department, isOpen);
  courses.push(newCourse);
  res.status(201).json(newCourse);
};
