import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const axiosSecure = axios.create({
  baseURL: "http://localhost:4545",
});
const useAxiosSecure = () => {
  // const { logoutUser } = useContext(AuthContext);
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        // logoutUser();
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
