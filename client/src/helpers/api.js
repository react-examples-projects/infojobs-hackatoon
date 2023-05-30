import http from "axios";
import { TOKEN, ACCESS_TOKEN } from "@config/index";

const remoteApi = http.create({
  baseURL: "https://infojobs-hackatoon-api-production.up.railway.app/api", //"https://infojobs-hackatoon-server.vercel.app/api", //"http://localhost:3000/api/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

const axios = http.create({
  baseURL: "/__proxy",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

remoteApi.interceptors.response.use(
  (res) => res?.data || {},
  (err) => Promise.reject(err)
);

axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Basic ${TOKEN}`; //, Bearer ${ACCESS_TOKEN}
  return config;
});

axios.interceptors.response.use(
  (res) => res?.data || {},
  (err) => Promise.reject(err)
);

export async function getOffers(params = {}) {
  const res = await axios.get("/9/offer", { params });
  return res;
}

export async function getOfferById(id) {
  const res = await axios.get(`/7/offer/${id}`);
  return res;
}

export async function getBasicTest(data) {
  const res = await remoteApi.post("", data);
  return res;
}

export async function checkBasicTest(data) {
  const res = await remoteApi.post("/check", data);
  return res.data;
}
