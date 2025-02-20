import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useGetTask = () => {
  const {
    isPending,
    isFetching,
    isLoading,
    data = [],
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:4545/tasks");
      return data;
    },
  });
  return { isPending, data, refetch,isFetching,isLoading };
};

export default useGetTask;
