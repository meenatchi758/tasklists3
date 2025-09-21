import { useState } from "react";
import "./style.css"; // Import the CSS file

function TaskList({ tasks, setTasks }) {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  return (
    <div className="task-list">
      <div className="filter-buttons">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
        <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>Active</button>
        <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {filteredTasks.map(task => (
        <div key={task.id} className="task-item">
          <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
          <EditableText task={task} onSave={newText => editTask(task.id, newText)} />
          <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
        </div>
      ))}
    </div>
  );
}

function EditableText({ task, onSave }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  const handleBlur = () => {
    onSave(value);
    setEditing(false);
  };

  return editing ? (
    <input
      className="task-edit-input"
      value={value}
      autoFocus
      onChange={e => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={e => e.key === "Enter" && handleBlur()}
    />
  ) : (
    <span
      className={`task-text ${task.completed ? "completed" : ""}`}
      onDoubleClick={() => setEditing(true)}
    >
      {task.text}
    </span>
  );
}

export default TaskList;
