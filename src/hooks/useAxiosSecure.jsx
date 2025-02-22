import axios from "axios";
import toast from "react-hot-toast";
const axiosSecure = axios.create({
  // baseURL: "http://localhost:4545",
  baseURL: "https://task-management-server-side-liard.vercel.app/",
});
const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/login", { state: { location }, replace: true });
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
