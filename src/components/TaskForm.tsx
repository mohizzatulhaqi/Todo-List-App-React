import React, { useState } from "react";
import CalendarIcon from "../assets/calendaricon.png";
import ClockIcon from "../assets/clockicon.png";

interface Task {
  name: string;
  description: string;
  date: string;
  time: string;
  isDone: boolean
}

interface TaskFormProps {
  addTask: (task: Task) => void;
  onClose: () => void;
  editTaskData ? : Task | null;
}

const TaskForm: React.FC < TaskFormProps > = ({
    addTask,
    onClose,
    editTaskData
  }) => {
    const [taskName, setTaskName] = useState(editTaskData ? editTaskData.name : "");
    const [taskDescription, setTaskDescription] = useState(editTaskData ? editTaskData.description : "");
    const [taskDate, setTaskDate] = useState(editTaskData ? editTaskData.date : "");
    const [taskTime, setTaskTime] = useState(
      editTaskData ? editTaskData.time : new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      })
    );

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (taskName.trim() !== "" && taskDate.trim() !== "" && taskTime.trim() !== "") {
        addTask({
          name: taskName,
          description: taskDescription,
          date: taskDate,
          time: taskTime,
          isDone: editTaskData ? editTaskData.isDone : false,
        });
        onClose();
      }
    };
    
  return (
    <div className="task-form">
      <div className="task-form-header">
        <span>{editTaskData ? "Edit Task" : "Task Form"}</span>
        <button className="close-button" onClick={onClose}>✖</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name <span className="required">*</span>
          <input type="text" placeholder="Enter task name..." value={taskName} onChange={(e)=>
          setTaskName(e.target.value)}
          required
          maxLength={50}
          />
        </label>

        <label>
          Task Description
          <textarea placeholder="Enter task description..." value={taskDescription} onChange={(e)=> setTaskDescription(e.target.value)}
          maxLength={100}
          />
        </label>

        <label>
          Deadline <span className="required">*</span>
          <div className="deadline-inputs">
            <div className="input-container">
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                required
                className="input-field"
              />
              <span className="icon">
                <img src={CalendarIcon} alt="Calendar Icon" width="24" height="34" />
              </span>
            </div>

            <div className="input-container">
              <input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                required
                className="input-field"
              />
              <span className="icon">
                <img src={ClockIcon} alt="Clock Icon" width="24" height="34" />
              </span>
            </div>
          </div>
        </label>

        <button type="submit" className="submit-button">
          {editTaskData ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
