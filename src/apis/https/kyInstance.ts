import ky from "ky";

const original = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
});

export default original;
