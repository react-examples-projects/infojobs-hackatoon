import http from "axios";
import { TOKEN, ACCESS_TOKEN } from "@config/index";

const axios = http.create({
  baseURL: "/__proxy",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Basic ${TOKEN}, Bearer ${ACCESS_TOKEN}`;
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

export async function getOfferById(id){
  const res = await axios.get(`/7/offer/${id}`);
  return res;
}