
import axios from "axios";
import api, { axiosInstance } from "../shared/interceptor";
import inMemoryJWT from "../shared/inMemoryJwt";
import { AccessToken, UserProfile } from "../shared/model";

export function userLogin(email: string, password: string):Promise<boolean> {
  return axios.post<AccessToken>("/api/auth/login", {email, password}).then(res => {
    return inMemoryJWT.setToken(res.data.accessToken);
  });
}
export function userRegister(user: UserProfile):Promise<UserProfile> {
  return axios.post<UserProfile>("/api/auth/register", user).then(res => res.data);
}
export function userLogout():Promise<boolean> {
  return api.delete("/api/auth/token/logout").then(() => {
    inMemoryJWT.ereaseToken();
    return true;
  });
}
export function getRefreshToken(): Promise<AccessToken> {
  return axios.get<AccessToken>("/api/auth/token/refresh")
    .then((res) => {
      inMemoryJWT.setToken(res.data.accessToken);
      return res.data;
    })
    .catch(err => {
      window.location.href="/login";
      return err;
    });
}
export function fetchUserProfile(): Promise<UserProfile> {
  return axiosInstance.get<UserProfile>("/api/auth/userProfile").then(res => res.data);
}

