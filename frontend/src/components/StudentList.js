import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students').then((response) => {
      setStudents(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} - {student.department} - Average Grade: {student.averageGrade || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
