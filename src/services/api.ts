import axios from "axios";
import { parseCookies } from "nookies";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const {
  "siisp-jsf-token": cookies,
  "agendar-visita-token": tokenVisitas,
} = parseCookies();

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
