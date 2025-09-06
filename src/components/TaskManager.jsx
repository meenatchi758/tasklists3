import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Task from "./Task";

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id) => {
    const newText = prompt("Edit task:");
    if (newText) {
      setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="task-manager">
      <h1>Task Manager ✅</h1>

      <div className="add-task">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <p>No tasks yet. 🚀</p>}
        {tasks.map((t) => (
          <Task
            key={t.id}
            task={t}
            onDelete={deleteTask}
            onEdit={editTask}
            onToggle={toggleTask}
          />
        ))}
      </div>
    </div>
  );
}
