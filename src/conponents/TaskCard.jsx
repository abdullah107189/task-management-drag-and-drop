/* eslint-disable react/prop-types */
import { useDrag } from "react-dnd";
import { AiOutlineDelete } from "react-icons/ai";
import { IoPencilOutline } from "react-icons/io5";

const TaskCard = ({ task, handleDelete, handleUpdate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id, category: task.category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div    
      ref={drag}
      className={`border p-2 group rounded-2xl border-gray-200 shadow-md bg-white relative cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="hidden group-hover:flex transform duration-200">
        <button
          onClick={() => handleDelete(task._id)} 
          className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-0 hover:bg-fuchsia-100 bg-white border-fuchsia-400"
        >
          <AiOutlineDelete className="text-fuchsia-400" />
        </button>

        <button
          onClick={() => handleUpdate(task._id)} // ✅ Update ফাংশন কাজ করবে
          className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-8 hover:bg-fuchsia-100 bg-white border-fuchsia-400"
        >
          <IoPencilOutline className="text-fuchsia-400" />
        </button>
      </div>
      <h1 className="text-xl pb-1 border-b border-gray-300">{task?.title}</h1>
      <p className="break-words">{task?.description}</p>
    </div>
  );
};

export default TaskCard;
