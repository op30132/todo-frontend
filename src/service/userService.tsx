import axiosInstance from "../shared/interceptor";
import { UserProfile } from "../shared/model";

export function queryUserByEmail(email: string):Promise<UserProfile[]> {
  return axiosInstance.post("api/user/query", {email}).then(res => res.data);
}