import { AiOutlineDelete } from "react-icons/ai";
import useGetTask from "../hooks/useGetTask";
import { IoPencilOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const TaskBody = () => {
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const { data, refetch } = useGetTask();

  useEffect(() => {
    if (data) {
      filterTasks(data);
    }
  }, [data]);

  const filterTasks = (tasks) => {
    const todos = tasks.filter((task) => task.category === "todo");
    const inProgress = tasks.filter((task) => task.category === "progress");
    const completed = tasks.filter((task) => task.category === "done");

    setTodo(todos);
    setProgress(inProgress);
    setDone(completed);
  };

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`http://localhost:4545/tasks/${id}`);
    if (data.deletedCount > 0) {
      toast.success("Delete success");
      refetch();
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* To Do */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-3xl bg-gray-500/10">
        <h1 className="col-span-3 text-center font-bold mb-2 text-2xl">
          To Do
        </h1>
        {todo.length > 0 ? (
          todo.map((task) => (
            <div
              key={task?._id}
              className="border p-2 group rounded-2xl border-gray-200 shadow-md bg-white relative"
            >
              <div className="hidden group-hover:flex transform duration-200">
                <button
                  onClick={() => handleDelete(task?._id)}
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-0 hover:bg-gray-100 bg-white border-gray-400"
                >
                  <AiOutlineDelete />
                </button>
                <button className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-8 hover:bg-gray-100 bg-white border-gray-400">
                  <IoPencilOutline />
                </button>
              </div>
              <h1 className="text-xl pb-1 border-b border-gray-300 ">
                {task?.title}
              </h1>
              <p className="break-words">{task?.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No tasks available</p>
        )}
      </div>

      {/* In Progress */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-3xl bg-gray-500/10">
        <h1 className="col-span-3 text-center font-bold mb-2 text-2xl">
          In Progress
        </h1>
        {progress.length > 0 ? (
          progress.map((task) => (
            <div
              key={task?._id}
              className="border p-2 group rounded-2xl border-gray-200 shadow-md bg-white relative"
            >
              <div className="hidden group-hover:flex transform duration-200">
                <button
                  onClick={() => handleDelete(task?._id)}
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-0 hover:bg-gray-100 bg-white border-gray-400"
                >
                  <AiOutlineDelete />
                </button>
                <button className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-8 hover:bg-gray-100 bg-white border-gray-400">
                  <IoPencilOutline />
                </button>
              </div>
              <h1 className="text-xl pb-1 border-b border-gray-300 ">
                {task?.title}
              </h1>
              <p className="break-words">{task?.description}</p>
            </div>
 ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No tasks available</p>
        )}
      </div>

      {/* Done */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-3xl bg-gray-500/10">
        <h1 className="col-span-3 text-center font-bold mb-2 text-2xl">
          Done
        </h1>
        {done.length > 0 ? (
          done.map((task) => (
            <div
              key={task?._id}
              className="border p-2 group rounded-2xl border-gray-200 shadow-md bg-white relative"
            >
              <div className="hidden group-hover:flex transform duration-200">
                <button
                  onClick={() => handleDelete(task?._id)}
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-0 hover:bg-gray-100 bg-white border-gray-400"
                >
                  <AiOutlineDelete />
                </button>
                <button className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-8 hover:bg-gray-100 bg-white border-gray-400">
                  <IoPencilOutline />
                </button>
              </div>
              <h1 className="text-xl pb-1 border-b border-gray-300 ">
                {task?.title}
              </h1>
              <p className="break-words">{task?.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskBody;