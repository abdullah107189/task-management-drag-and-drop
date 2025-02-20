import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const useGetTask = () => {
  const { user } = useContext(AuthContext);
  const {
    isPending,
    isFetching,
    isLoading,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:4545/tasks?email=${user?.email}`
      );
      return data;
    },
  });
  return { isPending, data, refetch, isFetching, isLoading };
};

export default useGetTask;
