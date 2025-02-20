import { AiOutlineDelete } from "react-icons/ai";
import useGetTask from "../hooks/useGetTask";
import { IoPencilOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const TaskBody = () => {
  const [todo, setTodo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const { data, refetch } = useGetTask();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (data) {
      const todos = data.filter((task) => task.category === "todo");
      const inProgress = data.filter((task) => task.category === "progress");
      const completed = data.filter((task) => task.category === "done");

      if (JSON.stringify(todos) !== JSON.stringify(todo)) setTodo(todos);
      if (JSON.stringify(inProgress) !== JSON.stringify(progress))
        setProgress(inProgress);
      if (JSON.stringify(completed) !== JSON.stringify(done))
        setDone(completed);
    }
  }, [data, todo, progress, done]);

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`http://localhost:4545/tasks/${id}`);
    if (data.deletedCount > 0) {
      toast.success("Delete success");
      refetch();
    }
  };
  const handleUpdate = async (id) => {
    const { data } = await axios.get(`http://localhost:4545/tasks/${id}`);

    if (data) {
      setIsOpen(!isOpen);
      setTask(data);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      {/* To Do */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-1 p-1 rounded-3xl bg-gray-500/10">
        <h1 className="xl:col-span-3 lg:col-span-2 text-center font-bold mb-2 md:text-2xl text-xl">
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
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-0 hover:bg-fuchsia-100 bg-white border-fuchsia-400"
                >
                  <AiOutlineDelete className="text-fuchsia-400" />
                </button>

                <button
                  onClick={() => handleUpdate(task?._id)}
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-8 hover:bg-fuchsia-100 bg-white border-fuchsia-400"
                >
                  <IoPencilOutline className="text-fuchsia-400" />
                </button>
              </div>
              <h1 className="text-xl pb-1 border-b border-gray-300 ">
                {task?.title}
              </h1>
              <p className="break-words">{task?.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No tasks available
          </p>
        )}
      </div>

      {/* In Progress */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-1 p-1 rounded-3xl bg-gray-500/10">
        <h1 className="xl:col-span-3 lg:col-span-2 text-center font-bold mb-2 md:text-2xl text-xl">
          Progress
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
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-0 hover:bg-fuchsia-100 bg-white border-fuchsia-400"
                >
                  <AiOutlineDelete className="text-fuchsia-400" />
                </button>

                <button
                  onClick={() => handleUpdate(task?._id)}
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-8 hover:bg-fuchsia-100 bg-white border-fuchsia-400"
                >
                  <IoPencilOutline className="text-fuchsia-400" />
                </button>
              </div>
              <h1 className="text-xl pb-1 border-b border-gray-300 ">
                {task?.title}
              </h1>
              <p className="break-words">{task?.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No tasks available
          </p>
        )}
      </div>

      {/* Done */}
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-1 p-1 rounded-3xl bg-gray-500/10">
        <h1 className="xl:col-span-3 lg:col-span-2 text-center font-bold mb-2 md:text-2xl text-xl">
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
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-0 hover:bg-fuchsia-100 bg-white border-fuchsia-400"
                >
                  <AiOutlineDelete className="text-fuchsia-400" />
                </button>

                <button
                  onClick={() => handleUpdate(task?._id)}
                  className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-8 hover:bg-fuchsia-100 bg-white border-fuchsia-400"
                >
                  <IoPencilOutline className="text-fuchsia-400" />
                </button>
              </div>
              <h1 className="text-xl pb-1 border-b border-gray-300 ">
                {task?.title}
              </h1>
              <p className="break-words">{task?.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No tasks available
          </p>
        )}
      </div>

      {task && (
        <Modal task={task} isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
      )}
    </div>
  );
};

export default TaskBody;
