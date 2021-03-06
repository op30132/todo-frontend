import axios, { AxiosRequestConfig } from "axios";
import inMemoryJWT from "./inMemoryJwt";
import { AccessToken } from "./model";
import { getRefreshToken } from "../service/authService";

let isRefreshing = false;
let refreshQueue: { 
  resolve: (res: AccessToken) => void; 
  reject: (err: Error) => void; 
}[] = [];
const retries = 1;

export const axiosInstance = axios.create({baseURL: "/api"});
axiosInstance.interceptors.request.use(async (request: AxiosRequestConfig) => {
  const token = inMemoryJWT.getToken();
  if(token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
axiosInstance.interceptors.response.use(response => response, async err => {
  const { config: orgConfig, response: { status } } = err;
  if (status !== 401) {
    return Promise.reject(err);
  }
  orgConfig._retry =
  typeof orgConfig._retry === "undefined" ? 0 : ++orgConfig._retry;

  if (orgConfig._retry === retries) {
    window.location.href = "/login";
    return Promise.reject(err);
  }
  if (!isRefreshing) {
    isRefreshing = true;

    getRefreshToken()
      .then(res => {
        refreshQueue.forEach((v) => v.resolve(res));
        refreshQueue = [];
      })
      .catch(error => {
        refreshQueue.forEach((v) => v.reject(error));
        refreshQueue = [];
      })
      .finally(() => {
        isRefreshing = false;
      });
  }

  return new Promise((resolve, reject) => {
    refreshQueue.push({
      resolve: (res) => {
        const config = {...orgConfig, headers: {"Authorization": res.accessToken}};
        resolve(axiosInstance.request(config));
      },
      reject: (err) => {
        reject(err);
      },
    });
  });
});
export default axiosInstance;
