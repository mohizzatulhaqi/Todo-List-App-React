import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import FilterButton from "../assets/filterbutton.png";
import AddButton from "../assets/addbutton.png";

interface Task {
  name: string;
  description: string;
  date: string;
  time: string;
  isDone: boolean;
}

type FilterType = "all" | "done" | "not-done";

const TodoList: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState < Task[] > (() => {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [filter, setFilter] = useState < FilterType > ("all");

    const [editTask, setEditTask] = useState < Task | null > (null);
    const [editIndex, setEditIndex] = useState < number | null > (null);

    const toggleForm = () => {
      setShowForm(!showForm);
      setEditTask(null);
      setEditIndex(null);
    };

    const addTask = (task: Task) => {
      if (editIndex !== null) {
        const updatedTasks = tasks.map((t, index) =>
          index === editIndex ? task : t
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      } else {
        const updatedTasks = [...tasks, {
          ...task,
          isDone: false
        }];
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

    const toggleTaskStatus = (index: number) => {
      const updatedTasks = [...tasks];
      updatedTasks[index].isDone = !updatedTasks[index].isDone;
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const filteredTasks = tasks.filter((task) => {
      if (filter === "done") return task.isDone;
      if (filter === "not-done") return !task.isDone;
      return true;
    });

    const doneCount = tasks.filter(task => task.isDone).length;
    const notDoneCount = tasks.filter(task => !task.isDone).length;

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
            <button className={`filter ${filter==="all" ? "active" : "" }`} onClick={()=> setFilter("all")}
              >
              All <span>{tasks.length}</span>
            </button>
            <button className={`filter ${filter==="done" ? "active" : "" }`} onClick={()=> setFilter("done")}
              >
              Done <span>{doneCount}</span>
            </button>
            <button className={`filter ${filter==="not-done" ? "active" : "" }`} onClick={()=> setFilter("not-done")}
              >
              Not done <span>{notDoneCount}</span>
            </button>
            <span className="filter-task">
              <img src={FilterButton} alt="Filter Task" width="24" height="35" />
              <span>Filter Task</span>
            </span>
          </div>
          <div className="action-buttons">
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
          {filteredTasks.length === 0 ? (
            <p className="no-task-message">No Task Available</p>
              ) : (
                   filteredTasks.map((task) => {
                   const originalIndex = tasks.findIndex(
                  (t) => JSON.stringify(t) === JSON.stringify(task)
              );

        return (
          <TaskCard
            key={originalIndex}
            task={task}
            onDelete={() => deleteTask(originalIndex)}
            onEdit={() => handleEditTask(task, originalIndex)}
            toggleStatus={() => toggleTaskStatus(originalIndex)}
          />
        );
      })
    )}
  </div>
</div>

      </div>
    </div>
    );
    };

export default TodoList;