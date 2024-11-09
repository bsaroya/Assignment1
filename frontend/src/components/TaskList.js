import React from 'react';

const TaskList = ({ items, onDelete, onToggleCompletion, isStudent }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
          <span>{item.name || item.courseName}</span>
          <span>{isStudent ? (item.completed ? " (Completed)" : " (Not Completed)") : (item.completed ? " (Completed)" : " (Not Completed)")}</span>

          <button onClick={() => onToggleCompletion(item._id)}>
            {item.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => onDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
