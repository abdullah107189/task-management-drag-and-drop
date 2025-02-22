import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import useGetTask from "../hooks/useGetTask";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("todo");
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { refetch, isFetching } = useGetTask();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length > 50) {
      return toast.error("Title must not exceed 50 characters.");
    }
    if (description.length > 200) {
      return toast.error("Description must not exceed 200 characters.");
    }

    const newTask = {
      title,
      email: user?.email,
      description,
      category,
      createdAt: new Date(),
    };

    const { data } = await axiosSecure.post("/tasks", newTask);
    if (data.insertedId) {
      refetch();
      setTitle("");
      setDescription("");
      setCategory("todo");
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
          className="w-full p-2 border border-gray-300 font-semibold text-xl focus:outline-none rounded-2xl mb-2 bg-white"
        />
        <div className="flex items-center justify-center gap-5">
          <textarea
            placeholder="Description (optional)"
            maxLength={200}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 focus:outline-none rounded-2xl mb-2 min-h-18 max-h-32 bg-white"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-2xl bg-white"
          >
            <option value="todo">To-Do</option>
            <option value="progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button type="submit" className="outletBtn w-52">
            {isFetching ? "Adding" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
