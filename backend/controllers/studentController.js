const Student = require('../models/Student');
let students = require('../data/studentData');

exports.getAllStudents = (req, res) => {
  res.json(students);
};

exports.getStudentById = (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (student) {
    res.json({ ...student, averageGrade: student.calculateAverageGrade() });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

exports.addStudent = (req, res) => {
  const newStudent = new Student(req.body.id, req.body.name, req.body.department, req.body.semester);
  students.push(newStudent);
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);
  if (studentIndex !== -1) {
    students[studentIndex] = { ...students[studentIndex], ...req.body };
    res.json(students[studentIndex]);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

exports.deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.status(204).end();
};
