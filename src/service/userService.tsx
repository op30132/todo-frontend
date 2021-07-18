import axiosInstance from "../shared/interceptor";
import { UserProfile } from "../shared/model";

export function queryUserByEmail(email: string):Promise<UserProfile[]> {
  return axiosInstance.post("/user/query", {email}).then(res => res.data);
}