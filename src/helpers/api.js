import http from "axios";
import { TOKEN } from "@config/index";

const axios = http.create({
  baseURL: "/__proxy",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Basic ${TOKEN}, Bearer b408aa2d-0ffd-48e7-8287-b427a32341fd`;
  return config;
});

axios.interceptors.response.use(
  (res) => res?.data || {},
  (err) => Promise.reject(err)
);

export async function getOffers() {
  const res = await axios.get("/9/offer");
  return res;
}
