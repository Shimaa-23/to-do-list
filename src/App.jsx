import { useState } from "react";
import "./App.css";
import trashIcon from "./assets/material-symbols_delete.png";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (task.trim().length < 5) {
        setShowWarning(true);
        return;
      }

      const newTask = {
        id: Date.now(),
        text: task.trim(),
        completed: false,
      };

      setTasks([newTask, ...tasks]);
      setTask("");
      setShowWarning(false);
    }
  };

  const handleChange = (e) => {
    setTask(e.target.value);

    if (showWarning && e.target.value.trim().length >= 5) {
      setShowWarning(false);
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <div className="card">
        <input
          className="top-input"
          type="text"
          placeholder="Create a task"
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        {showWarning && (
          <div className="warning">Task must be minimum 5 characters</div>
        )}

        <div className="task-list">
          {tasks.map((t) => (
            <div className="task-item" key={t.id}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id)}
              />
              <span className={t.completed ? "task-text completed" : "task-text"}>
                {t.text}
              </span>
              <img
                src={trashIcon}
                alt="Delete"
                className="trash-icon"
                onClick={() => deleteTask(t.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
