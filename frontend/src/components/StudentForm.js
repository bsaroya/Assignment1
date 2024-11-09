import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ onStudentAdded }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = { name, department, semester };
    try {
      const response = await axios.post('http://localhost:5000/api/students', newStudent);
      onStudentAdded(response.data);
      setName('');
      setDepartment('');
      setSemester('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" required />
      <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
      <input type="number" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="Semester" required />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
