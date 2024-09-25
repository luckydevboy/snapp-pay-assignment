import { useQuery } from "@tanstack/react-query";
import { getPassengers } from "@/apis/https";

export const useGetPassengers = () =>
  useQuery({ queryKey: ["passenger"], queryFn: getPassengers });
