import React, { useState } from 'react';
import axios from 'axios';

function CourseForm({ onCourseAdded }) {
  const [course, setCourse] = useState({ name: '', department: '', isOpen: true });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/courses', course);
      onCourseAdded(response.data); 
      setCourse({ name: '', department: '', isOpen: true }); 
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Course</h2>
      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={course.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={course.department}
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="isOpen"
          checked={course.isOpen}
          onChange={handleChange}
        />
        Is Open
      </label>
      <button type="submit">Add Course</button>
    </form>
  );
}

export default CourseForm;
