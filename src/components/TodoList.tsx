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

const TodoList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditTask(null);
    setEditIndex(null);
  };

  const addTask = (task: Task) => {
    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? { ...task, isDone: t.isDone } : t
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const updatedTasks = [...tasks, { ...task, isDone: false }];
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

  const doneCount = tasks.filter(task => task.isDone).length;
  const notDoneCount = tasks.filter(task => !task.isDone).length;

  return (
    <div className="container">
      <div className="todo-list">
        <h1 className="title">TODO LIST</h1>

        <div className="filter-section">
          <div className="filter-buttons">
            <button className="filter active">All <span>{tasks.length}</span></button>
            <button className="filter">Done <span>{doneCount}</span></button>
            <button className="filter">Not done <span>{notDoneCount}</span></button>
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

        {showForm && <TaskForm addTask={addTask} onClose={toggleForm} editTaskData={editTask} />}

        <div className="task-list">
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              onDelete={() => deleteTask(index)}
              onEdit={() => handleEditTask(task, index)}
              toggleStatus={() => toggleTaskStatus(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
