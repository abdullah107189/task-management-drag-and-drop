import { AiOutlineDelete } from "react-icons/ai";
import useGetTask from "../hooks/useGetTask";
import { IoPencilOutline } from "react-icons/io5";

const TaskBody = () => {
  const { data } = useGetTask();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-5 gap-2">
      {data?.map((task) => (
        <div
          key={task?._id}
          className="border p-2 group rounded-2xl border-gray-200 shadow-md bg-white relative"
        >
          {console.log(task?.description.toString())}
          <div className="hidden group-hover:flex transform duration-200">
            <button className="border p-1 rounded-full cursor-pointer mr-2 absolute -top-4 right-0 hover:bg-gray-100 bg-white border-gray-400">
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
      ))}
    </div>
  );
};

export default TaskBody;
