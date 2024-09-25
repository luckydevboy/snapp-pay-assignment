import ky from "./kyInstance";

export const getPassengers = () => ky.get(`passenger`);
