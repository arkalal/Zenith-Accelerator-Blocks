import axios from "axios";
import { API_URL_TWO } from "./variables";

const instance = axios.create({
  baseURL: API_URL_TWO,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default instance;
