import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import CourseForm from './components/CourseForm';
import TaskList from './components/TaskList';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch students and courses on load
  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const studentResponse = await axios.get('http://localhost:5000/api/students');
        setStudents(studentResponse.data);

        const courseResponse = await axios.get('http://localhost:5000/api/courses');
        setCourses(courseResponse.data);
      } catch (error) {
        console.error("Error fetching students or courses:", error);
      }
    };
    fetchStudentsAndCourses();
  }, []);

  // Handle adding a student
  const handleStudentAdded = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  // Handle deleting a student
  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${studentId}`);
      setStudents((prevStudents) => prevStudents.filter(student => student._id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Handle toggling student completion status
  const handleToggleCompletion = async (studentId) => {
    try {
      const updatedStudent = students.find(student => student._id === studentId);
      updatedStudent.completed = !updatedStudent.completed;

      const response = await axios.put(`http://localhost:5000/api/students/${studentId}`, { completed: updatedStudent.completed });

      setStudents((prevStudents) =>
        prevStudents.map(student =>
          student._id === studentId ? response.data : student
        )
      );
    } catch (error) {
      console.error('Error toggling student completion:', error);
    }
  };

  // Handle adding a course
  const handleCourseAdded = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  // Handle deleting a course
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
      setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Handle toggling course completion status
  const handleToggleCourseCompletion = async (courseId) => {
    try {
      const updatedCourse = courses.find(course => course._id === courseId);
      updatedCourse.completed = !updatedCourse.completed;

      const response = await axios.put(`http://localhost:5000/api/courses/${courseId}`, { completed: updatedCourse.completed });

      setCourses((prevCourses) =>
        prevCourses.map(course =>
          course._id === courseId ? response.data : course
        )
      );
    } catch (error) {
      console.error('Error toggling course completion:', error);
    }
  };

  return (
    <div className="App">
      <h1>Student Course Management</h1>

      {/* Students Section */}
      <h2>Students</h2>
      <StudentForm onStudentAdded={handleStudentAdded} />
      <TaskList 
        items={students}
        onDelete={handleDeleteStudent}
        onToggleCompletion={handleToggleCompletion}
        isStudent={true}
      />

      {/* Courses Section */}
      <h2>Courses</h2>
      <CourseForm onCourseAdded={handleCourseAdded} />
      <TaskList 
        items={courses}
        onDelete={handleDeleteCourse}
        onToggleCompletion={handleToggleCourseCompletion}
        isStudent={false}
      />
    </div>
  );
}

export default App;
