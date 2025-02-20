import { Outlet } from "react-router-dom";
import Navbar from "./conponents/navbar";

function App() {
  return (
    <div className="bg-gray-500/10 min-h-screen">
      <Navbar></Navbar>
      <div className="mxw px-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
