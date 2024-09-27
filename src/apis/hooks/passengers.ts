import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getPassenger, getPassengers, getSearchPassengers } from "@/apis/https";

export const useGetPassengers = ({
  page = 1,
  pageSize = 30,
}: {
  page?: number;
  pageSize?: number;
} = {}) => {
  return useInfiniteQuery({
    queryKey: ["passenger", page, pageSize],
    queryFn: ({ pageParam }) =>
      getPassengers({ limit: pageSize, skip: pageParam }),
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

export const useGetSearchPassengers = ({
  sort = "createdAt DESC",
  where,
  page = 1,
  pageSize = 10,
}: {
  where: {
    first_name?: { contains: string };
    last_name?: { contains: string };
  };
  sort?: string;
  page?: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["passenger", where, page, pageSize, sort],
    queryFn: () => getSearchPassengers({ where, sort, page, pageSize }),
  });
};
