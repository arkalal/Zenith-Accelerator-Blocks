import axios from "axios";
import { ACCESS_TOKEN, API_URL_ONE } from "./variables";

const instance = axios.create({
  baseURL: API_URL_ONE,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export default instance;
