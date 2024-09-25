import ky from "./kyInstance";
import { PassengerDto, ResponseDto } from "@/apis";

export const getPassengers = (limit: number, skip: number) =>
  ky
    .get<ResponseDto<PassengerDto>>(`passenger?limit=${limit}&skip=${skip}`)
    .json();

export const getPassenger = (id: number) =>
  ky.get<PassengerDto>(`passenger/${id}`).json();

export const getSearchPassengers = (params: {
  where: {
    first_name?: { contains: string };
    last_name?: { contains: string };
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
    >(`passenger/?where=${where}&sort=${sort}&limit=${limit}&skip=${skip}`)
    .json();
};
