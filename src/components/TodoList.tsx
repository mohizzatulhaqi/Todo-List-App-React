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
    const [tasks, setTasks] = useState < Task[] > (() => {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [editTask, setEditTask] = useState < Task | null > (null);
    const [editIndex, setEditIndex] = useState < number | null > (null);

    const toggleForm = () => {
      setShowForm(!showForm);
      setEditTask(null);
      setEditIndex(null);
    };

    const addTask = (task: Task) => {
      if (editIndex !== null) {
        // Edit task yang sudah ada
        const updatedTasks = tasks.map((t, index) =>
          index === editIndex ? task : t
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      } else {
        // Tambah task baru
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
      setShowForm(false);
      setEditTask(null);
      setEditIndex(null);
    };

    const deleteTask = (indexToDelete: number) => {
      const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleEditTask = (task: Task, index: number) => {
      setEditTask(task);
      setEditIndex(index);
      setShowForm(true);
    };

    const today = new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const greeting = () => {
      const hour = new Date().getHours();
      if (hour >= 0 && hour <= 12) return "Good Morning! ☀️";
      if (hour > 12 && hour < 18) return "Good Afternoon! 🌤️";
      return "Good Evening! 🌙";
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
      <TaskForm addTask={addTask} onClose={toggleForm} editTaskData={editTask} />}

      <div className="task-list-container">
        <div className="task-list">
          {tasks.map((task, index) => (
          <TaskCard key={index} task={task} onDelete={()=> deleteTask(index)}
            onEdit={() => handleEditTask(task, index)}
            />
            ))}
        </div>
      </div>
    </div>
  </div>
  );
  };

  export default TodoList;
