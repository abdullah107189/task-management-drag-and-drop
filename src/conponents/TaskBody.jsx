import useGetTask from "../hooks/useGetTask";

const TaskBody = () => {
  const { data } = useGetTask();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-5 gap-2">
      {data?.map((task) => (
        <div
          key={task?._id}
          className="border p-2 rounded-2xl border-gray-200 shadow-md bg-white"
        >
          <h1 className="text-xl pb-1 border-b border-gray-300 ">
            {task?.title}
          </h1>
          <p>{task?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskBody;
