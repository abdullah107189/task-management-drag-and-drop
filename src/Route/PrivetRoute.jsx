/* eslint-disable react/prop-types */
import { useContext } from "react";
import './priveteRoute.css'
import { AuthContext } from "../Provider/AuthProvider";

const PrivetRoute = ({ children }) => {
  const { isLoading, user } = useContext(AuthContext);
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[80vh]"><span className="loader"></span></div>;
  }
  if (user) {
    return children;
  }
  return (
    <p className="max-w-8xl mx-auto text-center md:text-5xl text-3xl min-h-[70vh] flex items-center justify-center">
      Please Login First
    </p>
  );
};

export default PrivetRoute;
