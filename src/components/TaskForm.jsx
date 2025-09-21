import { useState } from "react";

function TaskForm({ setTasks }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return alert("Task cannot be empty");

    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), text: text.trim(), completed: false }
    ]);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add new task"
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}

export default TaskForm;
