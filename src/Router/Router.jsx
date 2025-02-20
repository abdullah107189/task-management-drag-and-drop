import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import PrivetRoute from "../Route/PrivetRoute";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: (
          <PrivetRoute>
            <Home></Home>
          </PrivetRoute>
        ),
      },
    ],
  },
]);
export default Router;
