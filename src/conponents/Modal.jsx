/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGetTask from "../hooks/useGetTask";

const Modal = ({ isOpen, setIsOpen, task }) => {
  const { refetch } = useGetTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task]);

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

    const updateTask = { title, description, createdAt: new Date() };
    const { data } = await axios.put(
      `http://localhost:4545/tasks/${task._id}`,
      updateTask
    );
    if (data.modifiedCount > 0) {
      toast.success("Update Success");
      setIsOpen(false);
      refetch();
    }
  };

  return (
    <dialog open={isOpen} className="modal bg-gray-500/50 ">
      <div className="modal-box rounded-4xl">
        <form onSubmit={handleSubmit} className="rounded-lg my-6">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-400 font-semibold text-xl focus:outline-none rounded-2xl mb-2 bg-white"
          />
          <div className="flex items-center justify-center gap-5">
            <textarea
              placeholder="Description (optional)"
              maxLength={200}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-400 focus:outline-none rounded-2xl mb-2 min-h-18 max-h-32 bg-white"
            />
            <button type="submit" className="outletBtn w-52">
              Update
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsOpen(false)}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
