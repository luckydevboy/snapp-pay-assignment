import ky from "./kyInstance";
import { PassengerDto, ResponseDto } from "@/apis";

export const getPassengers = ({
  sort = "createdAt DESC",
  where,
  skip,
  limit,
}: {
  where: {
    or: { [key: string]: { contains: string } }[];
  };
  sort?: string;
  skip?: number;
  limit?: number;
}) => {
  return ky
    .get<
      ResponseDto<PassengerDto>
    >(`passenger?limit=${limit}&skip=${skip}&sort=${sort}`)
    .json();
};

export const getPassenger = (id: number) =>
  ky.get<PassengerDto>(`passenger/${id}`).json();
