import ky from "./kyInstance";
import { PassengerDto, ResponseDto } from "@/apis";

export const getPassengers = ({
  sort,
  where,
  skip = 0,
  limit = 30,
}: {
  where?: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  };
  sort?: string;
  skip?: number;
  limit?: number;
}) => {
  const paramsObj = new URLSearchParams();

  if (sort) {
    paramsObj.append("sort", sort);
  }
  paramsObj.append("limit", String(limit));
  paramsObj.append("skip", String(skip));

  if (where) {
    const orQuery: Array<{ [key: string]: { contains: string } }> = [];

    if (where.first_name) {
      orQuery.push({ first_name: { contains: where.first_name } });
    }
    if (where.last_name) {
      orQuery.push({ last_name: { contains: where.last_name } });
    }
    if (where.phone) {
      orQuery.push({ phone: { contains: where.phone } });
    }

    if (orQuery.length > 0) {
      const whereQuery = { or: orQuery };
      paramsObj.append("where", JSON.stringify(whereQuery));
    }
  }

  return ky.get<ResponseDto<PassengerDto>>(`passenger?${paramsObj}`).json();
};

export const getPassenger = (id: number) =>
  ky.get<PassengerDto>(`passenger/${id}`).json();
