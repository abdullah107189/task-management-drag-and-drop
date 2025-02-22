import { useEffect, useState } from "react";
import useGetTask from "../hooks/useGetTask";
import axios from "axios";
import toast from "react-hot-toast";
import DropZone from "./DropZone";
import Modal from "./Modal";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TaskBody = () => {
  const axiosSecure = useAxiosSecure();
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const { data, refetch } = useGetTask();
  const [isOpen, setIsOpen] = useState(false);
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
  }, [data]);

  const handleDrop = async (id, newCategory) => {
    if (!id) {
      console.error("Error: Undefined ID received!");
      return;
    }

    try {
      const response = await axiosSecure.put(`/updateCategory/${id}`, {
        category: newCategory,
      });

      toast.success("Task moved successfully!");
      refetch();
    } catch (error) {
      console.error("Error moving task:", error);
      toast.error("Failed to move task!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosSecure.delete(`/tasks/${id}`);
      if (data.deletedCount > 0) {
        toast.success("Delete success");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axiosSecure.get(`/tasks/${id}`);
      if (data) {
        setIsOpen(true);
        setTask(data);
      }
    } catch (error) {
      toast.error("Failed to fetch task");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      <DropZone
        category="todo"
        tasks={todo}
        setTasks={setTodo}
        onDrop={handleDrop}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <DropZone
        category="progress"
        tasks={progress}
        setTasks={setProgress}
        onDrop={handleDrop}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <DropZone
        category="done"
        tasks={done}
        setTasks={setDone}
        onDrop={handleDrop}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />

      {task && <Modal task={task} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default TaskBody;
