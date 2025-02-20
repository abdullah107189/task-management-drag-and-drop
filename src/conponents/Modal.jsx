import { useState } from "react";
import useGetTask from "../hooks/useGetTask";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, setIsOpen, task }) => {
  const [title, setTitle] = useState("");
  console.log(task);
//   const { title, description } = task;
  const { refetch } = useGetTask();
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
    const updateTask = {
      title: title,
      description: description,
    };
  };
  return (
    <dialog open={isOpen} className="modal bg-gray-500/50">
      <div className="modal-box">
        <form onSubmit={handleSubmit} className="rounded-lg my-6">
          <input
            type="text"
            placeholder="Task title"
            defaultValue={task?.title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-400 font-semibold text-xl focus:outline-none rounded-2xl mb-2 bg-white"
          />
          <div className="flex  items-center justify-center gap-5">
            <textarea
              placeholder="Description (optional)"
              maxLength={200}
              required
              defaultValue={task?.description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-400 focus:outline-none rounded-2xl mb-2 min-h-18 max-h-32 bg-white"
            />
            <button onClick={()=>handleUpdate(task?._id)} type="submit" className="outletBtn w-52">
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
