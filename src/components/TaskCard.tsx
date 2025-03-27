import React, { useState } from "react";
import EditIcon from "../assets/editicon.png";
import DeleteIcon from "../assets/trashicon.png";

interface Task {
  name: string;
  description: string;
  date: string;
  time: string;
}

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [isDone, setIsDone] = useState(false);

  const handleCheckboxChange = () => {
    setIsDone(!isDone);
  };

  return (
    <div className="task-card">
      <div className={`task-status ${isDone ? "done" : "not-done"}`}>
        <span>{isDone ? "Done" : "Not done"}</span>
      </div>

      <div className="task-actions">
        <img src={EditIcon} alt="Edit Task" className="task-icon" onClick={onEdit} />
        <img src={DeleteIcon} alt="Delete Task" className="task-icon" onClick={onDelete} />
      </div>

      <h3 className={`task-title ${isDone ? "strikethrough" : ""}`}>{task.name}</h3>
      <p className={`task-description ${isDone ? "strikethrough" : ""}`}>{task.description}</p>

      <div className="task-footer">
        <p className="task-date">{task.date}</p>
        <p className="task-time">{task.time}</p>
        <input 
          type="checkbox" 
          className="task-checkbox" 
          onChange={handleCheckboxChange} 
          checked={isDone} 
        />
      </div>
    </div>
  );
};

export default TaskCard;
