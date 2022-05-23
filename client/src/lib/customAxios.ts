import axios, { AxiosInstance } from "axios";

export const customAxios: AxiosInstance = axios.create({
  baseURL: `https://server.tunamayo-toilet.com`,
  withCredentials: true,
});
