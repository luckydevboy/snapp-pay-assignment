import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getPassenger, getPassengers } from "@/apis/https";

export const useGetPassengers = ({
  sort,
  where,
  page = 1,
  pageSize = 30,
}: {
  where?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
  sort?: string;
  page?: number;
  pageSize?: number;
} = {}) => {
  return useInfiniteQuery({
    queryKey: ["passenger", where, sort, page, pageSize],
    queryFn: ({ pageParam }) =>
      getPassengers({ limit: pageSize, skip: pageParam, where, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { skipped, total } = lastPage.meta;
      const nextPage = skipped + pageSize;

      if (nextPage >= total) {
        return undefined;
      }

      return nextPage;
    },
  });
};

export const useGetPassenger = (id: number) =>
  useQuery({
    queryKey: ["passenger", id],
    queryFn: () => getPassenger(id),
  });
