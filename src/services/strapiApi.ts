import axios from "axios";

export const strapiApi = axios.create({
  baseURL: "http://localhost:1337/api",
});
