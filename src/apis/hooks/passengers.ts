import { useQuery } from "@tanstack/react-query";

import { getPassenger, getPassengers, getSearchPassengers } from "@/apis/https";

export const useGetPassengers = (page: number, pageSize: number) => {
  const limit = pageSize;
  const skip = (page - 1) * pageSize;

  return useQuery({
    queryKey: ["passenger", page, pageSize],
    queryFn: () => getPassengers(limit, skip),
    select: (res) => res.items,
  });
};

export const useGetPassenger = (id: number) =>
  useQuery({
    queryKey: ["passenger", id],
    queryFn: () => getPassenger(id),
  });

export const useGetSearchPassengers = (params: {
  where: {
    first_name?: { contains: string };
    last_name?: { contains: string };
  };
  sort?: string;
  page?: number;
  pageSize?: number;
}) => {
  const { where, sort = "createdAt DESC", page = 1, pageSize = 10 } = params;

  return useQuery({
    queryKey: ["passenger", where, page, pageSize, sort],
    queryFn: () => getSearchPassengers({ where, sort, page, pageSize }),
  });
};
