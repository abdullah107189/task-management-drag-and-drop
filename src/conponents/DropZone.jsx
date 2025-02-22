import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const DropZone = ({ category, tasks, setTasks, onDrop, handleDelete, handleUpdate }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(item.id, category);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveTask = (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div
      ref={drop}
      className={`grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-1 p-1 rounded-3xl bg-gray-500/10 ${
        isOver ? "bg-green-100" : ""
      }`}
    >
      <h1 className="xl:col-span-3 lg:col-span-2 text-center font-bold mb-2 md:text-2xl text-xl">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <TaskCard
            key={task._id}
            task={task}
            index={index}
            moveTask={moveTask}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">No tasks available</p>
      )}
    </div>
  );
};

export default DropZone;