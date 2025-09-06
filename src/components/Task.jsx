import { useEffect, useState } from "react";

export default function Task({ task, onDelete, onEdit, onToggle }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <small> ⏱ {seconds}s</small>
      <div className="actions">
        <button onClick={() => onEdit(task.id)}>✏️</button>
        <button onClick={() => onDelete(task.id)}>❌</button>
      </div>
    </div>
  );
}
