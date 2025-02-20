import { useState } from "react";
import { toast } from "react-hot-toast";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate title length
    if (title.length > 50) {
      return toast.error("Title must not exceed 50 characters.");
    }

    // Validate description length
    if (description.length > 200) {
      return toast.error("Description must not exceed 200 characters.");
    }
    const newTask = {
      title: title,
      description: description,
      category: "todo",
      createdAt: new Date(),
    };

    console.log(newTask);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="rounded-lg my-6">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border border-gray-400 focus:outline-none rounded mb-2"
        />
        <textarea
          placeholder="Description (optional)"
          maxLength={200}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-400 focus:outline-none rounded mb-2 min-h-18 max-h-32"
        />
        <button type="submit" className="outletBtn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
