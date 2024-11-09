import React from 'react';
import TaskList from './TaskList';

function StudentDetail({ studentId, studentName }) {
  return (
    <div>
      <h1>{studentName}</h1>
      <TaskList studentId={studentId} />
    </div>
  );
}

export default StudentDetail;
