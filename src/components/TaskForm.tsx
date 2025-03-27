import React, { useState } from "react";
import CalendarIcon from "/Users/kiki/to-do-list-app-group4/src/assets/calendaricon.png"
import ClockIcon from "/Users/kiki/to-do-list-app-group4/src/assets/clockicon.png"

interface Task {
    name: string;
    description: string;
    date: string;
    time: string;
}

interface TaskFormProps {
    addTask: (task: Task) => void;
    onClose: () => void;
}

const TaskForm: React.FC < TaskFormProps > = ({
        addTask,
        onClose
    }) => {
        const [taskName, setTaskName] = useState("");
        const [taskDescription, setTaskDescription] = useState("");
        const [taskDate, setTaskDate] = useState("");
        const [taskTime, setTaskTime] = useState("");

        const handleSubmit = (event: React.FormEvent) => {
            event.preventDefault();
            if (taskName.trim() !== "" && taskDate.trim() !== "" && taskTime.trim() !== "") {
                addTask({
                    name: taskName,
                    description: taskDescription,
                    date: taskDate,
                    time: taskTime
                });
                setTaskName("");
                setTaskDescription("");
                setTaskDate("");
                setTaskTime("");
            }
        };

    return (
    <div className="task-form">
        <div className="task-form-header">
            <span>Task Form</span>
            <button className="close-button" onClick={onClose}>✖</button>
        </div>
        <form onSubmit={handleSubmit}>
            <label>
                Task Name <span className="required">*</span>
                <input type="text" placeholder="Enter task name..." value={taskName} onChange={(e)=>
                setTaskName(e.target.value)}
                required
                />
            </label>

            <label>
                Task Description
                <textarea placeholder="Enter task description..." value={taskDescription} onChange={(e)=> setTaskDescription(e.target.value)}
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
          Add
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
