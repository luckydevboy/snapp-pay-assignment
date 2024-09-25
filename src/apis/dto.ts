export interface ResponseDto<T> {
  meta: Meta;
  items: T[];
}

export interface PassengerDto {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone: string;
  note: string;
  telegram: string;
  avatar: string;
  company: string;
  address: string;
  createdAt: number;
  updatedAt: number;
  id: number;
}

export interface Meta {
  skipped: number;
  limit: number;
  total: number;
  criteria: Criteria;
}

export interface Criteria {
  [key: string]: string;
}
