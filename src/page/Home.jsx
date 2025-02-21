import { DndProvider } from "react-dnd";
import TaskBody from "../conponents/TaskBody";
import TaskForm from "../conponents/TaskForm";
import { HTML5Backend } from "react-dnd-html5-backend";

const Home = () => {
  return (
    <div>
      <TaskForm></TaskForm>
      <DndProvider backend={HTML5Backend}>
        <TaskBody></TaskBody>
      </DndProvider>
    </div>
  );
};

export default Home;
