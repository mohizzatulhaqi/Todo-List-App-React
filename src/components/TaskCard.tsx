import React, { useState } from "react";
import EditIcon from "../assets/editicon.png";
import DeleteIcon from "../assets/trashicon.png";
import TrashIlust from "../assets/trashilust.png";

interface Task {
  name: string;
  description: string;
  date: string;
  time: string;
  isDone: boolean; 
}

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
  toggleStatus: () => void; 
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit, toggleStatus }) => {
  const [isDone, setIsDone] = useState(task.isDone);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCheckboxChange = () => {
    setIsDone(!isDone);
    toggleStatus(); 
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  return (
    <div className="task-card">
      <div className={`task-status ${isDone ? "done" : "not-done"}`}>
        <span>{isDone ? "Done" : "Not done"}</span>
      </div>

      <div className="task-actions">
        <img src={EditIcon} alt="Edit Task" className="task-icon" onClick={onEdit} />
        <img src={DeleteIcon} alt="Delete Task" className="task-icon" onClick={handleDeleteClick} />
      </div>

      <h3 className={`task-title ${isDone ? "strikethrough" : ""}`}>{task.name}</h3>
      <p className={`task-description ${isDone ? "strikethrough" : ""}`}>{task.description}</p>

      <div className="task-footer">
        <p className={`task-date ${isDone ? "strikethrough" : ""}`}>{task.date}</p>
        <p className={`task-time ${isDone ? "strikethrough" : ""}`}>{task.time}</p>
        <input 
          type="checkbox" 
          className="task-checkbox" 
          onChange={handleCheckboxChange} 
          checked={isDone} 
        />
      </div>

      {showDeleteModal && (
        <div className="delete-modal">
          <div className="modal-content">
            <img src={TrashIlust} alt="Trash Ilust" className="trash-ilust" />
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="delete-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
