import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import FilterButton from "/Users/kiki/to-do-list-app-group4/src/assets/filterbutton.png";
import AddButton from "/Users/kiki/to-do-list-app-group4/src/assets/addbutton.png";

interface Task {
  name: string;
  description: string;
  date: string;
  time: string;
}

const TodoList: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState < Task[] > ([]);

    const toggleForm = () => {
      setShowForm(!showForm);
    };

    const addTask = (task: Task) => {
      setTasks([...tasks, task]);
      console.log("Task added:", task);
      setShowForm(false);
    };

    const today = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const greeting = () => {
      const hour = new Date().getHours();

      if (hour >= 0 && hour < 12) {
        return "Good Morning! ☀️"
      } else if (hour > 12 && hour < 18) {
        return "Good Afternoon! 🌤️"
      } else {
        return "Good Evening! 🌙"
      }
    }
    
    const deleteTask = (indexToDelete: number) => {
      setTasks(tasks.filter((_, index) => index !== indexToDelete));
    };
    

  return (
  <div className="container">
    <div className="todo-list">
      <h1 className="title">TODO LIST</h1>

      <div className="greeting-section">
        <p className="greeting">{greeting()}</p>
        <p className="date">{today}</p>
      </div>

      <br />

      <div className="filter-section">
        <div className="filter-buttons">
          <button className="filter active">All <span>{tasks.length}</span></button>
          <button className="filter">Done <span>0</span></button>
          <button className="filter">Not done <span>0</span></button>
        </div>
        <div className="action-buttons">
          <button className="filter-task">
            <img src={FilterButton} alt="Filter Task" width="24" height="35" />
            <span>Filter Task</span>
          </button>

          <button className="add-task" onClick={toggleForm}>
            <img src={AddButton} alt="Add Task" width="24" height="35" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <br />

      {showForm &&
      <TaskForm addTask={addTask} onClose={toggleForm} />}

      <div className="task-list-container">
        <div className="task-list">
          {tasks.map((task, index) => (
          <TaskCard key={index} task={task} onDelete={()=> deleteTask(index)}
            onEdit={() => console.log("Edit task:", task.name)}
            />
            ))}
        </div>
      </div>
    </div>
  </div>
  );
  };

  export default TodoList;