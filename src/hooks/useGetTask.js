import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
const useGetTask = () => {
  const axiosSecure = useAxiosSecure();
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
      const { data } = await axiosSecure.get(`/tasks?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });
  return { isPending, data, refetch, isFetching, isLoading };
};

export default useGetTask;
