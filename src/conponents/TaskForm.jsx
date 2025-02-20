import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import useGetTask from "../hooks/useGetTask";
import { AuthContext } from "../Provider/AuthProvider";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const { user } = useContext(AuthContext);
  const { refetch, isFetching } = useGetTask();
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
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
      email: user?.email,
      description: description,
      category: "todo",
      createdAt: new Date(),
    };
    const { data } = await axios.post("http://localhost:4545/tasks", newTask);
    if (data.insertedId) {
      refetch();
      setTitle("");
      setDescription("");
    }
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
          className="w-full p-2 border border-gray-400 font-semibold text-xl focus:outline-none rounded-2xl mb-2 bg-white"
        />
        <div className="flex  items-center justify-center gap-5">
          <textarea
            placeholder="Description (optional)"
            maxLength={200}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-400 focus:outline-none rounded-2xl mb-2 min-h-18 max-h-32 bg-white"
          />
          <button type="submit" className="outletBtn w-52">
            {isFetching ? "Adding" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
