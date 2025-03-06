// import useSWR from "swr";

// import fetcher from "@/libs/fetcher";

// const useCurrentUser = () => {
//     const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
//     return {
//         data,
//         error,
//         isLoading,
//         mutate
//     }
// }

// export default useCurrentUser

import useSWR from "swr";
import getCurrentUser from "@/actions/getCurrentUser"; 

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "currentUser",
    getCurrentUser
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
