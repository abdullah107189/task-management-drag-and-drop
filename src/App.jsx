import { Outlet } from "react-router-dom";
import Navbar from "./conponents/navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="mxw px-4">
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
