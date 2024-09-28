import ky from "./kyInstance";
import { PassengerDto, ResponseDto } from "@/apis";

export const getPassengers = (params: { limit: number; skip: number }) => {
  const { limit, skip } = params;
  return ky
    .get<ResponseDto<PassengerDto>>(`passenger?limit=${limit}&skip=${skip}`)
    .json();
};

export const getPassenger = (id: number) =>
  ky.get<PassengerDto>(`passenger/${id}`).json();

export const getSearchPassengers = (params: {
  where: {
    or: { [key: string]: { contains: string } }[];
  };
  sort: string;
  page: number;
  pageSize: number;
}) => {
  const { where, sort, page, pageSize } = params;

  const limit = pageSize;
  const skip = (page - 1) * pageSize;

  return ky
    .get<
      ResponseDto<PassengerDto>
    >(`passenger/?where=${JSON.stringify(where)}&sort=${sort}&limit=${limit}&skip=${skip}`)
    .json();
};
